'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

// ── Block types with CSS-only textures ──
const BLOCK_TYPES = [
  {
    name: 'Grass Block',
    topColor: '#5D8C2E',
    sideGradient: 'linear-gradient(180deg, #5D8C2E 0%, #4A7A22 15%, #8B6914 15%, #7A5C12 100%)',
    bottomColor: '#6B4F10',
    patternTop: 'grass',
    patternSide: 'dirt',
  },
  {
    name: 'Stone',
    topColor: '#7A7A7A',
    sideGradient: 'linear-gradient(180deg, #888 0%, #6E6E6E 50%, #5A5A5A 100%)',
    bottomColor: '#5A5A5A',
    patternTop: 'stone',
    patternSide: 'stone',
  },
  {
    name: 'Diamond Ore',
    topColor: '#6E6E6E',
    sideGradient: 'linear-gradient(180deg, #777 0%, #666 100%)',
    bottomColor: '#555',
    patternTop: 'diamond',
    patternSide: 'diamond',
  },
  {
    name: 'Obsidian',
    topColor: '#1A0A2E',
    sideGradient: 'linear-gradient(180deg, #1A0A2E 0%, #120720 50%, #0D051A 100%)',
    bottomColor: '#0D051A',
    patternTop: 'obsidian',
    patternSide: 'obsidian',
  },
];

interface BreakParticle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  life: number;
}

interface InventoryItem {
  name: string;
  count: number;
  color: string;
}

const BREAK_COLORS: Record<string, string[]> = {
  'Grass Block': ['#8B6914', '#7A5C12', '#5D8C2E', '#4A7A22', '#6B4F10'],
  Stone: ['#7A7A7A', '#888', '#6E6E6E', '#5A5A5A', '#999'],
  'Diamond Ore': ['#4AEDD9', '#2CB5A6', '#777', '#666', '#3DE8D4'],
  Obsidian: ['#1A0A2E', '#2D1650', '#120720', '#3A1A6E', '#0D051A'],
};

const INVENTORY_COLORS: Record<string, string> = {
  'Grass Block': '#5D8C2E',
  Stone: '#7A7A7A',
  'Diamond Ore': '#4AEDD9',
  Obsidian: '#2D1650',
};

export default function MinecraftBlock() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(-25);
  const [rotateY, setRotateY] = useState(35);
  const [particles, setParticles] = useState<BreakParticle[]>([]);
  const [crackStage, setCrackStage] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [blockIndex, setBlockIndex] = useState(0);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [shaking, setShaking] = useState(false);
  const [breaking, setBreaking] = useState(false);
  const particleId = useRef(0);
  const autoRotate = useRef(0);
  const crackRef = useRef(0);
  const blockIndexRef = useRef(0);
  const isBreaking = useRef(false);

  const block = BLOCK_TYPES[blockIndex];

  useEffect(() => {
    setMounted(true);
  }, []);

  // Gentle auto-rotation when not hovering
  useEffect(() => {
    if (isHovering) return;
    const animate = () => {
      autoRotate.current += 0.15;
      setRotateY(35 + Math.sin(autoRotate.current * 0.02) * 15);
      setRotateX(-25 + Math.cos(autoRotate.current * 0.015) * 5);
    };
    const interval = setInterval(animate, 16);
    return () => clearInterval(interval);
  }, [isHovering]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const x = (e.clientX - centerX) / (rect.width / 2);
    const y = (e.clientY - centerY) / (rect.height / 2);
    setRotateY(35 + x * 30);
    setRotateX(-25 - y * 20);
  }, []);

  const spawnBreakParticles = useCallback(
    (e: React.MouseEvent, blockName: string) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      const colors = BREAK_COLORS[blockName] || BREAK_COLORS['Grass Block'];
      const newParticles: BreakParticle[] = [];

      for (let i = 0; i < 14; i++) {
        newParticles.push({
          id: particleId.current++,
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
          vx: (Math.random() - 0.5) * 10,
          vy: (Math.random() - 0.5) * 8 - 4,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * 6 + 3,
          life: 1,
        });
      }

      setParticles((prev) => [...prev, ...newParticles]);

      const startTime = Date.now();
      const animateParticles = () => {
        const elapsed = (Date.now() - startTime) / 1000;
        if (elapsed > 0.8) {
          setParticles((prev) =>
            prev.filter((p) => !newParticles.find((np) => np.id === p.id))
          );
          return;
        }
        setParticles((prev) =>
          prev.map((p) => {
            const np = newParticles.find((np) => np.id === p.id);
            if (!np) return p;
            return {
              ...p,
              x: p.x + np.vx * 0.3,
              y: p.y + np.vy * 0.3 + elapsed * 14,
              life: 1 - elapsed / 0.8,
            };
          })
        );
        requestAnimationFrame(animateParticles);
      };
      requestAnimationFrame(animateParticles);
    },
    []
  );

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      // Ignore clicks while block is breaking/transitioning
      if (isBreaking.current) return;

      // Screen shake
      setShaking(true);
      setTimeout(() => setShaking(false), 150);

      const currentBlockName = BLOCK_TYPES[blockIndexRef.current].name;
      spawnBreakParticles(e, currentBlockName);

      crackRef.current += 1;
      const nextCrack = crackRef.current;

      if (nextCrack > 4) {
        // Block breaks! Add to inventory and cycle to next block
        isBreaking.current = true;
        crackRef.current = 0;
        setCrackStage(0);
        setBreaking(true);

        // Add to inventory
        setInventory((inv) => {
          const existing = inv.find((i) => i.name === currentBlockName);
          if (existing) {
            return inv.map((i) =>
              i.name === currentBlockName ? { ...i, count: i.count + 1 } : i
            );
          }
          return [
            ...inv,
            { name: currentBlockName, count: 1, color: INVENTORY_COLORS[currentBlockName] || '#888' },
          ];
        });

        // Cycle to next block after break animation
        setTimeout(() => {
          const nextIndex = (blockIndexRef.current + 1) % BLOCK_TYPES.length;
          blockIndexRef.current = nextIndex;
          setBlockIndex(nextIndex);
          setBreaking(false);
          isBreaking.current = false;
        }, 300);
      } else {
        setCrackStage(nextCrack);
      }
    },
    [spawnBreakParticles]
  );

  const blockSize = 100;
  const half = blockSize / 2;

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col items-center gap-3 select-none"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        autoRotate.current = 0;
      }}
    >
      {/* 3D Block */}
      <div
        className={`cursor-pointer ${shaking ? 'animate-shake' : ''}`}
        style={{
          width: blockSize,
          height: blockSize,
          perspective: '600px',
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'scale(1)' : 'scale(0.75)',
          transition: 'opacity 0.5s ease, transform 0.5s ease',
        }}
        onClick={handleClick}
      >
        <div
          style={{
            width: blockSize,
            height: blockSize,
            position: 'relative',
            transformStyle: 'preserve-3d',
            transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) ${breaking ? 'scale(0)' : 'scale(1)'
              }`,
            transition: breaking
              ? 'transform 0.3s ease-in'
              : isHovering
                ? 'transform 0.1s ease-out'
                : 'transform 0.3s ease-out',
          }}
        >
          {/* Front face */}
          <BlockFace
            size={blockSize}
            transform={`translateZ(${half}px)`}
            background={block.sideGradient}
            pattern={block.patternSide}
            crackStage={crackStage}
          />
          {/* Back face */}
          <BlockFace
            size={blockSize}
            transform={`rotateY(180deg) translateZ(${half}px)`}
            background={block.sideGradient}
            pattern={block.patternSide}
            crackStage={crackStage}
          />
          {/* Right face */}
          <BlockFace
            size={blockSize}
            transform={`rotateY(90deg) translateZ(${half}px)`}
            background={block.sideGradient}
            pattern={block.patternSide}
            crackStage={crackStage}
          />
          {/* Left face */}
          <BlockFace
            size={blockSize}
            transform={`rotateY(-90deg) translateZ(${half}px)`}
            background={block.sideGradient}
            pattern={block.patternSide}
            crackStage={crackStage}
          />
          {/* Top face */}
          <BlockFace
            size={blockSize}
            transform={`rotateX(90deg) translateZ(${half}px)`}
            background={block.topColor}
            pattern={block.patternTop}
            crackStage={crackStage}
          />
          {/* Bottom face */}
          <BlockFace
            size={blockSize}
            transform={`rotateX(-90deg) translateZ(${half}px)`}
            background={block.bottomColor}
            pattern={block.patternSide}
            crackStage={crackStage}
          />
        </div>
      </div>

      {/* Break particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute pointer-events-none"
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            opacity: p.life,
            transform: 'translate(-50%, -50%)',
            imageRendering: 'pixelated',
          }}
        />
      ))}

      {/* Block label */}
      <p className="font-mono text-xs text-muted/50 text-center mt-5">
        {block.name}
        {crackStage > 0 && (
          <span className="text-cyan/50 ml-1.5">
            {crackStage}/4
          </span>
        )}
      </p>

      {/* Inventory bar */}
      {inventory.length > 0 && (
        <div className="flex items-center gap-1.5 ">
          {inventory.map((item) => (
            <div
              key={item.name}
              className="flex items-center gap-1 px-2 py-1 rounded border border-white/8 bg-graphite/80"
              title={item.name}
            >
              <div
                className="w-3 h-3 rounded-sm"
                style={{ backgroundColor: item.color, imageRendering: 'pixelated' }}
              />
              <span className="font-mono text-[10px] text-muted">{item.count}</span>
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(-2px, 1px); }
          50% { transform: translate(2px, -1px); }
          75% { transform: translate(-1px, -1px); }
        }
        .animate-shake {
          animation: shake 0.15s ease-in-out;
        }
      `}</style>
    </div>
  );
}

// ── Reusable block face ──
function BlockFace({
  size,
  transform,
  background,
  pattern,
  crackStage,
}: {
  size: number;
  transform: string;
  background: string;
  pattern: string;
  crackStage: number;
}) {
  return (
    <div
      className="absolute overflow-hidden"
      style={{
        width: size,
        height: size,
        transform,
        background,
        boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.2)',
        imageRendering: 'pixelated',
      }}
    >
      <BlockTexture pattern={pattern} />
      {crackStage > 0 && <CrackOverlay stage={crackStage} />}
    </div>
  );
}

// ── Pattern textures ──
function BlockTexture({ pattern }: { pattern: string }) {
  if (pattern === 'grass') {
    return (
      <svg width="100%" height="100%" className="absolute inset-0 opacity-40" style={{ imageRendering: 'pixelated' }}>
        <defs>
          <pattern id="grassP" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
            <rect x="0" y="0" width="5" height="5" fill="rgba(78,173,66,0.3)" />
            <rect x="5" y="5" width="5" height="5" fill="rgba(40,100,20,0.2)" />
            <rect x="5" y="0" width="5" height="5" fill="rgba(100,200,50,0.15)" />
            <rect x="0" y="5" width="5" height="5" fill="rgba(50,120,30,0.2)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grassP)" />
      </svg>
    );
  }

  if (pattern === 'dirt') {
    return (
      <svg width="100%" height="100%" className="absolute inset-0 opacity-30" style={{ imageRendering: 'pixelated' }}>
        <defs>
          <pattern id="dirtP" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
            <rect x="0" y="0" width="5" height="5" fill="rgba(0,0,0,0.15)" />
            <rect x="5" y="5" width="5" height="5" fill="rgba(0,0,0,0.1)" />
            <rect x="0" y="5" width="5" height="5" fill="rgba(255,255,255,0.05)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dirtP)" />
      </svg>
    );
  }

  if (pattern === 'stone') {
    return (
      <svg width="100%" height="100%" className="absolute inset-0 opacity-35" style={{ imageRendering: 'pixelated' }}>
        <defs>
          <pattern id="stoneP" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
            <rect x="0" y="0" width="6" height="6" fill="rgba(0,0,0,0.12)" />
            <rect x="6" y="6" width="6" height="6" fill="rgba(255,255,255,0.06)" />
            <rect x="3" y="3" width="3" height="3" fill="rgba(0,0,0,0.08)" />
            <rect x="9" y="1" width="2" height="2" fill="rgba(255,255,255,0.04)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#stoneP)" />
      </svg>
    );
  }

  if (pattern === 'diamond') {
    return (
      <div className="absolute inset-0">
        <svg width="100%" height="100%" className="absolute inset-0 opacity-35" style={{ imageRendering: 'pixelated' }}>
          <defs>
            <pattern id="diamondP" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
              <rect x="0" y="0" width="6" height="6" fill="rgba(0,0,0,0.12)" />
              <rect x="6" y="6" width="6" height="6" fill="rgba(255,255,255,0.06)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#diamondP)" />
        </svg>
        {/* Diamond sparkles */}
        <div className="absolute" style={{ top: '20%', left: '25%', width: 8, height: 8, backgroundColor: '#4AEDD9', opacity: 0.7 }} />
        <div className="absolute" style={{ top: '55%', left: '65%', width: 6, height: 6, backgroundColor: '#3DE8D4', opacity: 0.6 }} />
        <div className="absolute" style={{ top: '70%', left: '20%', width: 5, height: 5, backgroundColor: '#2CB5A6', opacity: 0.5 }} />
        <div className="absolute" style={{ top: '30%', left: '75%', width: 7, height: 7, backgroundColor: '#4AEDD9', opacity: 0.5 }} />
      </div>
    );
  }

  if (pattern === 'obsidian') {
    return (
      <svg width="100%" height="100%" className="absolute inset-0 opacity-30" style={{ imageRendering: 'pixelated' }}>
        <defs>
          <pattern id="obsidianP" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
            <rect x="0" y="0" width="4" height="4" fill="rgba(100,50,180,0.15)" />
            <rect x="4" y="4" width="4" height="4" fill="rgba(60,20,120,0.1)" />
            <rect x="4" y="0" width="4" height="4" fill="rgba(30,10,60,0.1)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#obsidianP)" />
      </svg>
    );
  }

  return null;
}

// ── Crack overlay ──
function CrackOverlay({ stage }: { stage: number }) {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        background: `repeating-linear-gradient(
          ${45 + stage * 20}deg,
          transparent,
          transparent ${12 - stage * 2}px,
          rgba(0,0,0,${0.1 + stage * 0.08}) ${12 - stage * 2}px,
          rgba(0,0,0,${0.1 + stage * 0.08}) ${13 - stage * 2}px
        )`,
      }}
    />
  );
}

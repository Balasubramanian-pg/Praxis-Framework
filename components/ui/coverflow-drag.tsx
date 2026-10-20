"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, ArrowUpRight, Sparkles } from "lucide-react";

export interface CoverflowItem {
  id: string | number;
  title: string;
  subtitle?: string;
  category?: string;
  imageSrc: string;
  badge?: string;
  href?: string;
}

export interface CoverflowDragProps {
  items?: CoverflowItem[];
  initialIndex?: number;
  cardWidth?: number;
  cardHeight?: number;
  spacing?: number;
  className?: string;
  onSelect?: (item: CoverflowItem, index: number) => void;
}

// Curated Freepik high-resolution editorial portrait & conceptual illustrations
export const defaultFreepikCoverflowItems: CoverflowItem[] = [
  {
    id: "data-contracts",
    title: "Data Contracts & Schemas",
    subtitle: "Schema enforcement, semantic versioning, and producer-consumer SLAs.",
    category: "Architecture",
    badge: "P3M DataOps",
    imageSrc: "https://img.freepik.com/free-photo/glowing-hologram-cyberpunk-futuristic-technology-concept_53876-129759.jpg?w=1000&auto=format&fit=crop&q=80",
    href: "#/article/Manage%20Contracts",
  },
  {
    id: "medallion-pipeline",
    title: "Medallion Data Architecture",
    subtitle: "Bronze raw streaming, Silver sanitized models, and Gold analytical marts.",
    category: "Engineering",
    badge: "Core Framework",
    imageSrc: "https://img.freepik.com/free-photo/abstract-polygonal-space-low-poly-dark-background-with-connecting-dots-lines-connection-structure_1258-26978.jpg?w=1000&auto=format&fit=crop&q=80",
    href: "#/article/Manage%20The%20Configuration",
  },
  {
    id: "finops-optimization",
    title: "Cloud FinOps & Capacity",
    subtitle: "Compute commitments, cluster autoscaling limits, and unit unit economics.",
    category: "Finance",
    badge: "Investment",
    imageSrc: "https://img.freepik.com/free-photo/glowing-digital-graph-showing-stock-market-data-financial-investment-success-concept-generative-ai_1258-153381.jpg?w=1000&auto=format&fit=crop&q=80",
    href: "#/article/Develop%20Investment%20Appraisal",
  },
  {
    id: "change-management",
    title: "Change Management Protocol",
    subtitle: "Kotter alignment, stakeholder enablement, and organizational adoption.",
    category: "Operations",
    badge: "Governance",
    imageSrc: "https://img.freepik.com/free-photo/digital-brain-artificial-intelligence-neural-network-concept_53876-129756.jpg?w=1000&auto=format&fit=crop&q=80",
    href: "#/article/Manage%20Change",
  },
  {
    id: "delivery-orchestration",
    title: "Continuous Delivery Life-Cycle",
    subtitle: "Agile sprints, stage boundaries, linear milestones, and automated testing.",
    category: "Execution",
    badge: "Process",
    imageSrc: "https://img.freepik.com/free-photo/ai-nuclear-energy-background-future-innovation-disruptive-technology_53876-129783.jpg?w=1000&auto=format&fit=crop&q=80",
    href: "#/article/Plan%20Delivery",
  },
  {
    id: "maturity-assessment",
    title: "Capability Maturity Index",
    subtitle: "5-level CMMI benchmarking, capability gaps, and continuous elevation.",
    category: "Maturity",
    badge: "Assessment",
    imageSrc: "https://img.freepik.com/free-photo/illuminated-geometric-shapes-futuristic-modern-architecture_23-2151624022.jpg?w=1000&auto=format&fit=crop&q=80",
    href: "#/article/Praxis%20for%20Data%20and%20BI",
  },
];

export function CoverflowDrag({
  items = defaultFreepikCoverflowItems,
  initialIndex = 2,
  cardWidth = 320,
  cardHeight = 440,
  spacing = 210,
  className,
  onSelect,
}: CoverflowDragProps) {
  const [activeIndex, setActiveIndex] = React.useState<number>(initialIndex);
  const [isDragging, setIsDragging] = React.useState<boolean>(false);
  const [dragStartX, setDragStartX] = React.useState<number>(0);
  const [dragDeltaX, setDragDeltaX] = React.useState<number>(0);

  const containerRef = React.useRef<HTMLDivElement>(null);
  const total = items.length;

  const clampIndex = React.useCallback(
    (index: number) => Math.max(0, Math.min(total - 1, index)),
    [total]
  );

  const selectIndex = React.useCallback(
    (index: number) => {
      const target = clampIndex(index);
      setActiveIndex(target);
      if (items[target] && onSelect) {
        onSelect(items[target], target);
      }
    },
    [clampIndex, items, onSelect]
  );

  // Keyboard navigation (ArrowLeft, ArrowRight, Enter, Space)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowLeft":
        e.preventDefault();
        selectIndex(activeIndex - 1);
        break;
      case "ArrowRight":
        e.preventDefault();
        selectIndex(activeIndex + 1);
        break;
      case "Home":
        e.preventDefault();
        selectIndex(0);
        break;
      case "End":
        e.preventDefault();
        selectIndex(total - 1);
        break;
      case "Enter":
      case " ":
        if (items[activeIndex]?.href) {
          e.preventDefault();
          window.location.hash = items[activeIndex].href!;
        }
        break;
    }
  };

  // Pointer drag gestures
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    setDragStartX(e.clientX);
    setDragDeltaX(0);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const delta = e.clientX - dragStartX;
    setDragDeltaX(delta);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    const threshold = 60;
    if (dragDeltaX < -threshold) {
      selectIndex(activeIndex + 1);
    } else if (dragDeltaX > threshold) {
      selectIndex(activeIndex - 1);
    }
    setDragDeltaX(0);
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Ignore safe release errors
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full overflow-hidden py-10 flex flex-col items-center select-none outline-none",
        className
      )}
      tabIndex={0}
      role="region"
      aria-label="Coverflow Note Gallery"
      onKeyDown={handleKeyDown}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      {/* 3D Stage Viewport */}
      <div
        className="relative w-full flex items-center justify-center"
        style={{
          height: cardHeight + 60,
          perspective: "1200px",
          perspectiveOrigin: "50% 50%",
        }}
      >
        {items.map((item, idx) => {
          const offset = idx - activeIndex;
          const dynamicOffset = isDragging
            ? offset - dragDeltaX / spacing
            : offset;
          const absOffset = Math.abs(dynamicOffset);

          // 3D Matrix Math: Scale, Dim, RotateY, and Translation
          const translateX = dynamicOffset * spacing;
          const rotateY = dynamicOffset === 0 ? 0 : dynamicOffset > 0 ? -42 : 42;
          const scale = Math.max(0.68, 1 - absOffset * 0.16);
          const opacity = Math.max(0.2, 1 - absOffset * 0.32);
          const zIndex = 100 - Math.round(absOffset * 10);
          const isCenter = idx === activeIndex;

          return (
            <div
              key={item.id}
              role="button"
              tabIndex={isCenter ? 0 : -1}
              aria-current={isCenter ? "true" : undefined}
              aria-label={`${item.title} - ${item.category || "Note"}`}
              onClick={() => selectIndex(idx)}
              className={cn(
                "absolute rounded-2xl overflow-hidden cursor-pointer",
                "bg-white dark:bg-neutral-900 border-2 transition-all duration-300 ease-out",
                isCenter
                  ? "border-[#00ff66] shadow-[0_20px_50px_rgba(0,255,102,0.25)]"
                  : "border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-700"
              )}
              style={{
                width: cardWidth,
                height: cardHeight,
                transform: `translateX(${translateX}px) translateZ(${-absOffset * 160}px) rotateY(${rotateY}deg) scale(${scale})`,
                opacity,
                zIndex,
                transformStyle: "preserve-3d",
                willChange: "transform, opacity",
              }}
            >
              {/* Background Portrait / Freepik Asset */}
              <div className="absolute inset-0 w-full h-full">
                <img
                  src={item.imageSrc}
                  alt={item.title}
                  draggable={false}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
              </div>

              {/* Card Meta Content */}
              <div className="relative z-10 h-full flex flex-col justify-between p-6 text-white">
                <div className="flex items-center justify-between">
                  {item.badge && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#00ff66]/20 text-[#00ff66] border border-[#00ff66]/40 backdrop-blur-md">
                      <Sparkles className="w-3 h-3 text-[#00ff66]" />
                      {item.badge}
                    </span>
                  )}
                  {item.category && (
                    <span className="text-xs font-medium uppercase tracking-wider text-neutral-300">
                      {item.category}
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-xl font-bold tracking-tight text-white mb-2">
                    {item.title}
                  </h3>
                  {item.subtitle && (
                    <p className="text-xs text-neutral-300 line-clamp-2 leading-relaxed mb-4">
                      {item.subtitle}
                    </p>
                  )}

                  {isCenter && (
                    <div className="flex items-center gap-2 text-xs font-bold text-[#00ff66] uppercase tracking-wide">
                      <span>Read Note</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Controls & Indicator */}
      <div className="mt-8 flex items-center gap-6 z-20">
        <button
          type="button"
          aria-label="Previous card"
          disabled={activeIndex <= 0}
          onClick={() => selectIndex(activeIndex - 1)}
          className={cn(
            "w-10 h-10 rounded-full border flex items-center justify-center transition-all",
            "bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100",
            "hover:border-[#00ff66] hover:text-[#00ff66] disabled:opacity-30 disabled:cursor-not-allowed"
          )}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => selectIndex(i)}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                i === activeIndex
                  ? "w-8 bg-[#00ff66]"
                  : "w-2 bg-neutral-300 dark:bg-neutral-700 hover:bg-neutral-400"
              )}
            />
          ))}
        </div>

        <button
          type="button"
          aria-label="Next card"
          disabled={activeIndex >= total - 1}
          onClick={() => selectIndex(activeIndex + 1)}
          className={cn(
            "w-10 h-10 rounded-full border flex items-center justify-center transition-all",
            "bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100",
            "hover:border-[#00ff66] hover:text-[#00ff66] disabled:opacity-30 disabled:cursor-not-allowed"
          )}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

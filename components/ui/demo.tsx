"use client";

import { CardStack, CardStackItem } from "@/components/ui/card-stack";

export const frameworkRepositoryItems: CardStackItem[] = [
  {
    id: "core-concepts",
    title: "Core Concepts",
    description: "Foundational P3M principles, governance paradigms, and systemic alignment across data ecosystems.",
    imageSrc: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop",
    href: "#core-concepts",
    tag: "Foundation",
  },
  {
    id: "governance-framework",
    title: "Governance & Framework",
    description: "Strategic sponsorship, organizational controls, data contracts, and board-level compliance.",
    imageSrc: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
    href: "#governance",
    tag: "Control",
  },
  {
    id: "processes",
    title: "Processes",
    description: "End-to-end delivery phases, gate reviews, and continuous life-cycle orchestration.",
    imageSrc: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
    href: "#processes",
    tag: "Workflow",
  },
  {
    id: "management-areas",
    title: "Management Areas",
    description: "Deep domain control across scope, schedule, finance, risk, quality, and change management.",
    imageSrc: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop",
    href: "#management",
    tag: "Operations",
  },
  {
    id: "competencies-skills",
    title: "Competencies & Skills",
    description: "Professional capability frameworks, role matrices, behavioral proficiencies, and study tracks.",
    imageSrc: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop",
    href: "#competencies",
    tag: "People",
  },
  {
    id: "documentation-artefacts",
    title: "Documentation & Artefacts",
    description: "Standardized business cases, charters, risk registers, and telemetry schemas.",
    imageSrc: "https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=1200&auto=format&fit=crop",
    href: "#artefacts",
    tag: "Templates",
  },
  {
    id: "portfolio-management",
    title: "Portfolio Management",
    description: "Strategic balance, investment screening, resource capacity, and multi-program prioritization.",
    imageSrc: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
    href: "#portfolio",
    tag: "Strategy",
  },
  {
    id: "delivery-lifecycle",
    title: "Delivery & Lifecycle",
    description: "Agile sprints, linear milestones, hybrid transitions, stage boundaries, and benefits realization.",
    imageSrc: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200&auto=format&fit=crop",
    href: "#lifecycle",
    tag: "Execution",
  },
  {
    id: "maturity-models",
    title: "Maturity Models",
    description: "CMMI capability assessments, gap analysis, and structured pathway progression.",
    imageSrc: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
    href: "#maturity",
    tag: "Assessment",
  },
  {
    id: "general-principles",
    title: "General Principles",
    description: "Ethical standards, sustainability, value duty, and foundational project governance ethos.",
    imageSrc: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop",
    href: "#principles",
    tag: "Ethics",
  },
  {
    id: "investment-benefits",
    title: "Investment & Benefits",
    description: "DCF, NPV, and IRR appraisal techniques, optimism bias adjustments, and ROI realization.",
    imageSrc: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=1200&auto=format&fit=crop",
    href: "#investment",
    tag: "FinOps",
  },
];

export default function CardStackDemoPage() {
  return (
    <div className="w-full">
      <div className="mx-auto w-full max-w-5xl p-8">
        <CardStack
          items={frameworkRepositoryItems}
          initialIndex={0}
          autoAdvance={true}
          minIntervalMs={5000}
          maxIntervalMs={10000}
          userClickWaitMs={15000}
          pauseOnHover={true}
          showDots={true}
        />
      </div>
    </div>
  );
}

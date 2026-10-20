---
title: "Develop Solution Competency"
aliases:
  - "Solution Development Skill"
  - "Data Architecture Design"
tags:
  - praxis-framework
  - pillar/competence
  - section/scope-management
  - type/competency
  - praxis/data-bi
  - topic/solution-architecture
  - discipline/dataops
pillar: "Competence"
section: "Scope Management"
subarea: "Delivery Competencies"
type: "competency"
status: "published"
source: "Praxis Framework"
source_url: "https://www.praxisframework.org"
created: 2026-10-17
updated: 2026-10-20
---

> [!NAV] Navigation
> **Vault**: [[00 - Praxis Framework Overview|Praxis Overview]] > **Section**: [[00 - Overview|Scope Management]]
> **Pillar**: Competence | **Type**: `competency`

# Develop Solution Competency: Modern Data Architecture & Modeling

> [!SUMMARY] Overview
> Demonstrates the capability to evaluate alternative data platform architectures, model multi-tier Lakehouse pipelines (Bronze/Silver/Gold), balance Kimball dimensional designs against One Big Table (OBT), and author Architectural Decision Records (ADRs).

## Purpose
The **Develop Solution** competency certifies that a data architect, lead analytics engineer, or technical project manager can translate complex business queries into scalable, high-performance data architectures.

In enterprise Data & Business Intelligence initiatives, solution development determines the long-term total cost of ownership (TCO) and analytical flexibility. Developing solutions requires **navigating fundamental architectural trade-offs: ELT vs. ETL, Lakehouse vs. Warehouse, Star Schema vs. One Big Table (OBT), and Batch vs. Streaming CDC**.

```
                   The Modern Data Solution Design Matrix
                   
┌─────────────────────────────────────────────────────────────────────────────────┐
│                      1. Ingestion Pattern: Modern ELT                           │
│  [Source Systems] ──► [Managed Raw Landing] ──► [Bronze Storage (Immutable)]    │
└────────────────────────────────────────┬────────────────────────────────────────┘
                                         │
                                         ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                 2. Storage Architecture: Open Lakehouse Format                  │
│  - Delta Lake / Apache Iceberg ACID Transactions  - Parquet Snappy Compression   │
└────────────────────────────────────────┬────────────────────────────────────────┘
                                         │
                                         ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                 3. Transformation & Modeling: Kimball vs. OBT                   │
│  - Conformed Silver Staging Models       - Gold Star Schemas (Facts/Dims)       │
│  - dbt Modular Incremental Builds        - Automated Schema Integrity Tests     │
└────────────────────────────────────────┬────────────────────────────────────────┘
                                         │
                                         ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                 4. Presentation: Certified Enterprise Semantic Layer            │
│  - Power BI DirectLake / Import Hybrid   - Central Metric Definitions           │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

## Architectural Decision Framework

A competent data leader evaluates four foundational trade-off dimensions:

| Decision Dimension | Option A | Option B | Praxis Selection Criteria |
| :--- | :--- | :--- | :--- |
| **Pipeline Paradigm** | **ETL** (Transform in-flight before landing) | **ELT** (Extract, Load raw, Transform in-warehouse via dbt) | **Select ELT**: Preserves raw immutable history in Bronze; allows rapid re-transformation without touching upstream sources. |
| **Storage Foundation** | **Proprietary Warehouse** (Lock-in, high compute) | **Open Lakehouse** (Delta Lake / Apache Iceberg) | **Select Open Lakehouse**: Separates compute from storage; guarantees multi-cloud portability and open table governance. |
| **Data Modeling** | **Kimball Star Schema** (Normalized Dims + Facts) | **One Big Table (OBT)** (Extreme Denormalization) | **Hybrid Approach**: Build conformed star schemas for semantic clarity and reusability; materialize OBT extracts for high-speed BI visuals. |
| **Ingestion Cadence** | **Nightly Batch** (Airflow cron schedules) | **Streaming / CDC** (Kafka / Delta Live Tables) | **Cost/Value Threshold**: Use batch for 90% of operational reporting; reserve streaming CDC strictly for intra-day operational alerting. |

---

## Performance Criteria

An individual certified in this competency demonstrates the following capabilities:

1. **Execute Data Feasibility Spikes**:
   - Profile upstream source APIs and database schemas during the [[Identification Process]] to verify historical depth, primary key integrity, and volume volatility before committing to an architecture.

2. **Author Architectural Decision Records (ADRs)**:
   - Formally document the context, considered alternatives, positive consequences, and technical risks for major architectural choices (e.g., *ADR-004: Adopting dbt Semantic Layer over Embedded BI Formulas*).

3. **Design Multi-Tier Medallion Storage Models**:
   - Construct schema definitions for Bronze (raw append-only), Silver (conformed, deduplicated, and cleansed), and Gold (business fact and dimension tables).
   - Optimize physical table layouts using partition pruning, clustering keys, and Z-Ordering.

4. **Prototype & Benchmark Vertical Slices**:
   - Deliver an end-to-end working prototype (from ingestion API to dashboard card) within a time-boxed spike to validate query performance, compute consumption, and stakeholder satisfaction.

---

## Flashcard Q&A

- **Q:** Why has the Modern Data Stack overwhelmingly shifted from ETL to ELT?
    - **A:** ELT lands raw data immediately into cheap cloud storage (Bronze) before transforming it. This ensures the raw source data is never lost, decouples ingestion from transformation, and allows analytics engineers to re-run transformations in SQL/dbt without re-querying production operational systems.

- **Q:** When should a data architect choose a Kimball Star Schema over One Big Table (OBT)?
    - **A:** Kimball Star Schemas are superior for enterprise multi-department reporting where dimensions (Customer, Date, Store) must be conformed and shared across multiple business processes, preventing conflicting metric calculations.

- **Q:** What is an Architectural Decision Record (ADR) in data project management?
    - **A:** A short, standardized document capturing a significant architectural choice (e.g., selecting Delta Lake, sizing compute clusters, or defining metric logic), explaining the business rationale, trade-offs considered, and long-term implications.

---
## Navigation & Related Notes
- **Up**: [[00 - Overview|Scope Management Overview]]
- **Previous**: [[Develop Products]]
- **Next**: [[Solutions Development]]

### Related Concepts & Artefacts
- [[00 - Praxis Framework Overview|Praxis Framework Master MOC]]
- [[Solutions Development]]
- [[Product Documents]]
- [[Scope Management]]
- [[Capability Maturity]]

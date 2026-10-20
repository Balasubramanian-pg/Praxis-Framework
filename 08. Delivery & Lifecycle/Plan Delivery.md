---
title: "Plan Delivery Competency"
aliases:
  - "Delivery Planning Skill"
  - "Data Sprint & Stage Planning"
tags:
  - praxis-framework
  - pillar/competence
  - section/delivery-process
  - type/competency
  - praxis/data-bi
  - topic/delivery-planning
  - discipline/dataops
pillar: "Competence"
section: "Delivery Process"
subarea: "Delivery Competencies"
type: "competency"
status: "published"
source: "Praxis Framework"
source_url: "https://www.praxisframework.org"
created: 2026-10-17
updated: 2026-10-20
---

> [!NAV] Navigation
> **Vault**: [[00 - Praxis Framework Overview|Praxis Overview]] > **Section**: [[00 - Overview|Delivery Process]]
> **Pillar**: Competence | **Type**: `competency`

# Plan Delivery Competency: Agile-Medallion Sprint Planning & Work Packaging

> [!SUMMARY] Overview
> Demonstrates the capability to construct operational delivery plans for data engineering and BI platforms—decomposing work into vertical value slices, scheduling historical backfills, allocating cloud FinOps compute budgets, and establishing automated DataOps quality gates.

## Purpose
The **Plan Delivery** competency certifies that a data project manager, lead analytics engineer, or delivery lead can formulate actionable, predictable operational plans for executing project stages and sprint tranches.

In enterprise Data & Business Intelligence initiatives, planning delivery requires balancing agile sprint flexibility with strict architectural dependencies. Competent delivery planners structure work around **Vertical End-to-End Value Slices** across the Medallion Architecture rather than horizontal infrastructure silos.

```
                    Agile-Medallion Sprint Work Breakdown
                    
┌─────────────────────────────────────────────────────────────────────────────────┐
│              Sprint Stage Planning: Vertical Value Slice Architecture           │
├─────────────────────────┬─────────────────────────────┬─────────────────────────┤
│   Track A: Ingestion    │   Track B: Transformation   │  Track C: Presentation  │
│ - Raw Bronze CDC DAGs   │ - Silver Conformed Models   │ - Gold Star Schema Mart │
│ - Data Contract Specs   │ - dbt Surrogate Key Tests   │ - Power BI Semantic UX  │
│ - Dead-Letter Queuing   │ - SCD Type 2 Audit Tables   │ - RLS & Visual Budgets  │
└────────────┬────────────┴──────────────┬──────────────┴────────────┬────────────┘
             │                           │                           │
             ▼                           ▼                           ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│               Operational Constraints & FinOps Resource Allocation              │
│ - Historical Backfill Schedules (Off-Peak)  - Daily Virtual Warehouse Credit Cap│
│ - Automated Slim CI Quality Gate (PR Merge) - Nightly Batch SLA Cutoff (06:00)  │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

## Performance Criteria

An individual certified in this competency demonstrates the following practical capabilities:

1. **Deconstruct Scope into Vertical Value Slices**:
   - Reject horizontal planning (e.g., spending two months only on ingestion); structure each 2-week sprint to deliver a testable slice from raw landing to executive dashboard card.
   - Define unambiguous work packages with clear input dependencies, assigned engineers, and acceptance criteria.

2. **Schedule & Buffer Historical Backfills**:
   - Model the runtime and compute resource requirements for multi-year historical data backfilling.
   - Schedule resource-intensive backfill jobs during off-peak weekend windows to prevent contention with production operational reporting.

3. **Incorporate Time-Boxed Data Feasibility Spikes**:
   - Allocate 2- to 3-day exploratory "Spike" work packages when integrating newly acquired source APIs or unfamiliar third-party schemas.
   - Use spike findings to refine sprint story point estimates and avoid mid-sprint blockers.

4. **Establish Stage Tolerances & FinOps Quotas**:
   - Define operational tolerances in the [[Delivery Plan]]: schedule variance ($\pm 3$ days), nightly batch cutoff (06:00 UTC), and cloud warehouse credit consumption limits.
   - Secure formal sign-off from the Project Sponsor and Lead Architect prior to commencing execution.

---

## Knowledge & Competence Criteria

To achieve proficiency, the practitioner must master:

- **The Medallion Cadence**: Coordinating handoffs between Data Platform Engineers (Bronze), Analytics Engineers (Silver/Gold), and BI Developers (Semantic/Reporting).
- **The Modern Definition of Done (DoD)**: Requiring that every deliverable include automated dbt test assertions, catalog documentation in Unity Catalog, and visual render performance benchmark audits ($< 2.0$s).
- **Dependency Network Modeling in DataOps**: Identifying the critical path across sequential DAG dependencies (e.g., upstream ERP export $\to$ Bronze sync $\to$ dbt staging $\to$ semantic refresh).

---

## Flashcard Q&A

- **Q:** Why should delivery planning for a data project avoid "horizontal layer" stages?
    - **A:** Horizontal staging (e.g., spending Stage 1 only on Bronze ingestion) provides no visible business value to stakeholders, prevents early feedback on data accuracy, and delays the discovery of modeling errors until months into the project.

- **Q:** How should historical backfills be scheduled during delivery planning?
    - **A:** As dedicated, off-peak work packages scheduled during weekends or low-traffic evening hours, with explicit cloud compute cluster sizing to avoid resource contention with daily production pipelines.

- **Q:** What is the primary purpose of a "Spike" in data delivery planning?
    - **A:** A time-boxed exploration period (typically 2-3 days) to profile raw source data, test API authentication, and verify schema stability, eliminating uncertainty before committing to formal sprint delivery dates.

---
## Navigation & Related Notes
- **Up**: [[00 - Overview|Delivery Process Overview]]
- **Previous**: [[Overview of Mobilisation]]
- **Next**: [[Delivery Process]]

### Related Concepts & Artefacts
- [[00 - Praxis Framework Overview|Praxis Framework Master MOC]]
- [[Delivery Plan]]
- [[Delivery Process]]
- [[Control Management Plan]]
- [[Capability Maturity]]

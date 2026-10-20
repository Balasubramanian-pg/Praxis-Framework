---
title: "Define A Project Or Programme Competency"
aliases:
  - "Definition Competency"
  - "Data Project Definition"
tags:
  - praxis-framework
  - pillar/competence
  - section/processes
  - type/competency
  - praxis/data-bi
  - topic/project-definition
  - discipline/dataops
pillar: "Competence"
section: "Project and Programme Processes"
subarea: "Process Competencies"
type: "competency"
status: "published"
source: "Praxis Framework"
source_url: "https://www.praxisframework.org"
created: 2026-10-17
updated: 2026-10-20
---

> [!NAV] Navigation
> **Vault**: [[00 - Praxis Framework Overview|Praxis Overview]] > **Section**: [[00 - Overview|Project and Programme Processes]]
> **Pillar**: Competence | **Type**: `competency`

# Define A Project Or Programme Competency: Lakehouse Architecture & Governance Baselining

> [!SUMMARY] Overview
> Demonstrates the capability to lead the comprehensive definition phase for enterprise data platforms—authoring Producer-Consumer Data Contracts, establishing lakehouse governance baselines (Unity Catalog / Purview), constructing multi-year FinOps TCO models, and structuring the Agile-Medallion Delivery Plan.

## Purpose
The **Define A Project Or Programme** competency certifies that a project manager, lead data architect, or analytics engineering lead can comprehensively plan and baseline all architectural, governance, financial, and operational parameters required for delivery execution.

In enterprise Data & Business Intelligence initiatives, the definition phase bridges the strategic brief approved at Gateway 1 with the agile engineering sprints executed in delivery. Inadequate definition leads to downstream architectural chaos: uncoordinated data models, runaway cloud consumption, broken upstream dependencies, and regulatory compliance breaches.

```
                    The Enterprise Data Definition Framework
                    
┌─────────────────────────────────────────────────────────────────────────────────┐
│               1. Technical Architecture & Data Contract Negotiation             │
│  - Producer-Consumer Data Contracts (`contract.yaml`) signed with source leads │
│  - Medallion storage tier specifications (Bronze, Silver, Gold schemas)         │
│  - Architectural Decision Records (ADRs) for Lakehouse format (Delta/Iceberg)   │
└────────────────────────────────────────┬────────────────────────────────────────┘
                                         │
                                         ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│               2. Data Governance & Security Baseline (Purview / Unity)          │
│  - Tag-Based Access Control (TBAC) & Dynamic PII Column Masking Policies        │
│  - Enterprise Business Glossary definitions & semantic measure consensus       │
│  - Row-Level Security (RLS) matrix across organizational departments            │
└────────────────────────────────────────┬────────────────────────────────────────┘
                                         │
                                         ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│               3. Integrated Delivery Planning & Cloud FinOps Governance        │
│  - Agile-Medallion Sprint Roadmap (Vertical Slices: Bronze ─► Silver ─► Gold)  │
│  - Cloud FinOps Budget: Virtual warehouse auto-suspend & daily credit quotas   │
│  - Full [[Business Case]]: 3-Year TCO, NPV, and Legacy Cost Take-Out           │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

## Performance Criteria

An individual certified in this competency demonstrates the following practical capabilities:

1. **Negotiate & Baseline Producer-Consumer Data Contracts**:
   - Establish formal technical agreements (`contract.yaml`) with upstream transactional application owners (ERP, CRM, Billing).
   - Secure binding commitments regarding column data types, nullability constraints, delivery freshness SLAs, and minimum 30-day breaking change advance notification windows.

2. **Establish the Enterprise Data Governance Baseline**:
   - Design the central catalog hierarchy in Databricks Unity Catalog or Microsoft Purview.
   - Configure tag-based dynamic data masking policies for all PII and sensitive financial attributes, ensuring compliance with GDPR, HIPAA, and corporate security standards before any data lands in development environments.

3. **Formulate the Cloud FinOps Management Plan**:
   - Model the multi-year cloud consumption budget across compute, storage, and SaaS utilities in the [[04. Management Areas/Cost Management/General Principles of Financial Management|Financial Management Plan]].
   - Establish automated cost controls: mandatory 60-second auto-suspend timers on exploratory virtual warehouses, hard statement timeouts (5 minutes), and daily spend threshold alerts.

4. **Structure the Agile-Medallion Delivery Plan & Secure Gateway 2**:
   - Decompose the project scope into 2-week vertical value slices in the [[Delivery Plan]], ensuring every sprint delivers an end-to-end outcome from ingestion to certified dashboard card.
   - Finalize the **Full Business Case** with audited labor savings and legacy infrastructure retirement figures.
   - Present the comprehensive definition baseline at **Gateway Review 2** to secure formal Project Sponsor authorization to commence execution.

---

## Knowledge & Competence Criteria

To achieve proficiency, the practitioner must master:

- **The Modern Definition of Done (DoD)**: Establishing explicit sprint exit criteria: 100% passing dbt test assertions, automated CI/CD builds, published catalog descriptions, and sub-2.0s dashboard visual load times.
- **Contractual Schema Evolution**: Implementing schema evolution rules in Delta Lake / Iceberg to prevent unintentional breaking changes from corrupting production tables.
- **TCO & Payback Economics**: Calculating Net Present Value (NPV), Internal Rate of Return (IRR), and discounted payback periods for data platform migrations.

---

## Flashcard Q&A

- **Q:** What is the most critical difference between defining a traditional software project and defining a modern data project?
    - **A:** Data project definition requires formalizing Producer-Consumer Data Contracts with upstream source teams and configuring central lakehouse governance (PII masking, metadata catalogs) before a single line of transformation SQL is written.

- **Q:** What is the purpose of Gateway Review 2 at the conclusion of the Definition process?
    - **A:** To review the Full Business Case, signed Data Contracts, cloud FinOps budgets, and the Agile-Medallion Delivery Plan, obtaining formal Sponsor authorization and funding to initiate delivery sprints.

- **Q:** How does establishing a FinOps plan during Definition prevent budget overruns in delivery?
    - **A:** By enforcing automated technical guardrails (auto-suspend timers, statement timeout kill switches, and daily credit quotas) in cloud compute infrastructure before developers begin running heavy queries.

---
## Navigation & Related Notes
- **Up**: [[00 - Overview|Project and Programme Processes Overview]]
- **Previous**: [[Identify A Project Or Programme]]
- **Next**: [[Deliver A Project Or Programme]]

### Related Concepts & Artefacts
- [[00 - Praxis Framework Overview|Praxis Framework Master MOC]]
- [[Definition Process]]
- [[Product Documents]]
- [[Control Management Plan]]
- [[Delivery Plan]]
- [[Capability Maturity]]

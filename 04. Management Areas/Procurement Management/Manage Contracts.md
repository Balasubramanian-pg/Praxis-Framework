---
title: "Manage Contracts Competency"
aliases:
  - "Contract Administration"
  - "Data Vendor & SLA Management"
tags:
  - praxis-framework
  - pillar/competence
  - section/procurement-management
  - type/competency
  - praxis/data-bi
  - topic/contract-management
  - discipline/procurement
pillar: "Competence"
section: "Procurement Management"
subarea: "Management Competencies"
type: "competency"
status: "published"
source: "Praxis Framework"
source_url: "https://www.praxisframework.org"
created: 2026-10-17
updated: 2026-10-20
---

> [!NAV] Navigation
> **Vault**: [[00 - Praxis Framework Overview|Praxis Overview]] > **Section**: [[00 - Overview|Procurement Management]]
> **Pillar**: Competence | **Type**: `competency`

# Manage Contracts Competency: Cloud Vendors, SaaS SLAs & SI Delivery

> [!SUMMARY] Overview
> Demonstrates the capability to administer, monitor, and enforce commercial contracts across cloud hyperscalers (Snowflake/Databricks), managed SaaS data tooling (Fivetran/dbt Cloud), and external data engineering consultancies—binding milestone payments to automated DataOps quality gates.

## Purpose
The **Manage Contracts** competency certifies that a project manager, lead data architect, or procurement lead can govern complex supplier relationships across the modern data stack.

In enterprise Data & Business Intelligence initiatives, contract management encompasses both **commercial supplier governance** (cloud capacity commitments, consulting SOWs, SaaS overage caps) and **technical service level enforcement** (pipeline availability, API throughput, and breaking change governance).

```
                      The Modern Data Contract Ecosystem
                      
┌─────────────────────────────────────────────────────────────────────────────────┐
│              Tier 1: Cloud Hyperscaler & Lakehouse Capacity (OpEx)              │
│  - Snowflake / Databricks Credit Commitments  - Reserved Compute Capacity       │
│  - Multi-Region Availability SLAs (99.99%)   - Monthly Overage Penalty Clauses │
└────────────────────────────────────────┬────────────────────────────────────────┘
                                         │
                                         ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                   Tier 2: Managed SaaS Utilities & Ingestion                    │
│  - Fivetran / Airbyte Monthly Active Rows     - dbt Cloud Developer Seats       │
│  - Monte Carlo Observability Table Quotas     - Connector Availability SLAs     │
└────────────────────────────────────────┬────────────────────────────────────────┘
                                         │
                                         ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│               Tier 3: Specialized System Integrators (SI) & SOWs                │
│  - Milestone Payments Tied to Definition of Done (DoD) & Passing dbt Tests      │
│  - Knowledge Transfer Audits & Decommissioning of Third-Party Contractor Access │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

## Performance Criteria

An individual certified in this competency demonstrates the following practical capabilities:

1. **Govern Cloud Consumption Commitments & FinOps Terms**:
   - Monitor drawdown against enterprise cloud contracts (e.g., a \$250,000 annual Snowflake credit commitment) to ensure spend tracks linearly across sprint quarters.
   - Enforce vendor SLA penalties if cloud cluster downtime or API gateway latency breaches contractual uptime guarantees.

2. **Administer Managed SaaS Licenses & Ingestion Volume**:
   - Track consumption-based billing metrics, such as Fivetran Monthly Active Rows (MAR), preventing unexpected invoice spikes caused by unannounced bulk table re-syncs.
   - Audit user license allocations (dbt Cloud, Power BI Premium, Tableau Server) quarterly, de-provisioning inactive seats to control operational overhead.

3. **Bind Consulting Milestone Payments to Data Quality Gates**:
   - Refuse to authorize milestone sign-offs for external consulting squads based solely on "code delivery."
   - Mandate that deliverable acceptance requires **100% passing automated test assertions** (`dbt build`, Great Expectations) in the staging environment, zero critical security findings, and complete data dictionary documentation in Unity Catalog.

4. **Manage Scope Changes & Vendor Dispute Resolution**:
   - Evaluate vendor-initiated change orders against the original Statement of Work (SOW), identifying whether delivery delays stem from supplier performance shortfalls or legitimate upstream client dependency blocks.
   - Administer formal contract amendments and re-baseline project milestones in the [[Delivery Plan]].

---

## Knowledge & Competence Criteria

To achieve proficiency, the practitioner must master:

- **Consumption vs. Subscription Pricing Models**: Navigating trade-offs between fixed annual subscriptions and variable utility-based billing in data tools.
- **Contractual "Definition of Done" (DoD)**: Translating technical data quality criteria (e.g., reconciliation delta $< 0.001\%$, sub-2-second dashboard load time) into legally enforceable deliverable acceptance terms.
- **Data Escrow & Portability Clauses**: Ensuring multi-cloud contracts guarantee immediate, unencumbered export of raw Parquet data in open formats upon contract termination, preventing proprietary storage hostage situations.

---

## Flashcard Q&A

- **Q:** How should a data project manager tie consulting milestone payments to deliverable quality?
    - **A:** By explicitly conditioning payment authorization on automated DataOps quality gates: 100% passing dbt test assertions, verified schema contract validation, and reconciliation against the corporate General Ledger.

- **Q:** What is the primary financial risk of consumption-based SaaS ingestion contracts (e.g., Fivetran MAR)?
    - **A:** Unplanned source table re-syncs or full historical backfills that multiply Monthly Active Rows (MAR) tenfold, triggering massive unexpected overage charges unless governed by contractual volume alert caps.

- **Q:** Why are open table formats (Delta Lake, Apache Iceberg) critical in cloud vendor contracts?
    - **A:** They prevent proprietary vendor lock-in, guaranteeing that enterprise data remains stored in open Parquet files accessible by any compute engine if commercial terms with a specific vendor deteriorate.

---
## Navigation & Related Notes
- **Up**: [[00 - Overview|Procurement Management Overview]]
- **Previous**: [[Contract Management]]
- **Next**: [[General Principles of Resource Management]]

### Related Concepts & Artefacts
- [[00 - Praxis Framework Overview|Praxis Framework Master MOC]]
- [[General Principles of Financial Management]]
- [[Control Management Plan]]
- [[Product Documents]]
- [[Capability Maturity]]

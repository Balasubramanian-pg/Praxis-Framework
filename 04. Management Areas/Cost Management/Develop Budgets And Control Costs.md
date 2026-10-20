---
title: "Develop Budgets And Control Costs Competency"
aliases:
  - "Cost Management Competency"
tags:
  - praxis-framework
  - pillar/competence
  - section/financial-management
  - type/competency
  - praxis/data-bi
  - topic/cost-management
  - discipline/finops
pillar: "Competence"
section: "Financial Management"
subarea: "Management Competencies"
type: "competency"
status: "published"
source: "Praxis Framework"
source_url: "https://www.praxisframework.org"
created: 2026-10-17
updated: 2026-10-20
---

> [!NAV] Navigation
> **Vault**: [[00 - Praxis Framework Overview|Praxis Overview]] > **Section**: [[00 - Overview|Financial Management]]
> **Pillar**: Competence | **Type**: `competency`

# Develop Budgets And Control Costs Competency

> [!SUMMARY] Overview
> Demonstrates the capability to forecast consumption-based cloud expenditures, establish time-phased FinOps budgets, track compute unit economics, and enforce cost-governance guardrails across modern data platforms.

## Purpose
The **Develop Budgets And Control Costs** competency certifies that a project manager, lead data architect, or analytics engineering lead can estimate, allocate, and rigorously control financial resources in modern data initiatives.

Unlike traditional IT projects with predictable capital expenditures (CapEx) for physical hardware, modern data architectures operate on **100% variable, consumption-based operational expenditures (OpEx)** across Snowflake, Databricks, Microsoft Fabric, cloud object storage, and SaaS ingestion utilities.

```
                      The Cloud Data FinOps Budget Architecture
                      
┌─────────────────────────────────────────────────────────────────────────────────┐
│                    Total Analytics Project Financial Baseline                   │
├─────────────────────────┬─────────────────────────────┬─────────────────────────┤
│  Compute Engine (70%)   │     Storage Layer (15%)     │  SaaS & Licensing (15%) │
│ - Ingestion ETL Batches │ - Hot Lakehouse Delta Files │ - Managed ELT (Fivetran)│
│ - dbt Transformation    │ - Historical Time-Travel    │ - dbt Cloud Developer   │
│ - Ad-Hoc Analyst Scans  │ - Cold Archive Tiering (S3) │ - BI Premium / Fabric   │
└────────────┬────────────┴──────────────┬──────────────┴────────────┬────────────┘
             │                           │                           │
             ▼                           ▼                           ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                      Continuous FinOps Governance & Control                      │
│ - Warehouse Auto-Suspend (60s)  - Query Max Timeout (300s)  - Tag Cost Allocation│
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

## Performance Criteria

An individual certified in this competency demonstrates the following capabilities:

1. **Build Multi-Tiered Cloud Consumption Budgets**:
   - Model compute requirements based on projected data volumes, batch refresh frequencies, and concurrency expectations.
   - Forecast storage accumulation, accounting for raw Bronze landing, conformed Silver tables, dimensional Gold marts, and Delta Lake time-travel snapshot retention.
   - Price SaaS connectors based on Monthly Active Rows (MAR) and enterprise BI user licensing tiers.

2. **Establish Unit Cost Economics**:
   - Calculate unit cost metrics: **Cost per Pipeline Run**, **Cost per Dashboard Refresh**, and **Cost per 1,000 Ingested Records**.
   - Enforce mandatory resource tagging (e.g., `cost_center`, `domain`, `sprint_id`) across all cloud compute clusters to enable granular department chargebacks.

3. **Monitor Expenditure & Burn Rate Variances**:
   - Track daily credit consumption against approved sprint and monthly tolerance thresholds.
   - Analyze cloud billing logs (e.g., Snowflake `ACCOUNT_USAGE.WAREHOUSE_METERING_HISTORY`, AWS Cost Explorer) to detect anomalous spending spikes before they deplete reserves.

4. **Enforce Automated FinOps Guardrails**:
   - Configure strict **auto-suspend timers** (e.g., 60 seconds of idle time) and auto-resume policies on all exploratory virtual warehouses.
   - Implement query timeout kill switches (e.g., terminating any unpartitioned query running longer than 5 minutes).
   - Schedule automated Delta Lake `VACUUM` and `OPTIMIZE` jobs to purge stale file versions and compact small Parquet files, minimizing unnecessary storage charges.

---

## Knowledge & Competence Criteria

To achieve proficiency, the practitioner must master:

- **Elastic Compute Mechanics**: Sizing virtual warehouses (XS to 4XL in Snowflake, or worker node types in Databricks) appropriate to workload requirements without over-provisioning.
- **Spot vs. On-Demand vs. Reserved Pricing**: Leveraging cloud spot instances for fault-tolerant nightly batch jobs to achieve 50–70% compute savings.
- **Query Optimization Cost Levers**: Recognizing how clustering keys, partition pruning, and pre-computed aggregation tables prevent expensive full-table scans.
- **Earned Value Management (EVM) in FinOps**: Adapting Cost Performance Index ($CPI = EV / AC$) to track whether delivered data products justify the cumulative cloud compute burned.

---

## Flashcard Q&A

- **Q:** Why is cost budgeting fundamentally different in modern cloud data platforms compared to traditional on-premises IT?
    - **A:** Traditional IT relies on upfront capital expenditure (CapEx) for physical servers with fixed costs. Cloud data platforms operate entirely on variable operational expenditure (OpEx), where unoptimized queries and idle clusters continuously consume credits in real time.

- **Q:** What is the single most effective technical control to prevent runaway compute costs in Snowflake or Databricks?
    - **A:** Configuring aggressive auto-suspend timers (e.g., 60 seconds) on exploratory warehouses and enforcing hard statement timeout limits (e.g., killing queries exceeding 5 minutes).

- **Q:** What are "unit cost economics" in the context of data project management?
    - **A:** Measuring expenditure at the level of specific deliverables, such as the compute cost per pipeline execution, cost per 1,000 records ingested, or cost per dashboard refresh, rather than viewing the cloud bill as an undifferentiated lump sum.

---
## Navigation & Related Notes
- **Up**: [[00 - Overview|Financial Management Overview]]
- **Previous**: [[Budgeting and cost control]]
- **Next**: [[General Principles of Financial Management]]

### Related Concepts & Artefacts
- [[00 - Praxis Framework Overview|Praxis Framework Master MOC]]
- [[General Principles of Financial Management]]
- [[Control Management Plan]]
- [[Investment Appraisal]]
- [[Capability Maturity]]

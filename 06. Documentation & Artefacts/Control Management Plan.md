---
title: "Control Management Plan"
aliases:
  - "Monitoring and Control Plan"
tags:
  - praxis-framework
  - pillar/method
  - section/integrative-management
  - type/artefact
  - praxis/data-bi
  - topic/control-plan
  - discipline/dataops
pillar: "Method"
section: "Integrative Management"
subarea: "Documentation"
type: "artefact"
status: "published"
source: "Praxis Framework"
source_url: "https://www.praxisframework.org"
created: 2026-10-17
updated: 2026-10-17
---

> [!NAV] Navigation
> **Vault**: [[00 - Praxis Framework Overview|Praxis Overview]] > **Section**: [[00 - Overview|Integrative Management]]
> **Pillar**: Method | **Type**: `artefact`

# Control Management Plan

> [!SUMMARY] Overview
> Defines the policies, reporting cadences, tolerances, and escalation procedures for tracking and controlling delivery performance.

## Purpose
The **Control Management Plan** defines the operational policies, automated monitoring frameworks, performance thresholds, and escalation pathways required to control delivery across the project life cycle.

In enterprise Data Engineering, Data Analytics, and Business Intelligence (BI) initiatives, control extends beyond traditional milestone tracking and Earned Value Management (EVM). It encompasses **continuous DataOps observability, automated data quality gates, cloud compute consumption caps, and dashboard performance SLAs**.

---

## The Five Control Dimensions in Modern Data Projects

```
                     Continuous DataOps Control Matrix
                     
┌─────────────────────────┐  ┌─────────────────────────┐  ┌─────────────────────────┐
│  1. Pipeline Freshness  │  │  2. Data Quality Budget  │  │   3. Cloud FinOps Cap   │
│  - Nightly SLA Cutoffs  │  │  - Zero PK/FK Violations │  │  - Warehouse Auto-Sleep │
│  - Micro-batch Latency  │  │  - Null Rate Tolerances  │  │  - Daily Credit Quotas  │
└────────────┬────────────┘  └────────────┬────────────┘  └────────────┬────────────┘
             │                            │                            │
             └──────────────────────┬─────┴────────────────────────────┘
                                    │
                                    ▼
┌───────────────────────────────────────────────────────────────────────────────────┐
│                         Automated Control & Observability                         │
│             (dbt Tests, Great Expectations, Monte Carlo, CloudWatch)              │
└───────────────────────────────────┬───────────────────────────────────────────────┘
                                    │
             ┌──────────────────────┴──────────────────────────────┐
             ▼                                                     ▼
┌─────────────────────────┐                           ┌─────────────────────────┐
│   4. BI Performance     │                           │   5. Business Adoption  │
│   - p95 Render < 2.0s   │                           │   - Excel Deprecation   │
│   - DirectQuery Limits  │                           │   - DAU / WAU Tracking  │
└─────────────────────────┘                           └─────────────────────────┘
```

### 1. Ingestion Freshness & Pipeline Latency Controls
Defines the strict operational cutoff times for data landing and availability:

- **Batch Pipeline Cutoff**: Bronze and Silver layer transformations must complete no later than **06:00 UTC** daily.
- **Gold Semantic Refresh**: Certified semantic models must refresh by **07:30 UTC** to precede European/Americas business operating hours.
- **Micro-Batch / Streaming Latency**: Real-time event streams (Kafka / Event Hubs) must maintain processing latency under **15 minutes**.
- **Tolerance**: A delay $> 45$ minutes triggers an automated high-priority alert; a delay past 08:00 UTC triggers an immediate [[Issue Register]] entry and stakeholder notice.

---

### 2. Automated Data Quality & "Error Budget" Policies
Rather than halting pipelines for minor anomalies, the team operates under explicit error budget thresholds:

| Model Layer | Automated Test Suite | Failure Tolerance | Enforcement Action |
| :--- | :--- | :--- | :--- |
| **Bronze (Raw Ingestion)** | Schema validation, JSON structure | 0% column schema mismatch | Ingestion gateway drops malformed records to a quarantined dead-letter queue (DLQ); valid records proceed. |
| **Silver (Cleansed/Conformed)** | Primary key uniqueness, foreign key integrity | **0.00% tolerance** (Strict zero-defect) | Immediate pipeline halt (`dbt test --fail-fast`); Gold models are not updated with corrupt keys. |
| **Silver (Attributes)** | Range checks, valid enumerations, string formats | $< 0.10\%$ anomaly rate | Warning logged; flagged rows routed to exceptions table; pipeline continues. |
| **Gold (Semantic Marts)** | General ledger financial reconciliation | Delta $< 0.001\%$ vs. source ERP | Discrepancy halts report distribution; finance on-call notified. |

---

### 3. Cloud FinOps & Compute Quota Controls
To prevent runaway consumption in elastic architectures (Databricks, Snowflake, BigQuery):

- **Auto-Suspend Rules**: All non-production virtual warehouses must auto-suspend after **60 seconds** of idle time. Production ETL warehouses terminate immediately upon DAG completion.
- **Query Execution Caps**: Exploratory queries from data analysts are hard-capped at **300 seconds** (5 minutes). Any query attempting an unpartitioned full-table scan exceeding 100 GB is killed automatically.
- **Daily Budget Thresholds**: Daily credit burn is capped with tiered alerts:
  - 80% daily budget: Slack alert to DataOps channel.
  - 100% daily budget: Email warning to Lead Data Architect.
  - 120% daily budget: Auto-throttle of ad-hoc analytics warehouses until manual review.

---

### 4. BI Performance & UX Response Budgets
Ensuring dashboards remain responsive and actively used:

- **Cold Cache Visual Render**: 95% of dashboard visuals must render within **2.0 seconds** on initial page load.
- **Filter Slice Latency**: Interactive slicer selection must re-calculate metrics in under **800 milliseconds**.
- **Composite Model Governance**: DirectQuery to underlying Lakehouse is prohibited for high-volume dimensions; tables must be imported into memory or served via pre-aggregated hybrid tables.

---

### 5. Escalation & Exception Governance

When operational performance breaches approved tolerances, the team follows a structured three-tier escalation protocol:

| Tier | Trigger Condition | Responsible Party | Governance Mechanism |
| :--- | :--- | :--- | :--- |
| **Tier 1: Automated Retry** | Transient API failure, cloud worker restart, network blip. | Airflow / Dagster Orchestrator | Automatic retry with exponential backoff (max 3 retries over 15 minutes). |
| **Tier 2: On-Call Remediation** | 3 consecutive job retries fail, non-fatal schema drift, or test threshold breach. | On-call DataOps Engineer / Analytics Engineer | Triaged via DataOps Slack; issue contained within active sprint backlog. |
| **Tier 3: Executive Exception** | P1 pipeline outage past 08:00 AM, corrupted executive metrics published, or 150% monthly compute budget breach. | Data Project Manager & Lead Architect | Formal **Exception Report** submitted to Project Sponsor; emergency steering review convened. |

---

## Review & Reporting Cadence

- **Daily DataOps Triage (15 mins)**: Review overnight DAG run durations, dbt test failure rates, and open incident tickets.
- **Bi-Weekly Sprint Demo & Quality Gate**: Review delivered data products against the "Definition of Done" and inspect data contract adherence.
- **Monthly FinOps & Adoption Review**: Audit cloud compute spend by team, track active monthly dashboard users (MAU), and identify unused reports for deprecation.



---
## Navigation & Related Notes
- **Up**: [[00 - Overview|Integrative Management Overview]]
- **Previous**: [[Configuration Management]]
- **Next**: [[Daily Log]]

### Related Concepts & Artefacts
- [[00 - Praxis Framework Overview|Praxis Framework Master MOC]]
- [[Capability Maturity]]
- [[Complexity]]

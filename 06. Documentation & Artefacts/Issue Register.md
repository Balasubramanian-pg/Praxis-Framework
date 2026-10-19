---
title: "Issue Register"
aliases:
  - "Issue Log"
tags:
  - praxis-framework
  - pillar/method
  - section/delivery-documents
  - type/artefact
  - praxis/data-bi
  - topic/issue-register
  - discipline/dataops
pillar: "Method"
section: "Delivery Documents"
subarea: "Documentation"
type: "artefact"
status: "published"
source: "Praxis Framework"
source_url: "https://www.praxisframework.org"
created: 2026-10-17
updated: 2026-10-17
---

> [!NAV] Navigation
> **Vault**: [[00 - Praxis Framework Overview|Praxis Overview]] > **Section**: [[00 - Overview|Delivery Documents]]
> **Pillar**: Method | **Type**: `artefact`

# Issue Register

> [!SUMMARY] Overview
> The Issue Register records all problems, deviations, and unforeseen events that exceed local tolerance and require formal management resolution.

## Purpose
The **Issue Register** captures, tracks, and documents the resolution of all formal issues. In Praxis, an issue is any event or deviation that has **already manifested** (or is certain to occur) that threatens project objectives and exceeds defined managerial tolerances, necessitating immediate corrective intervention.

In enterprise IT data initiatives, issues manifest as **DataOps Incidents, pipeline outages, semantic discrepancies, and runaway cloud compute charges**. When an automated dbt test fails or an upstream schema changes breaking production dashboards, the incident is escalated into the Issue Register to coordinate engineering triage, stakeholder communication, and root-cause remediation.

---

## DataOps Incident Severity Classification

Praxis categorizes data issues across four severity levels based on business decision impact:

| Priority | Operational Definition | Target SLA (Triage / Fix) | Escalation Protocol |
| :--- | :--- | :--- | :--- |
| **P1 - Critical** | Corrupted data landed in production Gold layer impacting executive KPIs or financial reports; or complete failure of production pipeline refreshing before 08:00 AM business cutoff. | 15 mins / 2 hours | Immediate Incident Commander assigned; Executive Sponsor notified via Exception Report; Slack war room opened. |
| **P2 - Major** | Partial pipeline delay affecting non-critical downstream marts; or severe query latency (> 30s) on executive dashboards causing operational friction. | 1 hour / 8 hours | Data Product Owner notified; task prioritized in active sprint backlog. |
| **P3 - Moderate** | Schema warning or missing metadata in Unity Catalog; localized calculation bug in a department-level BI report with an available manual workaround. | 4 hours / 3 days | Handled during regular sprint maintenance backlog. |
| **P4 - Minor** | Cosmetic dashboard visual misalignment, typo in metric tooltip, or deprecated warning logs in Airflow DAG runs. | 2 days / Next Sprint | Resolved in subsequent iterative release. |

---

## Exemplar: Enterprise Data & BI Issue Register

The following register captures real-world incidents from production Lakehouse and BI environments:

| Issue ID | Priority | Incident Description & Root Cause | Business & Technical Impact | Corrective Resolution Action | Preventative Measure (dbt / DataOps) | Owner | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **ISS-DE-101** | **P1** | **Silent Deduplication Failure**: Upstream POS system emitted duplicate transaction UUIDs due to network retries. Ingestion pipeline lacked an explicit primary key check, inflating Gold daily revenue metrics by 14%. | CFO reported inflated Q3 revenue numbers during board prep; temporary loss of trust in enterprise data warehouse. | 1. Paused downstream Gold table refreshes.<br>2. Ran Delta Lake `MERGE` script with `ROW_NUMBER() OVER (PARTITION BY transaction_id ORDER BY event_time DESC) = 1`.<br>3. Backfilled 7 days of historical tables. | Added mandatory dbt test assertion `unique` and `not_null` on `transaction_id` in CI/CD pipeline blocking pull requests. | Lead Data Engineer | **Closed** |
| **ISS-DE-102** | **P2** | **Snowflake Auto-Resume Budget Spike**: An ad-hoc analytic query executed an unindexed Cartesian cross-join (`fct_events` $\times$ `fct_web_logs`, 12B rows) on an `X-LARGE` warehouse over a long weekend. | Incurred \$4,200 in unexpected compute credits in 48 hours, exceeding monthly exploratory compute tolerance. | 1. Aborted active query session via DBA admin role.<br>2. Adjusted warehouse `AUTO_SUSPEND` parameter from 600s down to 60s.<br>3. Configured resource monitor hard-cap quota at 120% budget. | Implemented query cost-governance guardrails in Snowflake and Slack webhook alerts for any query running $> 10$ minutes. | FinOps Lead | **Closed** |
| **ISS-BI-103** | **P1** | **Power BI Service Gateway Token Expiration**: Enterprise Gateway service account password expired unexpectedly on Sunday night, halting all scheduled refreshes across 45 department dashboards. | Morning sales reports displaying stale Friday data; 120 branch managers unable to review daily operational quotas. | 1. Regenerated Service Principal OAuth2 secret in Azure Entra ID.<br>2. Re-authenticated Power BI Gateway cluster.<br>3. Triggered manual parallel refresh of Gold semantic models. | Switched authentication from individual service account password to Azure Key Vault automated secret rotation with 30-day expiry alerting. | Lead BI Developer | **Closed** |
| **ISS-GOV-104** | **P2** | **Unmasked Customer PII Exposure in Silver Table**: Marketing lead pipeline introduced `customer_ssn_hash` containing plain-text national IDs due to upstream third-party form migration. | Potential GDPR/CCPA regulatory violation; unauthorized access risk for 14 junior data analysts. | 1. Revoked `SELECT` privileges on `silver_leads` table immediately.<br>2. Applied dynamic column-level SHA-256 masking policy in Unity Catalog.<br>3. Sanitized historical Parquet files using Delta Lake `VACUUM`. | Integrated automated PII regex classification scans into pre-commit ingestion hooks. | Data Governance Steward | **Closed** |

---

## DataOps Incident Resolution Workflow

When an issue arises in a data engineering or BI project, the team follows a structured five-phase resolution protocol:

```
[1. Automated Detection] ──► [2. Containment & Triage] ──► [3. Remediation & Backfill]
 (Observability Alert /        (Quarantine bad data,         (Fix dbt transformation logic,
  User Incident Ticket)         halt downstream DAGs)         reprocess historical dates)
                                                                       │
                                                                       ▼
                             [5. Lessons Log & Post-Mortem] ◄── [4. Verification Gate]
                              (Document root cause, update      (Run dbt test assertions,
                               preventative CI/CD tests)         validate against source GL)
```

1. **Detection & Logging**: The incident is logged immediately in the Issue Register with timestamps, affected data tables, and downstream dashboard impacts.
2. **Containment**: Downstream consumption is quarantined (e.g., placing a maintenance banner on Power BI or pausing downstream dbt runs) to prevent bad numbers from influencing executive decisions.
3. **Remediation & Backfill**: The code bug or infrastructure failure is fixed in a development branch. Reprocessing and backfilling of historical data partitions is executed with idempotency.
4. **Verification**: Automated data tests and reconciliation scripts verify parity against the authoritative general ledger or source system.
5. **Post-Mortem**: A blameless root-cause analysis (5 Whys) is conducted and recorded in the [[Lessons Log]]. A preventative automated test is added to the CI/CD test suite to guarantee the failure mode can never recur.



---
## Navigation & Related Notes
- **Up**: [[00 - Overview|Delivery Documents Overview]]
- **Previous**: [[General Principles of Requirements Management]]
- **Next**: [[Lessons Log]]

### Related Concepts & Artefacts
- [[Identification Process]]
- [[Definition Process]]
- [[Delivery Process]]
- [[Closure Process]]

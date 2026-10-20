---
title: "Daily Log"
aliases:
  - "PM Diary"
  - "Daily Diary"
  - "DataOps Standup Log"
tags:
  - praxis-framework
  - pillar/method
  - section/delivery-documents
  - type/artefact
  - praxis/data-bi
  - topic/daily-log
  - discipline/dataops
pillar: "Method"
section: "Delivery Documents"
subarea: "Documentation"
type: "artefact"
status: "published"
source: "Praxis Framework"
source_url: "https://www.praxisframework.org"
created: 2026-10-17
updated: 2026-10-20
---

> [!NAV] Navigation
> **Vault**: [[00 - Praxis Framework Overview|Praxis Overview]] > **Section**: [[00 - Overview|Delivery Documents]]
> **Pillar**: Method | **Type**: `artefact`

# Daily Log: The DataOps Standup & Observability Diary

> [!SUMMARY] Overview
> An agile working diary maintained by the Data Project Manager or Lead Analytics Architect to record daily pipeline operational signals, standup blockers, ad-hoc scope triage, and emerging technical debt.

## Purpose
The **Daily Log** serves as an operational working record for capturing daily events, informal stakeholder interactions, overnight pipeline health observations, and transient blockers that do not yet warrant formal entry into the [[Risk Register]] or [[Issue Register]].

In modern enterprise Data & Business Intelligence initiatives, the Daily Log functions as the **managerial triage cockpit** connecting daily standups, automated observability alerts, and sprint backlog flow.

```
                    The Daily Log Triage & Escalation Funnel
                    
[Daily Inputs] ──► - Overnight DAG Run Health (Airflow / Dagster)
                   - Morning Standup Blockers (dbt model failures, credentials)
                   - Ad-Hoc Executive Query Requests ("Quick pull for CEO")
                   - Cloud FinOps Daily Spend Alerts (Snowflake / Databricks)
                                      │
                                      ▼
                             [The Daily Log]
                                      │
           ┌──────────────────────────┼──────────────────────────┐
           ▼                          ▼                          ▼
[Resolved in Standup]      [Emerging Uncertainty]    [Pipeline Failure / Outage]
- Cleared within 24 hours  - Escalated to [[Risk Register]] - Escalated to [[Issue Register]]
- Documented for recall    - Assessed for sprint impact  - Handled via P1-P4 SLA
```

---

## Exemplar: A Day in the Life of a Data Project Manager

The following real-world log demonstrates how a practitioner tracks operational rhythms across a Lakehouse and BI delivery sprint:

```markdown
### Date: 2026-10-20 | Sprint 3 (Day 4) - Gold Star Schema Marts

#### 07:30 UTC - Morning Pipeline Observability Check
- Overnight Ingestion DAG: Completed at 04:15 UTC (well within 06:00 UTC SLA cutoff).
- dbt Test Run: 142 passed, 1 warning on `silver_customers` (null postal code rate = 0.04%, within 0.10% error budget).
- Cloud Compute Check: Snowflake overnight batch cost = $84.20 (projected daily run rate on track).

#### 09:15 UTC - Daily Standup Notes & Blockers
- **Data Platform Engineer**: Ingestion connectors for Salesforce billing deployed to Staging. Blocked waiting for security team to approve read-replica IP whitelisting for SAP ERP.
  * *Action Item*: Follow up with Network CISO lead before 12:00 UTC.
- **Analytics Engineer**: Finished dimensional star schema modeling for `fct_daily_sales`. Preparing PR for dbt Slim CI validation.
- **BI Developer**: Designing executive KPI visual cards in Power BI. Noted DAX measure recalculation latency is 1.4s (well within 2.0s performance budget).

#### 11:30 UTC - Ad-Hoc Request Triage (Scope Protection)
- VP Marketing messaged asking for a "quick custom SQL extract" comparing customer acquisition costs across Google vs. LinkedIn ads for an afternoon deck.
- *Triage Decision*: Protected sprint engineering capacity by declining ad-hoc pipeline intervention. Guided the marketing analyst to the self-service Databricks SQL workspace and shared pre-built Silver marketing staging query.

#### 14:45 UTC - Emerging Technical Discovery
- Source ERP DBA informed us during an informal call that SAP will undergo a minor patch update this coming weekend.
- *Evaluation*: High probability of temporary API connectivity drops.
- *Escalation*: Logged preventive monitoring task in Daily Log; will escalate to [[Risk Register]] (RSK-DE-007) if downtime exceeds 2 hours during the batch ingestion window.

#### 17:00 UTC - End-of-Day Wrap-Up
- Network team unblocked SAP IP whitelisting; connector testing underway.
- 0 critical issues open; sprint burn-down tracking 100% on schedule.
```

---

## Practical Rules for Maintaining the Data Daily Log

1. **Keep it Informal but Disciplined**: The log is a fast-entry scratchpad for managerial recall, not a formal steering committee document.
2. **Review Before Every Standup**: Spend 10 minutes scanning overnight observability alerts and yesterday's action items before conducting the team standup.
3. **Escalate Promptly**: If an item in the Daily Log remains unresolved for more than 48 hours or threatens schedule tolerances, graduate it immediately to the [[Issue Register]] or [[Change log]].

---

## Flashcard Q&A

- **Q:** How does a Daily Log protect sprint velocity in a modern data engineering team?
    - **A:** By acting as a buffer against ad-hoc executive requests (*"Can you run a quick query for me?"*), logging and routing them to self-service sandboxes rather than interrupting active sprint engineering work.

- **Q:** What should a data project manager check in the Daily Log first thing in the morning?
    - **A:** The health of overnight data pipelines: batch run completion times, dbt automated test results, data freshness timestamps, and cloud compute credit consumption.

- **Q:** When should an entry in the Daily Log be transferred to the Issue Register?
    - **A:** When an obstacle or data anomaly exceeds local tolerance—such as a broken production pipeline, corrupted Gold financial metrics, or an unresolvable technical blocker requiring sponsor escalation.

---
## Navigation & Related Notes
- **Up**: [[00 - Overview|Delivery Documents Overview]]
- **Previous**: [[Control Management Plan]]
- **Next**: [[Definition Plan]]

### Related Concepts & Artefacts
- [[00 - Praxis Framework Overview|Praxis Framework Master MOC]]
- [[Issue Register]]
- [[Risk Register]]
- [[Control Management Plan]]
- [[Delivery Process]]

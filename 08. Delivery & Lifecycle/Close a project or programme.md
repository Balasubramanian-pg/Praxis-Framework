---
title: "Close A Project Or Programme"
aliases:
  - "Project Closure"
  - "Programme Closure"
  - "DataOps Operational Handover"
tags:
  - praxis-framework
  - pillar/method
  - section/processes
  - type/process
  - praxis/data-bi
  - topic/project-closure
  - discipline/dataops
pillar: "Method"
section: "Project and Programme Processes"
subarea: "Process"
type: "process"
status: "published"
source: "Praxis Framework"
source_url: "https://www.praxisframework.org"
created: 2026-10-17
updated: 2026-10-20
---

> [!NAV] Navigation
> **Vault**: [[00 - Praxis Framework Overview|Praxis Overview]] > **Section**: [[00 - Overview|Project and Programme Processes]]
> **Pillar**: Method | **Type**: `process`

# Close A Project Or Programme: The DataOps Operational Handover

> [!SUMMARY] Overview
> The structured life cycle process for transitioning delivered Lakehouse pipelines, semantic models, and BI cockpits to permanent DataOps stewardship, auditing shadow IT spreadsheet deprecation, demobilising cloud compute resources, and transferring residual data debt.

## Purpose
The **Close a project or programme** process ensures that data initiatives achieve an orderly, disciplined finish. 

In enterprise Data Engineering, Analytics Engineering, and Business Intelligence (BI), projects rarely conclude with a physical ribbon cutting. Instead, closure marks the formal transition from **Project Delivery mode to Continuous DataOps Platform Operations**. 

Failing to conduct a rigorous data platform closure leads to "orphaned pipelines"—unmonitored batch DAGs running indefinitely in the cloud, burning compute budget without ownership, and producing stale numbers that mislead business stakeholders.

```
                  The Data Platform Closure & Handover Framework
                  
[Delivery Phase Complete]
           │
           ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│               1. Operational DataOps Handover & Runbook Sign-Off                │
│  - Automated DAG SLA Commitments (06:00 UTC)  - PagerDuty Alert Escalation Paths│
│  - dbt Test Failure Error Budgets             - Observability Monitoring Active │
└────────────────────────────────────────┬────────────────────────────────────────┘
                                         │
                                         ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│               2. Shadow IT Deprecation & Spreadsheet Sunsetting                 │
│  - Emailed CSV distribution stopped           - Legacy read-replicas revoked    │
│  - Power BI / Tableau certified adoption      - Data Champions active in domains│
└────────────────────────────────────────┬────────────────────────────────────────┘
                                         │
                                         ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│               3. Cloud FinOps Demobilisation & Asset Cleanup                    │
│  - Ephemeral dev/staging schemas destroyed    - S3/ADLS temp buckets deleted    │
│  - Virtual warehouse auto-suspend verified    - Unused SaaS licenses reclaimed  │
└────────────────────────────────────────┬────────────────────────────────────────┘
                                         │
                                         ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│               4. Residual Data Debt Transfer & Post-Project Review              │
│  - Unresolved backlog items logged in DataOps - Realized ROI & Lessons archived │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

## Core Handover Activities in Data & BI Initiatives

### 1. The Operational Handover Package
The project delivery squad must transfer full operational custody to the permanent DataOps or Platform Support team. The handover package includes:
- **Operational Runbook**: Clear procedures for restarting failed Airflow/Dagster tasks, handling upstream API connection timeouts, and executing idempotent partition backfills.
- **Alert Playbooks**: Defined response workflows for dbt test assertion failures, general ledger reconciliation variances, and schema drift warnings.
- **Service Level Agreements (SLAs)**: Documented commitments for data availability (e.g., Gold marts refreshed daily by 06:00 UTC; 99.9% uptime).

### 2. Auditing Shadow IT Spreadsheet Decommissioning
A project cannot be formally closed while business departments maintain parallel manual reporting:
- Terminate scheduled database dumps and automated email CSV extracts.
- Revoke direct SQL `SELECT` access on raw operational read-replicas, directing all analytics traffic through certified Lakehouse semantic models.
- Secure signed confirmation from Business Change Managers that executive briefings run exclusively on the new platform.

### 3. Cloud FinOps Demobilisation & Resource Cleanup
Preventing ongoing cloud billing waste:
- Destroy ephemeral testing schemas and transient sandbox databases created during development.
- Decommission development virtual warehouses and remove excess compute cluster worker nodes.
- Reclaim unused dbt Cloud developer seats and Fivetran connector subscriptions.
- Verify that storage lifecycle policies (`OPTIMIZE`, `VACUUM`, and cold archive tiering) are active on all production Delta/Iceberg tables.

### 4. Residual Data Debt Transfer
Any non-critical technical debt identified during delivery—such as secondary dimension tables awaiting refactoring or legacy fields earmarked for future removal—must be formally logged in the **[[Follow-on Actions Report]]** and transferred to the ongoing DataOps product maintenance backlog.

---

## Flashcard Q&A

- **Q:** What is the primary operational risk of an informal data project closure?
    - **A:** Creating "orphaned pipelines"—unmonitored ETL jobs running in the cloud that burn compute budget indefinitely, lack documentation, and break silently without an assigned on-call team.

- **Q:** Why is the deprecation of legacy spreadsheets an essential criterion for data project closure?
    - **A:** Because project benefits are not realized until business users abandon manual spreadsheets. If legacy CSVs continue to circulate, data discrepancies persist and the new platform's ROI is compromised.

- **Q:** What does the DataOps Operational Runbook provide during handover?
    - **A:** Step-by-step diagnostic and remediation instructions for on-call engineers, detailing how to resolve DAG failures, restart interrupted backfills, handle upstream schema drift, and escalate critical outages.

---
## Navigation & Related Notes
- **Up**: [[00 - Overview|Project and Programme Processes Overview]]
- **Previous**: [[Deliver A Project Or Programme]]
- **Next**: [[Follow-on Actions Report]]

### Related Concepts & Artefacts
- [[00 - Praxis Framework Overview|Praxis Framework Master MOC]]
- [[Delivery Process]]
- [[Follow-on Actions Report]]
- [[Control Management Plan]]
- [[Capability Maturity]]

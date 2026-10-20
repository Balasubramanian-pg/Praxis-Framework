---
title: "Deliver A Project Or Programme Process"
aliases:
  - "Delivery Execution Process"
  - "DataOps Sprint Execution Engine"
tags:
  - praxis-framework
  - pillar/method
  - section/delivery-process
  - type/process
  - praxis/data-bi
  - topic/delivery-process
  - discipline/dataops
pillar: "Method"
section: "Delivery Process"
subarea: "Process"
type: "process"
status: "published"
source: "Praxis Framework"
source_url: "https://www.praxisframework.org"
created: 2026-10-17
updated: 2026-10-20
---

> [!NAV] Navigation
> **Vault**: [[00 - Praxis Framework Overview|Praxis Overview]] > **Section**: [[00 - Overview|Delivery Process]]
> **Pillar**: Method | **Type**: `process`

# Deliver A Project Or Programme Process: The DataOps Sprint Engine

> [!SUMMARY] Overview
> The core operational execution process where cross-functional data squads build, test, and release Medallion data products—executing continuous DataOps observability, enforcing automated quality gates, managing cloud FinOps burn, and formally accepting verified deliverables.

## Overview
The **Deliver A Project Or Programme** process represents the day-to-day management engine of the project life cycle.

In enterprise Data Engineering, Analytics Engineering, and Business Intelligence (BI), delivery is not an undifferentiated stream of coding tasks. It operates as an **Agile-Medallion Sprint Engine**, continuously translating raw data inputs into trusted, certified executive decisions through a repeatable four-step operational cycle.

```
                    The Continuous DataOps Delivery Engine
                    
┌─────────────────────────────────────────────────────────────────────────────────┐
│              1. Authorise Work: Vertical Slice Work Packages                     │
│  - Bronze CDC Ingestion Tasks   - Silver dbt Transformation Tasks               │
│  - Gold Star Schema Modeling    - Power BI Semantic Layer Measures              │
└────────────────────────────────────────┬────────────────────────────────────────┘
                                         │
                                         ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│              2. Monitor & Track: Continuous DataOps Telemetry                    │
│  - Overnight Batch Ingestion Timestamps - dbt Automated Test Execution Passes   │
│  - Daily Snowflake/Databricks Credit Burn - Sentry / PagerDuty Alert Logs       │
└────────────────────────────────────────┬────────────────────────────────────────┘
                                         │
                                         ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│              3. Control & Escalate: Active Remediation & Circuit Breakers       │
│  - Quarantine Corrupted Upstream Records - Delta Lake Time-Travel Restores      │
│  - Log P1–P4 DataOps Incidents           - Raise Exception Reports to Sponsor   │
└────────────────────────────────────────┬────────────────────────────────────────┘
                                         │
                                         ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│              4. Accept Deliverables: Modern Definition of Done (DoD)            │
│  - 100% Passing Tests (PK/FK/Range)      - General Ledger Reconciliation        │
│  - Lineage Published in Unity Catalog    - Dashboard Cold Render < 2.0s         │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

## The Four Delivery Activities in Data & BI Initiatives

### 1. Authorise Work Packages (Vertical Slices)
The Data Project Manager and Technical Leads delegate well-defined, vertical slice work packages to specialized multidisciplinary squad members:
- **Data Platform Engineer**: Ingestion DAGs and CDC connectors conforming to the [[Product Documents#1. The Producer-Consumer Data Contract|Data Contract]].
- **Analytics Engineer**: Staging, cleansing, and Kimball dimensional star schema models in dbt with automated tests.
- **BI Developer**: Power BI / Tableau visual layouts, DAX measures, and Row-Level Security (RLS) enforcement.
- **Data Governance Steward**: Metadata documentation, business glossary tagging, and dynamic PII masking policies.

### 2. Monitor & Track Performance Actuals
The team tracks execution against approved tolerances in the [[Delivery Plan]]:
- **Daily Standup Rhythms**: Scanning overnight pipeline health in the [[Daily Log]] (run completion times, dbt test passes, and blockers).
- **FinOps Daily Tracking**: Monitoring virtual warehouse compute credit burn against the sprint budget, verifying 60-second auto-suspend compliance.
- **Sprint Burn-Down**: Tracking story point velocity across Jira/Azure DevOps boards.

### 3. Exercise Control & Incident Escalation
When data anomalies or infrastructure failures occur, the team takes disciplined corrective action:
- **Circuit Breakers**: Immediately halting downstream Gold table refreshes if primary key or reconciliation tests fail in the Silver layer, preventing bad numbers from reaching executive reports.
- **Incident Logging**: Recording outages in the [[Issue Register]] and executing idempotent partition backfills or Delta Lake time-travel restores (`RESTORE TABLE ... TO TIMESTAMP AS OF`).
- **Exception Reporting**: Submitting an Exception Report to the Project Sponsor if a pipeline failure threatens morning executive briefing deadlines (08:00 UTC).

### 4. Formally Accept Completed Deliverables
Work packages are certified only when they satisfy the project's **Definition of Done (DoD)**:
- Code reviewed and merged into `main` via dbt Slim CI pull request.
- Automated reconciliation test confirms parity against the source General Ledger within $0.001\%$.
- Cold-cache visual render time audited at $< 2.0$ seconds via Performance Analyzer.
- Formal UAT sign-off received from the Department Data Champion.

---

## Flashcard Q&A

- **Q:** How are work packages authorized in an Agile-Medallion data delivery engine?
    - **A:** As vertical end-to-end value slices—authorizing coordinated tasks across ingestion (Bronze), transformation (Silver/Gold), semantic modeling, and BI reporting in each 2-week sprint rather than isolated horizontal layers.

- **Q:** What is a "DataOps Circuit Breaker" in the delivery control activity?
    - **A:** An automated pipeline gate that halts downstream execution when severe data quality anomalies (such as duplicate primary keys or financial reconciliation deltas) are detected, preventing corrupted metrics from reaching production dashboards.

- **Q:** What criteria must be satisfied before a data deliverable is formally accepted?
    - **A:** The deliverable must meet the Definition of Done: 100% passing automated tests, audited General Ledger reconciliation, verified column lineage in the data catalog, and sub-2.0s dashboard visual load performance.

---
## Navigation & Related Notes
- **Up**: [[00 - Overview|Delivery Process Overview]]
- **Previous**: [[Define A Project Or Programme]]
- **Next**: [[Delivery Process]]

### Related Concepts & Artefacts
- [[00 - Praxis Framework Overview|Praxis Framework Master MOC]]
- [[Delivery Process]]
- [[Control Management Plan]]
- [[Issue Register]]
- [[Product Documents]]
- [[Capability Maturity]]

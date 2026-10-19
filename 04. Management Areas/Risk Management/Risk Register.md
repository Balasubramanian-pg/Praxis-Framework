---
title: "Risk Register"
aliases:
  - "Risk Log"
  - "RR"
tags:
  - praxis-framework
  - pillar/method
  - section/risk-management
  - type/artefact
  - praxis/data-bi
  - topic/risk-register
  - discipline/dataops
pillar: "Method"
section: "Risk Management"
subarea: "Documentation"
type: "artefact"
status: "published"
source: "Praxis Framework"
source_url: "https://www.praxisframework.org"
created: 2026-10-17
updated: 2026-10-17
---

> [!NAV] Navigation
> **Vault**: [[00 - Praxis Framework Overview|Praxis Overview]] > **Section**: [[00 - Overview|Risk Management]]
> **Pillar**: Method | **Type**: `artefact`

# Risk Register

> [!SUMMARY] Overview
> The Risk Register is a living delivery document that records and tracks all identified risk events, assessments, and response plans.

## Purpose
The **Risk Register** records information about all identified threats and opportunities affecting the project, programme, or portfolio. It tracks each risk through the iterative steps of assessment, response planning, ownership assignment, and eventual closure.

## Key Information Recorded
- **Risk Identifier**: Unique reference code (e.g., `RSK-DE-001`, `RSK-BI-004`).
- **Data Architecture Layer**: Bronze (Raw Ingestion), Silver (Conformed/Cleaned), Gold (Curated Marts), Semantic Layer, or BI Presentation.
- **Description**: Cause, event, and effect (e.g., *Due to an unannounced upstream CRM migration [cause], schema drift may drop critical foreign keys [event], leading to pipeline breakage and corrupted revenue metrics [effect]*).
- **Type**: Threat (negative disruption) or Opportunity (e.g., serverless compute cost reduction).
- **Assessment**: Pre-response probability (1–5), impact (1–5), and risk severity score ($P \times I$).
- **Risk Owner**: Specific engineer accountable (Lead Data Engineer, Analytics Engineer, BI Architect, Data Steward).
- **Response Strategy**: Avoid, reduce, transfer, accept.
- **Action Plan & Controls**: Automated dbt tests, Data Contracts, Slack observability alerts, fallback caching.
- **Post-Response Assessment**: Residual probability, impact, and severity score.
- **Status**: Open, Monitoring, Mitigated, or Escalated to [[Issue Register]].

---

## Exemplar: Enterprise Data Engineering & BI Risk Register

The following real-world register illustrates the primary failure modes encountered in Lakehouse, Data Warehouse, and BI initiatives:

| Risk ID | Architecture Layer | Cause, Event, and Impact | Pre ($P \times I$) | Mitigation Strategy & Controls | Residual ($P \times I$) | Risk Owner |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **RSK-DE-001** | Bronze / Ingestion | **Upstream Schema Drift**: Upstream SaaS ERP updates column names without notification, causing schema mismatch and breaking nightly ingestion DAGs. | **4 × 5 = 20** (Critical) | **Reduce**: Implement Producer-Consumer Data Contracts with JSON schema validation at the ingestion gateway; configure schema evolution modes in Delta Lake / Iceberg to quarantine malformed records. | **1 × 3 = 3** (Low) | Lead Data Engineer |
| **RSK-DE-002** | Silver / Transformation | **Silent Data Corruption**: Source database allows negative values in `unit_price`, which bypass basic pipeline checks and silently corrupt downstream financial aggregations. | **4 × 4 = 16** (High) | **Reduce**: Deploy automated dbt test assertions (`accepted_values`, `not_null`, min/max bounds) that halt pipeline execution and trigger PagerDuty alerts prior to Silver publication. | **1 × 2 = 2** (Low) | Analytics Engineer |
| **RSK-DE-003** | Pipeline Orchestration | **Batch Window SLA Breach**: Exponential transaction growth pushes nightly Spark cluster runtimes past the 6:00 AM cutoff, causing missing data during executive morning briefings. | **3 × 4 = 12** (High) | **Avoid/Reduce**: Migrate monolithic full-table batch overwrites to incremental Change Data Capture (CDC) via Debezium and Delta Live Tables. | **2 × 2 = 4** (Low) | Data Platform Lead |
| **RSK-DE-004** | Governance & Security | **Unmasked PII Ingestion**: Marketing platform updates webhook payloads to include customer credit card hashes and email addresses into public Bronze tables. | **2 × 5 = 10** (High) | **Avoid**: Automate PII classification scanning via Unity Catalog / Microsoft Purview; enforce dynamic column-level data masking and tag-based access control (TBAC). | **1 × 4 = 4** (Low) | Data Governance Steward |
| **RSK-BI-005** | Gold / Semantic Layer | **Executive Dashboard Abandonment**: Unoptimized DAX measures and millions of un-aggregated rows cause dashboard load times to exceed 20 seconds, causing leaders to revert to manual spreadsheets. | **4 × 4 = 16** (High) | **Reduce**: Implement Power BI composite models and pre-computed aggregation tables; conduct weekly user adoption reviews with department Data Champions. | **2 × 2 = 4** (Low) | Lead BI Developer |
| **RSK-OP-006** | Cloud FinOps | **Runaway Query Costs**: Junior analysts submit unpartitioned cross-join queries against a 20-billion-row fact table on an auto-scaling Snowflake warehouse. | **4 × 3 = 12** (High) | **Reduce**: Enforce strict query timeout limits (max 5 minutes) and auto-suspend cluster policies (60 seconds); configure daily warehouse credit quotas and Slack burn-rate notifications. | **1 × 2 = 2** (Low) | FinOps Lead |

---

## DataOps Risk Lifecycle & Automated Alert Escalation

In a modern DataOps delivery environment, the Risk Register connects directly with operational observability tooling:

```
[Operational Telemetry] ──► [Automated Threshold Breach]
(dbt test, Monte Carlo,     (e.g., Pipeline lag > 45 mins)
 Great Expectations)                    │
                                        ▼
                           [Risk Event Manifests]
                                        │
           ┌────────────────────────────┴────────────────────────────┐
           ▼                                                         ▼
[Low/Medium Severity: Managed Action]              [High/Critical: Escalated]
- Incident ticket logged in Jira/GitHub            - Pipeline halted before Gold layer
- Mitigation script executed (backfill)            - Incident escalated to [[Issue Register]]
- Risk Register record updated with notes          - Executive stakeholder notification sent
```

> [!TIP] Connecting Risks to dbt Tests
> Every technical risk in the register relating to data quality, freshness, or schema conformity should have an associated automated test suite in the repository (`tests/*.sql` or `schema.yml`). If a risk cannot be tested automatically, it must be monitored via explicit human operational checklists.

## Life Cycle Timing
- **Initiated**: During the [[Identification Process]] with initial high-level risks in the [[Brief]].
- **Formally Established**: During the [[Definition Process]] following the [[Risk Management Plan]].
- **Actively Updated**: Continuously during the [[Delivery Process]] by the project manager and risk owners.
- **Closed / Transferred**: During the [[Closure Process]], residual risks are transferred to operational teams.



---
## Navigation & Related Notes
- **Up**: [[00 - Overview|Risk Management Overview]]
- **Previous**: [[Risk Management Plan]]
- **Next**: [[Risk Techniques]]

### Related Concepts & Artefacts
- [[Risk Management Plan]]
- [[Risk Register]]
- [[Manage Risk Competency|Manage Risk]]
- [[Delivery Process]]

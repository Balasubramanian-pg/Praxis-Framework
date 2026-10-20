---
title: "Lessons Log"
aliases:
  - "Lessons Learned Log"
  - "Lessons Register"
  - "DataOps Post-Mortems"
tags:
  - praxis-framework
  - pillar/method
  - section/delivery-documents
  - type/artefact
  - praxis/data-bi
  - topic/lessons-learned
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

# Lessons Log: DataOps Incident Learnings & Architecture Retrospectives

> [!SUMMARY] Overview
> The Lessons Log captures experiential insights, blameless post-mortem findings, and architectural failures across data pipelines, FinOps budgets, and BI dashboards—converting project lessons into automated CI/CD tests and organizational capability maturity.

## Purpose
The **Lessons Log** records empirical knowledge gained throughout the project life cycle. In traditional management, lessons are frequently documented in static reports and forgotten. 

In enterprise Data Engineering, Analytics Engineering, and Business Intelligence (BI), Praxis applies the **DataOps Post-Mortem Rule**: 
> [!IMPORTANT] The Golden Rule of DataOps Lessons Learned
> A technical lesson is only considered **learned and embedded** when it is converted into an **automated regression test, an Infrastructure-as-Code policy, or an updated Data Contract**. If a pipeline fails due to a data anomaly, resolving the ticket is insufficient; an automated dbt test or Great Expectations assertion must be checked into Git to guarantee that specific failure mode can never silently re-occur.

```
                    The DataOps Lesson Codification Loop
                    
[Production Incident Occurs] ──► Recorded in [[Issue Register]] (P1–P4)
              │
              ▼
[Blameless Post-Mortem Review] ──► Root cause identified via "5 Whys" analysis
              │
              ▼
[Documented in Lessons Log] ──► Insight, recommendations, and prevention actions
              │
              ▼
[Codified into Codebase] ──► Automated dbt test / FinOps guardrail / CI/CD gate added
              │
              ▼
[Maturity Upgraded] ──► Failure mode permanently eliminated across future projects
```

---

## Exemplar: Enterprise Data & BI Lessons Log

The following real-world log demonstrates how recurring data platform failures are systematically converted into permanent engineering safeguards:

| Lesson ID | Project Phase | Trigger / Incident Summary | Root Cause Analysis (5 Whys) | Codified Preventative Action (dbt / DataOps) | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **LES-DE-001** | Delivery (Ingestion) | Upstream CRM migration altered date format from `YYYY-MM-DD` to `MM/DD/YYYY`, breaking nightly ingestion DAGs. | Pipeline relied on implicit date casting without strict schema validation at the ingestion landing gate. | **Codified in Code**: Deployed automated JSON schema validation in the ingestion gateway; quarantined malformed records to Dead-Letter Queue (DLQ). | **Embedded** |
| **LES-FIN-002** | Delivery (FinOps) | Junior data analyst ran an unindexed cross-join query over a long weekend, burning \$4,200 in Snowflake credits. | Exploratory virtual warehouse lacked hard execution timeout limits and auto-suspend was set to 10 minutes. | **Codified in IaC**: Configured Terraform to enforce 60-second `AUTO_SUSPEND` and hard 300-second `STATEMENT_TIMEOUT_IN_SECONDS` on all dev warehouses. | **Embedded** |
| **LES-BI-003** | Delivery (Presentation) | Sales leadership refused to use the certified Power BI dashboard, reverting to manual Excel reconciliations. | Dashboard took 22 seconds to load cold because fact table had 40M rows queried via un-aggregated DirectQuery. | **Codified in Modeling**: Re-engineered model into Kimball star schema with pre-computed aggregation tables; provisioned "Analyze in Excel" XMLA bridges. | **Embedded** |
| **LES-GOV-004** | Closure (Governance) | Security audit identified unhashed customer phone numbers in Silver staging tables accessible to 15 analysts. | Ingestion developers assumed third-party vendor pre-sanitized payloads; no automated PII scanning existed. | **Codified in Governance**: Integrated automated regex PII classification scanners into pre-commit pipeline hooks; enforced dynamic masking in Unity Catalog. | **Embedded** |

---

## The Blameless Post-Mortem Procedure

When a major pipeline outage, data corruption incident, or FinOps budget breach occurs, the team conducts a structured 30-minute blameless post-mortem:

1. **Establish the Timeline**: Reconstruct the exact sequence of events from observability logs (alert timestamp, incident triage, containment, and backfill completion).
2. **Conduct the "5 Whys"**: Drill down past superficial human error (*"The engineer typed the wrong join"*) to systemic root causes (*"The CI/CD pipeline lacked an automated surrogate key uniqueness test before deployment"*).
3. **Assign Codification Tasks**: Every lesson must produce at least one pull request adding an automated test (`tests/*.sql`), updating a [[Product Documents#1. The Producer-Consumer Data Contract|Data Contract]], or modifying a [[Control Management Plan]] threshold.
4. **Publish & Share**: Review findings during the bi-weekly sprint retrospective to propagate knowledge across all domain analytics squads.

---

## Flashcard Q&A

- **Q:** What is the primary difference between a traditional Lessons Log and a DataOps Lessons Log?
    - **A:** Traditional lessons logs often remain passive narrative records. A DataOps Lessons Log mandates that every technical insight or failure mode be codified into an automated regression test, CI/CD quality gate, or FinOps guardrail in the codebase.

- **Q:** Why is a "blameless" culture essential for effective lessons learned in data engineering?
    - **A:** If engineers fear punishment for pipeline breaks, they hide near-misses and data anomalies. A blameless culture encourages transparent reporting, enabling the team to discover systemic data quality gaps and automate safeguards.

- **Q:** How does the Lessons Log directly advance organizational Capability Maturity?
    - **A:** By codifying lessons into shared Git templates, automated dbt macros, and enterprise data contracts, the entire organization elevates from Level 1 (ad-hoc firefighting) to Level 4/5 (quantitatively managed, self-healing DataOps).

---
## Navigation & Related Notes
- **Up**: [[00 - Overview|Delivery Documents Overview]]
- **Previous**: [[Issue Register]]
- **Next**: [[Manage Requirements]]

### Related Concepts & Artefacts
- [[00 - Praxis Framework Overview|Praxis Framework Master MOC]]
- [[Issue Register]]
- [[Control Management Plan]]
- [[General Principles of Risk Management]]
- [[Capability Maturity]]

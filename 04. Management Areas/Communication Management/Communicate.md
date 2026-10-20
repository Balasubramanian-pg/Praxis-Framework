---
title: "Communicate Competency"
aliases:
  - "Communication Skill"
  - "Data Storytelling & Translation"
tags:
  - praxis-framework
  - pillar/competence
  - section/communication-management
  - type/competency
  - praxis/data-bi
  - topic/data-communication
  - discipline/dataops
pillar: "Competence"
section: "Communication Management"
subarea: "Interpersonal Competencies"
type: "competency"
status: "published"
source: "Praxis Framework"
source_url: "https://www.praxisframework.org"
created: 2026-10-17
updated: 2026-10-20
---

> [!NAV] Navigation
> **Vault**: [[00 - Praxis Framework Overview|Praxis Overview]] > **Section**: [[00 - Overview|Communication Management]]
> **Pillar**: Competence | **Type**: `competency`

# Communicate Competency: Data Storytelling & Technical Translation

> [!SUMMARY] Overview
> Demonstrates the capability to translate complex lakehouse engineering constraints into clear business impact statements, communicate transparently during high-severity DataOps incidents, and craft actionable executive data stories.

## Purpose
The **Communicate** competency certifies that a data project manager, lead analytics engineer, or BI lead can bridge the profound communication gap between deep engineering jargon and executive decision-making.

A frequent failure mode in enterprise analytics projects is the **"Jargon Chasm"**: engineers explain pipeline issues in low-level technical terms (*"Spark worker OOM during shuffle write"*), while business executives only want to know whether they can trust their morning revenue numbers. Competent data leaders translate technical mechanics into business outcomes and risk profiles.

```
                     The Analytics Translation Spectrum
                     
Technical Data Dialect                         Executive Business Dialect
"Delta Lake ACID commit with Z-Order"    ──►   "Sub-second report load on 5 years of sales"
"SCD Type-2 dimension historical split"  ──►   "Accurate attribution of sales to former territories"
"dbt test foreign key violation"         ──►   "Quarantined 200 orders to protect CFO revenue metrics"
"Upstream API payload schema drift"      ──►   "ERP billing update delayed morning refresh by 45 mins"
```

---

## Performance Criteria

An individual certified in this competency demonstrates the following practical capabilities:

1. **Execute Bi-Directional Technical Translation**:
   - Translate executive business questions into precise dimensional modeling specifications (Kimball star schema grain, foreign keys, aggregations).
   - Translate engineering blockers (e.g., API rate limits, database locks) into operational business impacts and decision trade-offs.

2. **Lead High-Stakes DataOps Incident Communications**:
   - During P1 pipeline outages or corrupted data events, deliver calm, structured, and transparent status broadcasts to executive channels (e.g., `#data-announcements` on Slack/Teams):
     ```markdown
     [Data Notice] Morning Sales Dashboard Update - 07:30 UTC
     Status: Serving Certified Data as of Yesterday (2026-10-19)
     What Happened: Upstream billing batch delayed by 45 minutes; automated quality tests caught missing tax records.
     Action: Pipeline is currently reprocessing. Gold layer will refresh by 09:15 UTC.
     Impact: Do not export Q3 numbers for board review until verified notice is posted. Next update: 08:30 UTC.
     ```

3. **Facilitate Metric Consensus & Dispute Workshops**:
   - Mediate semantic debates between competing departments (e.g., when Sales calculates revenue upon booking while Finance calculates revenue upon cash settlement).
   - Guide stakeholders to consensus and codify standard enterprise metric definitions in the [[Product Documents#2. dbt Model & Semantic Layer Specification|Semantic Layer Specification]].

4. **Champion Executive Data Storytelling**:
   - Present sprint demonstrations focusing on actionable business decisions unlocked rather than lines of SQL written.
   - Design visual presentation hierarchies that answer executive questions in 5 seconds (Top-line KPI Cards $\to$ Trend Lines $\to$ Granular Drilldown Tables).

---

## Knowledge & Competence Criteria

To achieve proficiency, the practitioner must master:

- **Audience Segmentation in Analytics**: Customizing message depth across three tiers:
  1. *C-Suite*: Strategic decisions, metric trust, financial ROI.
  2. *Upstream Application Developers*: Schema contracts, API rate limits, breaking change lead times.
  3. *Domain Business Analysts*: Self-service training, DAX measures, catalog search.
- **Visual Information Hierarchy**: Applying cognitive design principles (Gestalt principles, color psychology, cognitive load reduction) to dashboard wireframes.
- **Blameless Incident Framing**: Fostering psychological safety by communicating operational errors as opportunities to improve automated test suites rather than individual blame.

---

## Flashcard Q&A

- **Q:** What is the primary communication objective during a P1 data pipeline failure?
    - **A:** Transparency and trust preservation: immediately alerting stakeholders that yesterday's certified data is being served, explaining the containment action underway, and providing an estimated time of resolution without technical jargon.

- **Q:** How should a data project manager explain why adding a new column takes several days?
    - **A:** By translating the engineering process into business terms: explaining that the new field must be ingested from raw source history, tested for quality and nulls, backfilled across historical years, and verified against the general ledger before appearing in reports.

- **Q:** What is the "Jargon Chasm" in data project management?
    - **A:** The communication barrier occurring when data engineers speak exclusively in technical infrastructure terms (Spark, DAGs, partitions) while business users speak in revenue, margin, and operational deadlines, resulting in mutual misunderstanding.

---
## Navigation & Related Notes
- **Up**: [[00 - Overview|Communication Management Overview]]
- **Previous**: [[Communication Plan]]
- **Next**: [[Communication]]

### Related Concepts & Artefacts
- [[00 - Praxis Framework Overview|Praxis Framework Master MOC]]
- [[General Principles of Stakeholder Management]]
- [[Goal of Change Management]]
- [[Issue Register]]
- [[Capability Maturity]]

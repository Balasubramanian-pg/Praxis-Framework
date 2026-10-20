---
title: "Identify A Project Or Programme Competency"
aliases:
  - "Identification Competency"
  - "Data Project Identification"
tags:
  - praxis-framework
  - pillar/competence
  - section/processes
  - type/competency
  - praxis/data-bi
  - topic/project-identification
  - discipline/dataops
pillar: "Competence"
section: "Project and Programme Processes"
subarea: "Process Competencies"
type: "competency"
status: "published"
source: "Praxis Framework"
source_url: "https://www.praxisframework.org"
created: 2026-10-17
updated: 2026-10-20
---

> [!NAV] Navigation
> **Vault**: [[00 - Praxis Framework Overview|Praxis Overview]] > **Section**: [[00 - Overview|Project and Programme Processes]]
> **Pillar**: Competence | **Type**: `competency`

# Identify A Project Or Programme Competency: Data Feasibility & Mandate Triage

> [!SUMMARY] Overview
> Demonstrates the capability to transform ambiguous executive mandates into actionable project briefs, conduct empirical "Data Feasibility Spikes" to profile upstream source health, draft the Outline Business Case, and secure Sponsor approval to initiate Definition.

## Purpose
The **Identify A Project Or Programme** competency certifies that a project manager, analytics translator, or lead data architect can evaluate the preliminary viability of a proposed analytics initiative before the organization commits substantial capital to full definition and delivery.

In enterprise Data Engineering, Analytics Engineering, and Business Intelligence (BI), the identification phase is the first line of defense against the **"Garbage In, Garbage Out"** trap. Projects initiated without empirical source profiling frequently collapse during delivery when developers discover that raw data is missing, corrupted, or structurally inadequate to support the proposed dashboards.

```
                    The Data Identification Stage Flow
                    
[Strategic Executive Mandate]   "Build an executive AI customer retention cockpit"
             │
             ▼
[Mandate Triage & Framing]      Identify specific business decision: "Predict customer churn risk"
             │
             ▼
[The Data Feasibility Spike]    3-day empirical profile of CRM, Billing, and Webhook sources:
                                - Are primary keys unique? (0% duplicate check)
                                - Is historical depth adequate? (Need 24 months, source has 6)
                                - Are source APIs accessible? (Verify auth & rate limits)
             │
             ▼
[Project Brief & Outline Case]  Draft Brief with Data Feasibility Annex & initial FinOps TCO
             │
             ▼
[Gateway Review 1 (Sponsor)]   Approve funding for detailed [[Definition Process]]
```

---

## Performance Criteria

An individual certified in this competency demonstrates the following practical capabilities:

1. **Triage & Translate Strategic Mandates**:
   - Filter executive requests using the **Decision-Centric Test**: identify the specific business decision the proposed data platform will inform, who will make it, and the operational cadence required.
   - Steer stakeholders away from vague vanity initiatives (*"We need a 360-degree dashboard"*) toward actionable problem statements (*"Recovering \$800K in lost billing revenue caused by untracked discount leakage"*).

2. **Execute the Empirical Data Feasibility Spike**:
   - Direct a time-boxed technical investigation (typically 3–5 days) to directly query and profile candidate raw sources.
   - Quantify core data parameters: daily record ingestion volumes, historical snapshot depth, primary key uniqueness, foreign key orphan rates, and API rate limit constraints.
   - Document technical data debt in the **Data Feasibility Annex**.

3. **Formulate the Project Brief & Outline Business Case**:
   - Author the formal [[Brief]] detailing project objectives, scope boundaries (which source systems are in/out of scope), and preliminary Lakehouse architecture options.
   - Draft the **Outline Business Case**, comparing rough-order-of-magnitude (ROM) cloud consumption and engineering labor costs against quantified labor hours saved from manual reporting.

4. **Prepare the Definition Plan & Present Gateway 1**:
   - Create the [[Definition Plan]] specifying the resource requirements, timeline, and budget needed to complete detailed architecture design, data contract negotiations, and security governance.
   - Present the viability recommendation to the Project Sponsor to secure formal authorization to proceed to the [[Definition Process]].

---

## Knowledge & Competence Criteria

To achieve proficiency, the practitioner must master:

- **Source System Archetypes**: The operational differences between querying relational transactional databases (OLTP), SaaS REST APIs, event streams (Kafka), and legacy flat-file SFTP exports.
- **The Limits of Synthesis**: Recognizing that missing historical data cannot be magically generated or synthesized—if an operational CRM only started storing cancellation reasons 30 days ago, a 3-year historical churn model is physically impossible.
- **Gateway Governance**: Guiding the Sponsor through Gateway Review 1 with transparent risk assessments rather than premature delivery promises.

---

## Flashcard Q&A

- **Q:** Why is an empirical "Data Feasibility Spike" mandatory during the Identification phase of a data project?
    - **A:** Because data projects cannot succeed if raw source data is missing, corrupted, or lacking historical depth. A feasibility spike profiles real source data before the organization commits funds to detailed definition and delivery.

- **Q:** What is the primary output of the "Identify a Project or Programme" process?
    - **A:** The Project Brief (incorporating the Outline Business Case and Data Feasibility Annex) and the Definition Plan for the next phase.

- **Q:** How should a project manager respond to a vague executive mandate like "We need an executive analytics platform"?
    - **A:** By using the "Decision Backwards" technique to determine the specific decisions executives need to make, the required frequency, and the minimum acceptable data freshness before scoping any data pipelines.

---
## Navigation & Related Notes
- **Up**: [[00 - Overview|Project and Programme Processes Overview]]
- **Previous**: [[Develop Solution]]
- **Next**: [[Define A Project Or Programme]]

### Related Concepts & Artefacts
- [[00 - Praxis Framework Overview|Praxis Framework Master MOC]]
- [[Identification Process]]
- [[Definition Process]]
- [[Manage The Business Case]]
- [[Capability Maturity]]

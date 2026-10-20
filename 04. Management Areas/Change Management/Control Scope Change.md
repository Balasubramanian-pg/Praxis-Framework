---
title: "Control Scope Change Competency"
aliases:
  - "Change Control Competency"
tags:
  - praxis-framework
  - pillar/competence
  - section/change-management
  - type/competency
  - praxis/data-bi
  - topic/scope-change
  - discipline/dataops
pillar: "Competence"
section: "Change Management"
subarea: "Management Competencies"
type: "competency"
status: "published"
source: "Praxis Framework"
source_url: "https://www.praxisframework.org"
created: 2026-10-17
updated: 2026-10-20
---

> [!NAV] Navigation
> **Vault**: [[00 - Praxis Framework Overview|Praxis Overview]] > **Section**: [[00 - Overview|Change Management]]
> **Pillar**: Competence | **Type**: `competency`

# Control Scope Change Competency

> [!SUMMARY] Overview
> Demonstrates the capability to capture change requests, evaluate technical and financial impacts, and obtain authorized decisions before altering baselined data contracts, pipeline models, or reporting metrics.

## Purpose
The **Control Scope Change** competency certifies that a project manager, analytics engineer, or data product owner can systematically capture, evaluate, and govern modifications to baselined data architectures, pipeline contracts, semantic metric definitions, and dashboard wireframes.

In enterprise data and business intelligence projects, uncontrolled scope change is the primary driver of degraded pipeline performance, conflicting business metrics, and project budget overruns.

---

## The "Quick Column" Fallacy in Data & BI

A central responsibility of this competency is dispelling the illusion that modifying a data deliverable is simple:

> [!CAUTION] The "Just Add One Column" Trap
> Stakeholders frequently request what they perceive as minor adjustments: *"Can you just add customer acquisition channel to this executive dashboard?"*
> 
> In reality, a single column change triggers an end-to-end engineering dependency chain:
> 1. **Bronze Ingestion**: Updating API extract payloads or CDC connectors.
> 2. **Silver Transformation**: Writing and testing dbt cleansing logic, checking for unexpected NULL rates or non-unique keys.
> 3. **Gold Star Schema**: Modifying dimension tables, altering surrogate keys, and executing multi-year historical backfills.
> 4. **Semantic Layer**: Updating DAX / Tabular models, validating cross-filtering performance, and recalculating aggregated tables.
> 5. **Governance**: Updating Unity Catalog metadata and checking PII compliance.

Competent data leaders do not reject changes outright; they subject them to structured impact analysis before implementation.

---

## Performance Criteria

An individual certified in this competency demonstrates the following capabilities:

1. **Log & Categorize Requests**:
   - Record every proposed change in the [[Change log]].
   - Categorize whether the change is an **Ad-Hoc Exploration Request** (routed to a self-service sandbox), a **Backlog Iteration Item** (prioritized during sprint planning), or a **Baseline Scope Change** (requiring formal governance review).

2. **Conduct Modern Data Impact Analysis**:
   - Assess technical feasibility: Does the raw source actually contain the required historical depth and data quality?
   - Evaluate FinOps implications: Will the additional data volume or increased compute cluster sizing breach approved cloud consumption budgets?
   - Analyze regression risk: Will changing a dimension grain break existing downstream dbt models or executive reporting visuals?

3. **Negotiate & Authorize**:
   - Present trade-off analyses (e.g., schedule delay vs. compute cost increase) to the Change Authority or Project Sponsor.
   - For upstream changes, negotiate updated [[Product Documents#1. The Producer-Consumer Data Contract|Data Contracts]] with source system application leads.

4. **Re-baseline & Synchronize**:
   - Update repository configuration files, dbt schema definitions, and [[Delivery Plan]] schedules upon formal approval.
   - Publish deprecation notices and updated metric definitions in the enterprise data catalog.

---

## Knowledge & Competence Criteria

To achieve proficiency, the practitioner must understand:

- **Semantic Layer Versioning**: How semantic modeling layers (dbt Semantic Layer, Power BI Shared Datasets) manage breaking vs. non-breaking metric changes.
- **Backfill Economics**: The compute credit cost and time requirements of reprocessing historical partitions versus writing forward-only incremental transformations.
- **Schema Evolution Controls**: The operational difference between additive schema changes (appending nullable columns) and destructive breaking changes (renaming, dropping, or re-typing columns).

---

## Flashcard Q&A

- **Q:** Why does adding a "single column" to a production dashboard represent significant scope change?
    - **A:** Because it requires modifications across the entire modern data stack: raw Bronze ingestion, Silver dbt cleansing, Gold star schema dimensional remodeling, historical partition backfilling, semantic measure updates, and governance cataloging.

- **Q:** How should a data project manager handle urgent ad-hoc analytical queries that threaten sprint velocity?
    - **A:** Route them to self-service analytics sandboxes or governed "Analyze in Excel" bridges rather than interrupting active sprint delivery with unvetted production pipeline changes.

- **Q:** What is the difference between additive and destructive schema changes?
    - **A:** **Additive changes** append new nullable columns and preserve backwards compatibility. **Destructive changes** rename, delete, or alter the data type of existing columns, breaking downstream consumers unless governed via versioned Data Contracts.

---
## Navigation & Related Notes
- **Up**: [[00 - Overview|Change Management Overview]]
- **Previous**: [[Change Management Capability Maturity]]
- **Next**: [[Goal of Change Management]]

### Related Concepts & Artefacts
- [[00 - Praxis Framework Overview|Praxis Framework Master MOC]]
- [[Change log]]
- [[Product Documents]]
- [[Scope Management]]
- [[Capability Maturity]]

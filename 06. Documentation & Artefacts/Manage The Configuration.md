---
title: "Manage The Configuration Competency"
aliases:
  - "Configuration Management Competency"
  - "DataOps GitOps Competency"
tags:
  - praxis-framework
  - pillar/competence
  - section/configuration-management
  - type/competency
  - praxis/data-bi
  - topic/configuration-management
  - discipline/dataops
pillar: "Competence"
section: "Configuration Management"
subarea: "Management Competencies"
type: "competency"
status: "published"
source: "Praxis Framework"
source_url: "https://www.praxisframework.org"
created: 2026-10-17
updated: 2026-10-20
---

> [!NAV] Navigation
> **Vault**: [[00 - Praxis Framework Overview|Praxis Overview]] > **Section**: [[00 - Overview|Configuration Management]]
> **Pillar**: Competence | **Type**: `competency`

# Manage The Configuration Competency: GitOps & Lakehouse State Versioning

> [!SUMMARY] Overview
> Demonstrates the capability to enforce configuration integrity across both code (Git, dbt models, TMDL, CI/CD) and physical data states (Delta Lake, Apache Iceberg transaction logs), executing automated Slim CI testing and preventing schema drift.

## Purpose
The **Manage The Configuration** competency certifies that an analytics engineer, lead data platform engineer, or technical project manager can operate modern configuration control frameworks to protect analytics baselines from unvetted mutations.

In enterprise Data & Business Intelligence initiatives, configuration management is operated via **GitOps and DataOps practices**. It ensures that no SQL script, metric formula, pipeline schedule, or table schema is deployed to production without version tracking, peer review, and automated regression testing.

```
                    The DataOps GitOps Configuration Gate
                    
[Engineer Feature Branch] ──► Writes dbt model SQL, YAML schema, Power BI TMDL
            │
            ▼
[Pull Request Created] ──► Triggers automated GitHub Actions / GitLab CI pipeline
            │
            ▼
[Ephemeral Slim CI] ──► Builds only modified models in temporary schema (`pr_104_silver`)
            │         Runs automated Great Expectations / dbt test suites
            ▼
[Peer Review Gate] ──► Senior Analytics Engineer verifies Kimball modeling & contracts
            │
            ▼
[Production Merge] ──► Merged into `main`; deployed to production Lakehouse via service principal
```

---

## Performance Criteria

An individual certified in this competency demonstrates the following practical capabilities:

1. **Establish Repository Versioning & Branch Protection**:
   - Structure Git repositories according to industry standards (e.g., separating platform infrastructure, dbt transformations, and BI semantic models).
   - Enforce branch protection rules on `main`: require at least one approving peer review, successful automated CI status checks, and linear commit histories.

2. **Operate Automated Slim CI Testing Pipelines**:
   - Configure dbt Slim CI (`dbt build --select state:modified+` comparing against production manifest artifacts).
   - Verify that all newly created or altered models execute successfully in isolated ephemeral schemas without failing referential integrity, primary key uniqueness, or nullability constraints.

3. **Manage Physical Lakehouse Table Versions & Time Travel**:
   - Maintain configuration control over Delta Lake / Apache Iceberg transaction logs, monitoring monotonic table versions and commit timestamps.
   - Execute time-travel verification audits and demonstrate the ability to roll back corrupted tables to exact historical snapshots:
     ```sql
     -- Restore corrupted Gold sales mart to exact approved commit
     RESTORE TABLE gold.fct_daily_sales TO VERSION AS OF 42;
     ```

4. **Synchronize Frontend BI Configuration via PBIP / TMDL**:
   - Eliminate binary `.pbix` merge conflicts by standardizing on Power BI Project (`.pbip`) and Tabular Model Definition Language (`TMDL`) text-based formats.
   - Maintain semantic model versioning in Git, synchronizing visual workspace changes with underlying dbt model releases.

---

## Knowledge & Competence Criteria

To achieve proficiency, the practitioner must master:

- **GitOps for Data Teams**: Managing code promotion across Development, Staging, and Production strictly via automated CI/CD pipelines driven by Git pull requests.
- **State vs. Code Duality**: Recognizing that data configuration requires synchronizing code state (Git commit SHAs) with physical data state (table snapshot versions).
- **Automated Schema Evolution Governance**: Configuring Delta/Iceberg schema enforcement modes (`mergeSchema`, `failIfDifferent`) to prevent accidental column mutation.

---

## Flashcard Q&A

- **Q:** Why is binary file format (such as legacy `.pbix`) problematic for configuration management in BI projects?
    - **A:** Binary files cannot be diffed, peer-reviewed, or merged in Git, causing overwritten work when multiple developers collaborate. Modern BI configuration uses text-based formats (Power BI TMDL / `.pbip`, LookML) that enable full Git versioning and pull-request reviews.

- **Q:** How does "Slim CI" improve configuration control in large data warehouses?
    - **A:** It leverages metadata manifests to only compile and test models that were directly modified (or sit downstream of modifications) in a pull request, accelerating build times from hours to minutes while reducing compute credit costs.

- **Q:** What is the configuration baseline of a lakehouse table?
    - **A:** The combination of its declared declarative schema in Git (`schema.yml`) and its physical storage snapshot recorded in the table's ACID transaction log (`_delta_log` or Iceberg metadata file).

---
## Navigation & Related Notes
- **Up**: [[00 - Overview|Configuration Management Overview]]
- **Previous**: [[Configuration Management]]
- **Next**: [[General Principles of Configuration Management]]

### Related Concepts & Artefacts
- [[00 - Praxis Framework Overview|Praxis Framework Master MOC]]
- [[Configuration Management]]
- [[Control Scope Change]]
- [[Product Documents]]
- [[Capability Maturity]]

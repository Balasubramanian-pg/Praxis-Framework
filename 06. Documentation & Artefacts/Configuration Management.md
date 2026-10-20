---
title: "Configuration Management"
aliases:
  - "Configuration Management Artefact"
  - "CM Plan"
  - "DataOps Configuration"
tags:
  - praxis-framework
  - pillar/method
  - section/configuration-management
  - type/artefact
  - praxis/data-bi
  - topic/configuration-management
  - discipline/dataops
pillar: "Method"
section: "Configuration Management"
subarea: "Documentation"
type: "artefact"
status: "published"
source: "Praxis Framework"
source_url: "https://www.praxisframework.org"
created: 2026-10-17
updated: 2026-10-20
---

> [!NAV] Navigation
> **Vault**: [[00 - Praxis Framework Overview|Praxis Overview]] > **Section**: [[00 - Overview|Configuration Management]]
> **Pillar**: Method | **Type**: `artefact`

# Configuration Management in the Modern Data Stack

> [!SUMMARY] Overview
> Outlines how data pipelines, SQL transformations, dbt semantic layers, Infrastructure as Code (IaC), and lakehouse table states are identified, version-controlled, audited, and protected against unauthorized drift.

## Purpose
The **Configuration Management** plan specifies the policies, technical tooling, versioning schemes, and audit trails required to manage baseline configurations across the data delivery life cycle.

In modern enterprise Data & Business Intelligence initiatives, configuration management is executed through **GitOps and DataOps principles**. It bridges two interconnected domains:
1. **Code & Definition Configuration**: Version control of SQL, Python, dbt models, and Infrastructure as Code (IaC) in Git.
2. **Data State Configuration**: Storage snapshot versioning of physical lakehouse tables via open formats (Delta Lake, Apache Iceberg).

```
                   Dual-Layer Data Configuration Management
                   
┌─────────────────────────────────────────────────────────────────────────────────┐
│                    Layer 1: Code & Model Configuration (Git)                    │
│   - dbt SQL Models & Macros           - Airflow DAG Orchestration Files         │
│   - Declarative Data Contracts        - Power BI PBIP / TMDL Semantic Files     │
└────────────────────────────────────────┬────────────────────────────────────────┘
                                         │
                                         ▼ (Enforced via CI/CD Pull Request Gates)
┌─────────────────────────────────────────────────────────────────────────────────┐
│              Layer 2: Physical Data State Configuration (Lakehouse)             │
│   - Delta Lake Immutable Commit Log    - Apache Iceberg Snapshot Metadata Files │
│   - Schema Evolution Enforcement       - Historical Time-Travel Versioning      │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

## The Four Core Configuration Activities in DataOps

### 1. Configuration Identification (What is Governed?)
Every technical asset in the analytics platform is cataloged as a **Configuration Item (CI)** with strict naming and versioning standards:

| Configuration Item (CI) | File Format / Artifact | Versioning Scheme | Authoritative Repository |
| :--- | :--- | :--- | :--- |
| **Data Contracts** | `contract.yaml` | Semantic Versioning (`MAJOR.MINOR.PATCH`) | Central Contract Registry / Git |
| **Transformation Logic** | dbt models (`.sql`, `.yml`) | Git Commit SHA + Feature Branch | GitHub / GitLab repository |
| **Pipeline Orchestration** | Airflow DAGs (`.py`) | Git Commit SHA + Docker Image Tag | Orchestrator Deployment Repo |
| **Lakehouse Tables** | Delta Lake / Iceberg tables | Monotonic Table Version (`v0`, `v1`...) | Storage Transaction Log (`_delta_log`) |
| **BI Semantic Datasets** | Power BI `TMDL` / Tableau XML | Git-integrated Workspace commit | Power BI Developer Git Sync |
| **Cloud Infrastructure** | Terraform (`.tf`, `.tfvars`) | Semantic Versioned Modules | Terraform Cloud / Azure DevOps |

---

### 2. Configuration Control (Preventing Drift & Unauthorized Edits)
Configuration control ensures that no pipeline code, schema, or report reaches production without peer review and automated testing:

- **Branch Protection Policies**: Direct commits to `main` are strictly prohibited. Merges require at least one senior peer review and a green CI/CD build.
- **Automated Slim CI Testing**: Every pull request triggers an isolated testing pipeline (`dbt build --select state:modified+`) in an ephemeral sandbox schema, preventing broken SQL or invalid models from contaminating production.
- **Production Immutability**: Production database credentials are restricted to automated CI/CD service principals. Human engineers do not have manual `WRITE` or `DDL` access in production.

---

### 3. Configuration Status Accounting (Traceability & Lineage)
Status accounting tracks the exact state, version, and location of all data assets at any given point in time:

- **Automated Documentation**: Running `dbt docs generate` on every deployment publishes a live data catalog documenting model descriptions, column types, and test assertions.
- **End-to-End Lineage Graphs**: Unity Catalog or Microsoft Purview maintains automated, visual column-level lineage linking every dashboard visual back to the exact Git commit SHA and table version that generated it.

---

### 4. Configuration Verification & Audit
Regular verification ensures that running production systems match approved baselines:

- **Schema Drift Audits**: Daily automated scanners verify that upstream source tables have not added or altered columns without corresponding updates to the [[Product Documents#1. The Producer-Consumer Data Contract|Data Contract]].
- **Storage Snapshot Auditing**: Delta Lake `DESCRIBE HISTORY` logs are reviewed monthly to verify transaction retention policies and audit all table modifications.
- **Time-Travel Rollback Testing**: Regular disaster recovery drills verify that corrupted tables can be restored to prior snapshots using historical timestamps:
  ```sql
  -- Verification drill: restore customer dimension to previous approved commit
  RESTORE TABLE silver.dim_customers TO VERSION AS OF 104;
  ```

---

## Flashcard Q&A

- **Q:** Why is Git alone insufficient for complete configuration management in data projects?
    - **A:** Git only versions the code (SQL, Python, YAML). It cannot version the physical state of the data. Full data configuration requires open table formats (Delta Lake, Apache Iceberg) to version table data snapshots and transaction logs alongside code.

- **Q:** What is "dbt Slim CI" in modern configuration control?
    - **A:** A CI/CD testing technique that only builds and tests models that were modified (or downstream of modifications) in a pull request, rather than rebuilding the entire multi-terabyte data warehouse, saving compute credits and accelerating build times.

- **Q:** What is a "Configuration Item" (CI) in a Business Intelligence context?
    - **A:** Any version-controlled asset, including dbt SQL models, Data Contracts (`contract.yaml`), Airflow DAGs, Power BI TMDL semantic models, and Terraform infrastructure scripts.

---
## Navigation & Related Notes
- **Up**: [[00 - Overview|Configuration Management Overview]]
- **Previous**: [[Business case management]]
- **Next**: [[Control Management Plan]]

### Related Concepts & Artefacts
- [[00 - Praxis Framework Overview|Praxis Framework Master MOC]]
- [[General Principles of Configuration Management]]
- [[Control Scope Change]]
- [[Control Management Plan]]
- [[Capability Maturity]]

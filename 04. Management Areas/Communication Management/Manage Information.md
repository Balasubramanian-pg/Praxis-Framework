---
title: "Manage Information Competency"
aliases:
  - "Information Management Competency"
  - "Data Governance Competency"
tags:
  - praxis-framework
  - pillar/competence
  - section/communication-management
  - type/competency
  - praxis/data-bi
  - topic/data-governance
  - discipline/dataops
pillar: "Competence"
section: "Communication Management"
subarea: "Management Competencies"
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

# Manage Information Competency: Enterprise Data Governance & Catalogs

> [!SUMMARY] Overview
> Demonstrates the capability to establish enterprise data catalog governance, manage the three metadata planes (technical, business, operational), enforce tag-based data privacy (PII masking), and maintain column-level data lineage across lakehouse platforms.

## Purpose
The **Manage Information** competency certifies that a project manager, lead data architect, or data governance steward can systematically organize, catalog, protect, and govern data assets across the project life cycle.

In enterprise Data Engineering, Analytics Engineering, and Business Intelligence (BI), information management transcends traditional document control. It requires **active stewardship over modern metadata engines (Unity Catalog, Microsoft Purview, Alation), automated column lineage, and tag-based access control (TBAC)**.

```
                    The Enterprise Information Governance Plane
                    
┌─────────────────────────────────────────────────────────────────────────────────┐
│              Central Data Catalog (Unity Catalog / Microsoft Purview)            │
├─────────────────────────┬─────────────────────────────┬─────────────────────────┤
│   Technical Metadata    │      Business Metadata      │   Operational Metadata  │
│ - Schemas & Column DDL  │ - Business Glossary (KPIs)  │ - Ingestion Run Timings │
│ - Partition Schemes     │ - Certified Model Status    │ - Freshness SLA Checks  │
│ - Snappy Parquet Specs  │ - Domain Data Ownership     │ - dbt Test Audit Logs   │
└────────────┬────────────┴──────────────┬──────────────┴────────────┬────────────┘
             │                           │                           │
             ▼                           ▼                           ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                      Automated Security & Access Governance                     │
│ - Tag-Based Dynamic Masking (PII)    - Column-Level Lineage Verification        │
│ - Row-Level Security (RLS) Policies  - Cold Storage Lifecycle Tiering (Archive) │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

## Performance Criteria

An individual certified in this competency demonstrates the following capabilities:

1. **Deploy & Curate Centralized Data Catalogs**:
   - Establish metadata hierarchies (Metastore $\to$ Catalog $\to$ Schema $\to$ Table $\to$ Column) in enterprise catalogs such as Databricks Unity Catalog or Microsoft Purview.
   - Enforce mandatory data dictionary descriptions, primary/foreign key definitions, and business ownership tags on all production Silver and Gold models.

2. **Govern Business Glossaries & Certified Metric Layers**:
   - Maintain the enterprise business glossary, reconciling conflicting metric definitions (e.g., standardizing "Active Customer" and "Churn" across Sales, Finance, and Product).
   - Tag vetted semantic models with **"Certified Gold Asset"** badges to steer business analysts toward authoritative data products and away from unverified staging tables.

3. **Enforce Automated Privacy & Dynamic Data Masking**:
   - Implement Tag-Based Access Control (TBAC): tag sensitive columns as `Confidential` or `PII`.
   - Apply dynamic runtime masking policies (e.g., SHA-256 hashing for customer emails, partial redaction for credit cards) ensuring junior analysts and third-party vendors query sanitized datasets without code changes.

4. **Verify End-to-End Lineage & Execute Lifecycle Archiving**:
   - Audit automated column-level lineage from raw Bronze ingestion through dbt transformations to executive Power BI visual cards for regulatory compliance.
   - Configure data retention and storage tiering: automate table compacting (`OPTIMIZE`), purge stale historical snapshot logs (`VACUUM`), and archive multi-year historical partitions to cold object storage (AWS Glacier, Azure Archive).

---

## Knowledge & Competence Criteria

To achieve proficiency, the practitioner must master:

- **The Three Metadata Planes**: The operational differences between technical metadata (structural schema), business metadata (contextual meaning and governance), and operational metadata (execution health and observability).
- **Regulatory Privacy Mandates**: Translating legal requirements (GDPR Right to Be Forgotten, CCPA, HIPAA) into automated physical deletion and pseudonymization pipelines.
- **Data Product Discoverability**: Designing self-service catalog search experiences that prevent redundant pipeline development across decentralized domain squads.

---

## Flashcard Q&A

- **Q:** How does managing information in a modern data platform differ from traditional document control?
    - **A:** Traditional document control focuses on file versioning and folder structures. Modern data information management actively governs the three metadata planes (technical, business, operational), enforces automated dynamic PII masking, and maintains column-level data lineage across lakehouse tables.

- **Q:** What is "Tag-Based Access Control" (TBAC) in data governance?
    - **A:** A security policy framework where data access and dynamic masking rules are applied based on metadata tags assigned to columns (e.g., `classification: pii`), rather than hardcoding permissions on individual tables.

- **Q:** Why is column-level lineage vital for enterprise information management?
    - **A:** It provides an auditable provenance trail, enabling engineers to perform impact analysis before modifying upstream models and empowering business leaders to verify the exact origin of executive dashboard metrics.

---
## Navigation & Related Notes
- **Up**: [[00 - Overview|Communication Management Overview]]
- **Previous**: [[Information Management Plan]]
- **Next**: [[General Principles of Information Management]]

### Related Concepts & Artefacts
- [[00 - Praxis Framework Overview|Praxis Framework Master MOC]]
- [[General Principles of Information Management]]
- [[Control Management Plan]]
- [[Product Documents]]
- [[Capability Maturity]]

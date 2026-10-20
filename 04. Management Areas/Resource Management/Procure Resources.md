---
title: "Procure Resources Competency"
aliases:
  - "Resource Procurement"
  - "Data Stack Procurement"
tags:
  - praxis-framework
  - pillar/competence
  - section/resource-management
  - type/competency
  - praxis/data-bi
  - topic/procurement
  - discipline/procurement
pillar: "Competence"
section: "Resource Management"
subarea: "Management Competencies"
type: "competency"
status: "published"
source: "Praxis Framework"
source_url: "https://www.praxisframework.org"
created: 2026-10-17
updated: 2026-10-20
---

> [!NAV] Navigation
> **Vault**: [[00 - Praxis Framework Overview|Praxis Overview]] > **Section**: [[00 - Overview|Resource Management]]
> **Pillar**: Competence | **Type**: `competency`

# Procure Resources Competency: Modern Data Stack Evaluation & Vendor TCO

> [!SUMMARY] Overview
> Demonstrates the capability to execute rigorous "Make vs. Buy" trade-off analyses, conduct empirical technical Proof-of-Concepts (PoCs) on real datasets, vet security and data privacy compliance (SOC 2, GDPR DPAs), and procure external data engineering talent.

## Purpose
The **Procure Resources** competency certifies that a project manager, lead data architect, or technology procurement specialist can systematically specify requirements, evaluate vendors, and acquire software licenses, cloud compute capacity, and external engineering services.

In enterprise Data & Business Intelligence initiatives, poor procurement decisions lock organizations into multi-million-dollar multi-year commitments with incompatible proprietary formats, excessive egress fees, or high ongoing engineering maintenance debt.

```
                    The Modern Data Stack "Make vs. Buy" Funnel
                    
┌─────────────────────────────────────────────────────────────────────────────────┐
│              1. Total Cost of Ownership (TCO) & Strategic Analysis              │
│  Custom Engineering Labor (Make)  VS  Managed SaaS Subscription Fees (Buy)       │
└────────────────────────────────────────┬────────────────────────────────────────┘
                                         │
                                         ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│              2. Empirical Technical Proof-of-Concept (PoC) Benchmark            │
│  - 100 GB Sample Real Data Ingested   - Cold-Cache Query Latency Benchmarked    │
│  - Developer Experience (Git/CI/CD)   - Cloud Credit Consumption Measured       │
└────────────────────────────────────────┬────────────────────────────────────────┘
                                         │
                                         ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│              3. Security, Privacy & Compliance Due Diligence Gate               │
│  - SOC 2 Type II Certification        - GDPR Data Processing Agreement (DPA)    │
│  - Customer-Managed Keys (CMK) Support - HIPAA / PCI-DSS Security Compliance    │
└────────────────────────────────────────┬────────────────────────────────────────┘
                                         │
                                         ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│              4. Commercial Negotiation & Contract Award                         │
│  - Tiered Consumption Pricing         - Data Portability / Zero Egress Penalty  │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

## The "Make vs. Buy" Decision Matrix in Modern Data Platforms

A practitioner certified in this competency evaluates procurement across the core modern data stack components:

| Architectural Component | "Make" Alternative (Custom Build) | "Buy" Alternative (Managed SaaS) | Recommended Praxis Procurement Decision |
| :--- | :--- | :--- | :--- |
| **Ingestion Connectors** | Custom Python API scrapers on cron. | Fivetran, Airbyte, Stitch. | **BUY Managed SaaS**: Maintaining 40+ SaaS API changes (Salesforce, Stripe, HubSpot) incurs excessive ongoing maintenance labor. |
| **Data Transformation** | Custom Spark/Scala pipelines on cluster. | dbt Core / dbt Cloud with SQL. | **BUY/HYBRID (dbt)**: Standardizes on SQL; unlocks rapid hiring of Analytics Engineers; eliminates Spark cluster overhead for SQL workloads. |
| **Storage & File Format** | Proprietary database storage format. | Open table formats (Delta Lake, Iceberg). | **MAKE/OPEN**: Guarantees zero storage lock-in; ensures data remains in open Parquet files accessible by any compute engine. |
| **Data Observability** | Custom SQL freshness & null test queries. | Monte Carlo, Databand, Soda. | **HYBRID**: Start with open-source dbt tests; procure enterprise observability once table count exceeds 500+ across multiple domains. |

---

## Performance Criteria

An individual certified in this competency demonstrates the following practical capabilities:

1. **Execute Empirical Technical Proof-of-Concepts (PoCs)**:
   - Reject vendor marketing demos conducted on pre-cleansed, synthetic datasets.
   - Run a 2-week competitive PoC ingesting a 100 GB representative sample of messy enterprise production data, measuring ingest throughput, query latency, and compute cost.

2. **Conduct Security & Privacy Compliance Reviews**:
   - Verify that SaaS vendors provide SOC 2 Type II audit reports, ISO 27001 certifications, and signed Data Processing Agreements (DPAs) for GDPR/CCPA compliance.
   - Mandate support for **Customer-Managed Encryption Keys (CMEK)** and Virtual Private Cloud (VPC) peering for sensitive financial and healthcare datasets.

3. **Formulate Statements of Work (SOW) for System Integrators**:
   - Draft performance-based SOWs for external data engineering consultancies that bind milestone payments directly to the [[Product Documents|Definition of Done (DoD)]], passing dbt tests, and zero orphan foreign keys.

4. **Negotiate Favorable Commercial & Exit Terms**:
   - Negotiate tiered consumption pricing that lowers marginal unit costs as data volume scales.
   - Insist on explicit data portability clauses guaranteeing zero penalty data extraction upon contract termination.

---

## Knowledge & Competence Criteria

To achieve proficiency, the practitioner must master:

- **Egress & API Hidden Costs**: Identifying hidden cloud provider fees (e.g., cross-region data transfer charges, API call volume fees) during TCO modeling.
- **Consumption Sizing**: Accurately estimating annual cloud credits based on projected data growth, query concurrency, and batch refresh cadences.
- **Consulting Vendor Due Diligence**: Evaluating external consulting bids based on verifiable modern data stack references (dbt certification, lakehouse implementations) rather than general IT staffing promises.

---

## Flashcard Q&A

- **Q:** Why should data platform procurement decisions always include an empirical Proof-of-Concept (PoC)?
    - **A:** Vendor slide decks rely on synthetic, idealized datasets. Testing the platform against messy enterprise production data reveals real-world query latency, compute credit consumption, connector bugs, and developer ergonomics before signing long-term contracts.

- **Q:** When does "building custom API connectors" become an anti-pattern compared to "buying managed ELT"?
    - **A:** When teams must maintain dozens of third-party SaaS APIs (Salesforce, Stripe, Google Ads). Upstream vendors frequently alter schemas and API versions; buying managed ELT transfers this continuous maintenance burden to the vendor, freeing engineers to focus on business modeling.

- **Q:** What is a "Data Portability" clause and why is it essential in cloud vendor contracts?
    - **A:** A contractual guarantee that the client owns their data and metadata in open formats (e.g., Parquet, Delta Lake) and can export or migrate it to another cloud provider at any time without proprietary lock-in or punitive exit fees.

---
## Navigation & Related Notes
- **Up**: [[00 - Overview|Resource Management Overview]]
- **Previous**: [[Mobilise Resources]]
- **Next**: [[Manage Contracts]]

### Related Concepts & Artefacts
- [[00 - Praxis Framework Overview|Praxis Framework Master MOC]]
- [[General Principles of Resource Management]]
- [[General Principles of Financial Management]]
- [[Manage Contracts]]
- [[Capability Maturity]]

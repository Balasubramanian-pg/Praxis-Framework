---
Title: Configuration management 29183b71d8f38094b33bdbe63dab85b9
Area: Projects
Type: Project
Status: Draft
Source: 05. Projects/Project Management/Configuration management 29183b71d8f38094b33bdbe63dab85b9.md
Created: ''
Updated: ''
Tags: ''
Topic: ''
---
 

![](white%2039.svg)

# Configuration management

|   |   |
|---|---|
|![](arrow-circle-down_gray%2039.svg)Area|Knowledge|
|![](arrow-circle-down_gray%2039.svg)Pillar|Manage|
|![](arrow-circle-down_gray%2039.svg)Section|Scope management|
|![](arrow-circle-down_gray%2039.svg)Sub Area|Management|

# Comprehensive Study Notes: Configuration Management

## General Principles of Configuration Management

- **Definition**: Configuration management encompasses the administrative activities concerned with the creation, maintenance, controlled change, and quality control of products.

- **Configuration**: A configuration is the complete set of functional and physical characteristics of a final deliverable, as defined in its specification.

- At its simplest, configuration management is the same as **version control**.

### The Goals of Configuration Management

- The primary goals of this function are to:
    
    1. Identify the products that will be treated as **configuration items**.
    
    2. Support the assessment of change requests and document the results of the **change control** process.
    
    3. Maintain the validity of the configuration and the accuracy of the **configuration management system**.

### The Role of Configuration Management

- Configuration management provides control over the development of products. It helps to avoid mistakes and misunderstandings about what a product is required to do and whether it actually does it.

- It provides the formal **verification** of products (checking them against their specification) as required by the solutions development function.

- It also ensures that adequate procedures are in place to provide continuing maintenance of products for the duration of the full product life cycle.

---

## The Configuration Management Procedure

1. **Plan**:
    
    - A **configuration management plan** (which may be a separate document or a section of the scope management plan) should describe the specific techniques to be used and the extent of their application.
    
    - The plan should also identify the roles and responsibilities for carrying out configuration management.

2. **Initiate**:
    - This step ensures that the required resources, including people, tools, and systems (e.g., a configuration management database), are in place.

3. **Identify Configuration Items**:
    
    - This involves breaking down the work into its component products, which will be treated as **configuration items**.
    
    - A unique numbering or referencing system is created for these items.
    
    - Configuration **baselines** are established. This step aligns closely with the preparation of a **Product Breakdown Structure (PBS)** in scope management.

4. **Control Configuration**:
    
    - This step ensures that all changes to baselined configuration items are formally requested, assessed, approved, and documented.
    
    - An important aspect is the ability to identify the **inter-relationships** between different configuration items. This is essential information for the change control procedure, as the practicality of making a change to one product will be affected by its impact on interconnected products.

5. **Account for Status**:
    
    - Status accounting tracks the current status of every configuration item throughout its development (e.g., 'in development', 'in review', 'approved', 'changed').
    
    - This provides full **traceability** for all items.
    
    - Regular status reports can indicate if change requests are being processed in a timely manner and may highlight products that are subject to frequent change requests.

6. **Verify and Audit**:
    
    - This step is used to determine whether a product conforms to its requirements and its configuration information. An audit is typically undertaken at the end of a phase, stage, or tranche.
    
    - Configuration audits take one of three forms:
        
        - **Physical Audit**: Looks at the relevant elements of a configuration item to confirm that it meets its physical specification and that all necessary test documentation is complete.
        
        - **Functional Audit**: Checks that a configuration item performs the function for which it was designed.
        
        - **System Audit**: Checks that the configuration management _system_ itself is working, able to support the planned procedure, and performing the necessary functions. This is part of the assurance of the function.

> [NOTE]  
> A form of configuration management (primarily version control) can also be applied to the key management documentation to ensure everyone is working from the correct versions of plans and reports.

---

## Configuration Management in Projects, Programmes, and Portfolios

### Projects

- The need for formal configuration management beyond simple version control will depend on the scale and complexity of the objectives and the degree to which changes to the specification are allowed.

- **Traditional Projects**: In a project with a fixed-price contract, no change may be allowed. Configuration management is used to ensure the final product matches the baselined specification exactly.

- **Agile Projects**: In an agile project, changes are an inherent part of the method. Configuration management is used to track the different versions of a product as it evolves through development sprints.

- **Complex/High-Risk Projects**: In projects that are safety-critical or operate in secure environments, configuration management plays a vital role in ensuring that there are no gaps in the chain of quality control, testing, and record-keeping for all products and their components.

### Programmes

- A programme management team needs to ensure that all the outputs from its various component projects fit together and function properly in the context of the overall **blueprint**.

- Each project and area of change activity within the programme must adopt a **consistent approach** to managing configurations.

- This makes it much simpler to assess whether a change to the products of one project will have any knock-on effect on the products of another project, or on the programme’s eventual benefits.

### Portfolios

- A portfolio is unlikely to produce any of its own configuration items, other than its key management documents.

- However, where different project and programme deliverables from across the portfolio must come together to meet a single strategic objective, the portfolio management team must track the configuration of these different deliverables to ensure that their final integration achieves the required result.

---

## Flashcard Q&A

- **Q:** What is a "configuration"?
    - **A:** The complete set of functional and physical characteristics of a final deliverable, as defined in its specification.

- **Q:** At its simplest, what is configuration management the same as?
    - **A:** Version control.

- **Q:** What are the three types of configuration audits?
    - **A:** Physical audit, Functional audit, and System audit.

- **Q:** What is the purpose of "status accounting"?
    - **A:** To track the current status of every configuration item (e.g., 'in development', 'approved') throughout its life cycle, providing full traceability.

- **Q:** Why is a consistent approach to configuration management important in a programme?
    - **A:** It makes it much simpler to assess whether a change to the products of one project will have any effect on the products of another project or on the overall programme benefits.
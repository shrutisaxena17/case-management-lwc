This project implements a Salesforce Lightning Web Component (LWC) that displays Case details, including Product and Feature selections.

Features:

Case Record Types: Onboarding, Product, and Services.

Custom Fields:

Product__c (Picklist: Product A - Product F)

Feature__c (Picklist: Case Sensitive, Customer Queries, Product Support)

Some Field Dependencies:

Onboarding → Only shows Product A.

Product F → Only allows Case Sensitive in Features.

LWC Component: Displays case details, including selected Product and Feature.

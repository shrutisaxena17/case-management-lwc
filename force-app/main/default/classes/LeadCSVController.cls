public with sharing class LeadCSVController {
    @AuraEnabled
    public static String saveTempLeads(List<Map<String, String>> leadData) {
        List<CustomTemp_Lead__c> tempLeads = new List<CustomTemp_Lead__c>();
        String batchJobId = String.valueOf(DateTime.now().getTime());

        for (Map<String, String> row : leadData) {
            tempLeads.add(new CustomTemp_Lead__c(
                FirstName__c = row.get('FirstName'),
                LastName__c = row.get('LastName'),
                Company__c = row.get('Company'),
                Email__c = row.get('Email'),
                Phone__c = row.get('Phone'),
                LeadSource__c = row.get('LeadSource'),
                BatchJobId__c = batchJobId
            ));
        }

        insert tempLeads;
        return batchJobId;
    }

    @AuraEnabled
    public static String startLeadBatch(String batchJobId) {
        LeadBatchJob batch = new LeadBatchJob(batchJobId);
        return Database.executeBatch(batch, 10);  
    }

    @AuraEnabled
    public static AsyncApexJob getJobStatus(String jobId) {
        return [SELECT Id, Status, JobItemsProcessed, TotalJobItems, NumberOfErrors FROM AsyncApexJob WHERE Id = :jobId LIMIT 1];
    }
}

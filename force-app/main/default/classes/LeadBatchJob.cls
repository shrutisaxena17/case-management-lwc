public class LeadBatchJob implements Database.Batchable<SObject> {
    private String batchJobId;

    public LeadBatchJob(String batchJobId) {
        this.batchJobId = batchJobId;
    }

    public Database.QueryLocator start(Database.BatchableContext bc) {
        return Database.getQueryLocator([
            SELECT Id, FirstName__c, LastName__c, Company__c, Email__c, Phone__c, LeadSource__c
            FROM CustomTemp_Lead__c
            WHERE BatchJobId__c = :batchJobId
        ]);
    }

    public void execute(Database.BatchableContext bc, List<SObject> scope) {
        List<Lead> leadsToInsert = new List<Lead>();
        for (CustomTemp_Lead__c tempLead : (List<CustomTemp_Lead__c>)scope) {
            String leadStatus = 'Open - Not Contacted'; 

            leadsToInsert.add(new Lead(
                FirstName = tempLead.FirstName__c,
                LastName = tempLead.LastName__c,
                Company = tempLead.Company__c,
                Email = tempLead.Email__c,
                Phone = tempLead.Phone__c,
                LeadSource = tempLead.LeadSource__c,
                Status = leadStatus  
            ));
        }
        insert leadsToInsert;
    }

    public void finish(Database.BatchableContext bc) {
        List<CustomTemp_Lead__c> tempLeads = [SELECT Id FROM CustomTemp_Lead__c WHERE BatchJobId__c = :batchJobId];
        delete tempLeads;
    }
}

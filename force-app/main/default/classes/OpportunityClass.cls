public with sharing class OpportunityClass{
    
    @AuraEnabled(cacheable=true)
    public static List<Opportunity> getOpportunities() {
        return [SELECT Id, Name, StageName, CloseDate, Amount FROM Opportunity LIMIT 10];
    }

    @AuraEnabled
    public static void updateOpportunityStages(List<Id> oppIds, String newStage) {
        List<Opportunity> oppsToUpdate = [SELECT Id, StageName FROM Opportunity WHERE Id IN :oppIds];
        for (Opportunity opp : oppsToUpdate) {
            opp.StageName = newStage;
        }
        update oppsToUpdate;
    }
}

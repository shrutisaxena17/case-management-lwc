public with sharing class FetchCaseDetails {
    @AuraEnabled
    public static Case getCaseDetails(Id caseId) {
        return [
            SELECT Origin, Status, ProductDemo__c, Feature__c
            FROM Case
            WHERE Id = :caseId
        ];
    }
}

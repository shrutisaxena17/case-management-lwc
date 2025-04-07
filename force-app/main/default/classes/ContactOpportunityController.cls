public with sharing class ContactOpportunityController {

    @AuraEnabled(cacheable=true)
    public static List<Opportunity> getOpportunitiesForContact(Id contactId) {
        return [
            SELECT Id, Name, StageName, CloseDate 
            FROM Opportunity
            ORDER BY CloseDate DESC
            LIMIT 5
        ];
    }

    @AuraEnabled
    public static String associateOpportunitiesToContact(Id contactId, List<Id> opportunityIds) {
        try {
            List<OpportunityContactRole> roles = new List<OpportunityContactRole>();
            for (Id oppId : opportunityIds) {
                roles.add(new OpportunityContactRole(ContactId = contactId, OpportunityId = oppId));
            }
            insert roles;
            return 'Opportunities successfully linked to Contact!';
        } catch (Exception e) {
            return 'Error: ' + e.getMessage();
        }
    }
}

public with sharing class OpportunityController {

    @AuraEnabled(cacheable=true)
    public static Opportunity getOpportunityById(Id oppId) {
        try {
            return [SELECT Id, StageName FROM Opportunity WHERE Id = :oppId LIMIT 1];
        } catch (Exception e) {
            throw new AuraHandledException('Invalid Opportunity ID.');
        }
    }

    @AuraEnabled
    public static String assignDemoProduct(Id oppId) {
        try {
            Opportunity opp = [SELECT Id, StageName, Pricebook2Id FROM Opportunity WHERE Id = :oppId];

            if (opp.Pricebook2Id == null) return 'Opportunity does not have a Price Book assigned.';

            PricebookEntry pricebookEntry;
            try {
                pricebookEntry = [SELECT Id, UnitPrice FROM PricebookEntry 
                                  WHERE Product2.Name = 'Demo Product' 
                                  AND Pricebook2Id = :opp.Pricebook2Id LIMIT 1];
            } catch (Exception e) {
                return 'Demo Product is not available in this Price Book.';
            }

            insert new OpportunityLineItem(
                OpportunityId = opp.Id,
                PricebookEntryId = pricebookEntry.Id,  
                Quantity = 1,
                TotalPrice = pricebookEntry.UnitPrice
            );

            return 'Demo Product assigned successfully!';
        } catch (Exception e) {
            System.debug('Error: ' + e.getMessage());
            return 'An unexpected error occurred.';
        }
    }
}

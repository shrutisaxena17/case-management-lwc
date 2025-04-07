import { LightningElement, api, wire } from 'lwc';
import getOpportunitiesForContact from '@salesforce/apex/ContactOpportunityController.getOpportunitiesForContact';
import associateOpportunitiesToContact from '@salesforce/apex/ContactOpportunityController.associateOpportunitiesToContact';

export default class ContactOpportunityViewer extends LightningElement {
    @api recordId; 
    opportunities = [];
    selectedOpportunities = new Set();
    message = '';

    @wire(getOpportunitiesForContact, { contactId: '$recordId' })
    wiredOpportunities({ data }) {
        if (data) this.opportunities = data;
    }

    handleSelection(event) {
        const oppId = event.target.dataset.id;
        event.target.checked ? this.selectedOpportunities.add(oppId) : this.selectedOpportunities.delete(oppId);
    }

    associateOpportunities() {
        if (!this.selectedOpportunities.size) {
            this.message = 'Please select at least one opportunity.';
            return;
        }

        associateOpportunitiesToContact({ contactId: this.recordId, opportunityIds: Array.from(this.selectedOpportunities) })
            .then(result => this.message = result)
            .catch(() => this.message = 'Failed to associate opportunities.');
    }
}

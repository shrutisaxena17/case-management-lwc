import { LightningElement, wire, track } from 'lwc';
import getOpportunities from '@salesforce/apex/OpportunityClass.getOpportunities';
import updateOpportunityStages from '@salesforce/apex/OpportunityClass.updateOpportunityStages';

export default class MassUpdateOpportunityStage extends LightningElement {
    opportunities = [];
    selectedOpportunityIds = [];
    selectedStage = '';
    message = '';

    columns = [
        { label: 'Opportunity ID', fieldName: 'Id'},
        { label: 'Name', fieldName: 'Name' },
        { label: 'Stage', fieldName: 'StageName' },
        { label: 'Close Date', fieldName: 'CloseDate', type: 'date' }
    ];

    stageOptions = [
        { label: 'Prospecting', value: 'Prospecting' },
        { label: 'Qualification', value: 'Qualification' },
        { label: 'Proposal/Price Quote', value: 'Proposal/Price Quote' },
        { label: 'Closed Won', value: 'Closed Won' },
        { label: 'Closed Lost', value: 'Closed Lost' }
    ];

    @wire(getOpportunities)
    fetchOpportunities({ data, error }) {
        if (data) {
            this.opportunities = data;
        } else {
            console.error(error);
        }
    }

    handleRowSelection(event){
        const selectedRows = event.detail.selectedRows;
        this.selectedOpportunities = selectedRows;
        this.selectedOpportunityIds = selectedRows.map(row => row.Id);
    }
    

    handleStageChange(event) {
        this.selectedStage = event.detail.value;
    }

    updateStages() {
        updateOpportunityStages({ oppIds: this.selectedOpportunityIds, newStage: this.selectedStage })
            .then(() => {
                this.message = 'Stages updated successfully.';
                return getOpportunities();
            })
            .then(result => {
                this.opportunities = result;
                this.selectedOpportunityIds = [];
            })
            .catch(error => {
                console.error(error);
                this.message = 'Error updating stages: ' + error.body.message;
            });
    }
}

import { LightningElement, api } from 'lwc';
import getCaseDetails from '@salesforce/apex/FetchCaseDetails.getCaseDetails';

export default class CaseDetails extends LightningElement {
    @api recordId;
    caseData;
    error;

    connectedCallback() {
        this.fetchCaseDetails(); 
    }

    fetchCaseDetails() { 
        getCaseDetails({ caseId: this.recordId }) 
            .then((result) => {
                console.log('Fetched Data:', result); 
                this.caseData = result;
                this.error = undefined;
            })
            .catch((error) => {
                console.error('Error:', error); 
                this.error = error;
                this.caseData = undefined;
            });
    }
}


//LDS

/*
import { LightningElement, api, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';

const FIELDS = ['Case.Origin', 'Case.Status', 'Case.ProductDemo__c', 'Case.Feature__c'];

export default class CaseDetails extends LightningElement {
    @api recordId;
    caseData;
    error;

    @wire(getRecord, { recordId: '$recordId', fields: FIELDS })
    wiredCase({ error, data }) {
        if (data) {
            this.caseData = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.caseData = undefined;
        }
    }
}
    */
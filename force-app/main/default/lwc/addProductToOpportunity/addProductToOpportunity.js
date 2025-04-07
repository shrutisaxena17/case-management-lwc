import { LightningElement } from 'lwc';
import getOpportunityById from '@salesforce/apex/OpportunityController.getOpportunityById';
import assignDemoProduct from '@salesforce/apex/OpportunityController.assignDemoProduct';

export default class OpportunityChecker extends LightningElement {
    opportunityId = '';
    stageName = '';
    message = '';

    handleInputChange(event) {
        this.opportunityId = event.target.value;
    }

    checkOpportunity() {
        this.message = ''; 

        if (!this.opportunityId) {
            this.message = 'Please enter an Opportunity ID.';
            return;
        }

        getOpportunityById({ oppId: this.opportunityId })
            .then(result => {
                if (result) {
                    this.stageName = result.StageName;
                    if (this.stageName === 'Closed Won') {
                        this.assignProduct();
                    } else {
                        this.message = 'Opportunity is not Closed Won.';
                    }
                }
            })
            .catch(() => {
                this.message = 'Invalid Opportunity ID.';
            });
    }

    assignProduct() {
        assignDemoProduct({ oppId: this.opportunityId })
            .then(result => {
                this.message = result;
            })
            .catch(() => {
                this.message = 'Failed to assign Demo Product.';
            });
    }
}

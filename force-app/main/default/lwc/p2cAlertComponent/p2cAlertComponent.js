import { LightningElement , api} from 'lwc';

export default class P2cAlertComponent extends LightningElement {
    @api message
    @api cardheading
    @api number
    @api isValid

}
import { LightningElement } from 'lwc';

export default class Form extends LightningElement {
    emailList = ["shruti@gmail.com", "akash@gmail.com", "abhinaw@gmail.com"];
    userDetails = { firstname: '', lastname: '', email: '' };  
    isSubmitDisabled = false;
    isFormSubmitted = false;  

    handleInputChange(event) {
        this.userDetails[event.target.name] = event.target.value;
    }

    handleEmailChange(event) {
        this.userDetails.email = event.target.value;
        this.isSubmitDisabled = this.emailList.includes(this.userDetails.email);
    }

    handleClick() {
        this.isFormSubmitted = !this.isSubmitDisabled;
    }
}

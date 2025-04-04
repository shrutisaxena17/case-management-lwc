import { LightningElement, track } from 'lwc';

export default class HelloWorld extends LightningElement {
    fullname ="Zero To Hero";
    title ="Aura";

    changeHandler(event){
        this.title = event.target.value;
    }

    address={
        city: 'Melbourne',
        postcode: 3808,
        country: 'Australia'
    }

    trackHandler(event){
        this.address ={...this.address, "city":event.target.value};
    }

    users = ["john", "jane", "jim", "bob", "joe", "jenny", "jeremy", "jean", "j"];
    get firstUser(){
        return this.users[0];
    }

    num1=10
    num2=20
    get result(){
        return this.num1+this.num2;
    }

}
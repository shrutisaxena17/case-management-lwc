import { LightningElement } from 'lwc';

export default class HelloQuerySelector extends LightningElement {
    usernames = ["Shruti","Prachi","Ritika","Harshita"];
    fetchDetailHandler(){
       const elem = this.template.querySelector('h1')
       const userElements = this.template.querySelectorAll('.name')
       console.log(elem.innerText)
       Array.from(userElements).forEach(item =>{
           console.log(item.innerText)
       })

       const childElem = this.template.querySelector('.child')
       childElem.innerHTML='<p>Hey I am a child!</p>'
    }
}
import { LightningElement } from 'lwc';

export default class Looping extends LightningElement {
    carList = ["Ford", "Nissan", "Toyota", "Honda", "Lexus", "Dodge", "Chrysler", "BMW"]

    ceoList =[
        {
            id:1,
            company:"Apple",
            ceo:"Steve Jobs"
        },
        {
            id:2,
            company:"Microsoft",
            ceo:"Bill Gates"
        },
        {
            id:3,
            company:"Amazon",
            ceo:"Jeff Bezos"
        } ,
        {
            id:4,
            company:"Facebook",
            ceo:"Mark Zuckerberg"
        },
        {
            id:5,
            company:"Google",
            ceo:"Sundar Pichai"
        }
    ]
}
import { LightningElement, track } from 'lwc';

export default class ToDoList extends LightningElement {
   tasks = []; 
    newTask = ''; 
    handleChange(event) {
        this.newTask = event.target.value;
    }

    addTaskHandler() {
        if (this.newTask.trim() === '') {
            alert('Task cannot be empty!');
            return;
        }
        this.tasks = [
            ...this.tasks, 
            { id: Date.now(), name: this.newTask.trim(), completed: false }
        ];
        this.newTask = '';
    }

    toggleCompleteHandler(event) {
        const taskId = event.target.dataset.id;
        this.tasks = this.tasks.map(task =>
            task.id == taskId 
                ? { 
                    ...task, 
                    completed: event.target.checked,
                    taskClass: event.target.checked ? "slds-text-color_success slds-line-through" : ""
                  } 
                : task
        );
    }
    

    deleteTaskHandler(event) {
        const taskId = event.target.dataset.id;
        this.tasks = this.tasks.filter(task => task.id != taskId);
    }
}
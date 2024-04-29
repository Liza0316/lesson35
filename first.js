class ToDoList {
    constructor(container) {
        this.container = document.querySelector(container);
        this.form = document.getElementById("todo-form");
        this.mainInput = document.getElementById("todo-input");
        this.toDoCollection = document.getElementById("todo-list");
        this.list = JSON.parse(localStorage.getItem("tasks")) || [];
    }

    addTask(event) {
        event.preventDefault();
        const value = this.mainInput.value;
        this.list.push(value);
        this.updateSaveItem();
        this.render();
        this.mainInput.value = '';
    }
    
    removeTask(event) {
        if (event.target.classList.contains("remove")) {
            const listItem = event.target.parentElement;
            const contentElement = listItem.querySelector("span");
            const itemValue = contentElement ? contentElement.textContent : '';
            this.list = this.list.filter(item => item !== itemValue.trim());
            this.updateSaveItem();
            listItem.remove();
        }
    }

    updateSaveItem() {
        localStorage.setItem("tasks", JSON.stringify(this.list)); 
    }

    setHandlers() {
        this.form.addEventListener("submit", this.addTask.bind(this));
        this.toDoCollection.addEventListener("click", this.removeTask.bind(this));
    }

    render() {
        if (this.list.length) {
            this.toDoCollection.innerHTML = `
                ${this.list.map(value => `
                    <li>
                        <span>${value}</span>
                        <button class="remove">x</button>
                    </li>`).join("")}
            `;
        } else {
            this.toDoCollection.innerHTML = ''; // Якщо списку немає завдань, очищаємо його
        }
    }   
}

const toDoList = new ToDoList(".to-do-container");
toDoList.setHandlers();
toDoList.render();


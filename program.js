class TodoList {
    constructor() {
        this.tasks = this.getTasks();
        this.taskListElement = document.getElementById("taskList");
        this.addModal = document.getElementById("addModal");
        this.addTaskButton = document.getElementById("addTaskButton");
        this.saveTaskButton = document.getElementById("saveTaskButton");
        this.closeModalButton = document.getElementById("closeModalButton");
        this.taskNameInput = document.getElementById("taskName");
        this.taskYearInput = document.getElementById("taskYear");
        this.taskStatusInput = document.getElementById("taskStatus");

        this.init();
    }

    saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
    }

    getTasks() {
        return JSON.parse(localStorage.getItem("tasks")) || [];
    }

    renderTasks() {
        this.taskListElement.innerHTML = "";
        this.tasks.forEach(task => {
            let li = document.createElement("li");
            li.classList.add("task");

            li.innerHTML = `
                <span class="task-name">${task.name}</span>
                <span class="task-year">${task.year}</span>
                <span class="task-status">${task.status}</span>
                <button class="editButton">Edit</button>
                <button class="deleteButton">Delete</button>
                <button class="toggleButton">Check</button>
            `;

            li.querySelector(".editButton").onclick = () => this.editTask(task.id);
            li.querySelector(".deleteButton").onclick = () => this.deleteTask(task.id);
            li.querySelector(".toggleButton").onclick = () => this.toggleComplete(task.id);

            this.taskListElement.appendChild(li);
        });
    }

    showModal() {
        this.addModal.style.display = "flex";
    }

    closeModal() {
        this.addModal.style.display = "none";
        this.taskNameInput.value = "";
        this.taskYearInput.value = "";
        this.taskStatusInput.value = "active";
    }

    addTask() {
        const taskName = this.taskNameInput.value.trim();
        const taskYear = this.taskYearInput.value.trim();
        const taskStatus = this.taskStatusInput.value.trim();

        if (taskName === "" || taskYear === "") {
            alert("Please enter both task name and year!");
            return;
        }

        const newTask = {
            id: crypto.randomUUID(),
            name: taskName,
            year: taskYear,
            status: taskStatus,
        };

        this.tasks.push(newTask);
        this.saveTasks();
        this.renderTasks();
        this.closeModal();
    }

    editTask(id) {
        const task = this.tasks.find(task => task.id === id);
        if (task) {
            const newTaskName = prompt("Edit Task", task.name);
            const newTaskYear = prompt("Edit Year", task.year);
            const newTaskStatus = prompt("Edit Status (active/completed)", task.status);

            if (newTaskName) task.name = newTaskName;
            if (newTaskYear) task.year = newTaskYear;
            if (newTaskStatus) task.status = newTaskStatus;

            this.saveTasks();
            this.renderTasks();
        }
    }

    deleteTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.saveTasks();
        this.renderTasks();
    }

    toggleComplete(id) {
        const task = this.tasks.find(task => task.id === id);
        if (task) {
            task.status = task.status === "active" ? "Inactive" : "active";
            this.saveTasks();
            this.renderTasks();
        }
    }

    init() {
        this.renderTasks();

        this.addTaskButton.onclick = () => this.showModal();
        this.saveTaskButton.onclick = () => this.addTask();
        this.closeModalButton.onclick = () => this.closeModal();

        window.onclick = (e) => {
            if (e.target === this.addModal) {
                this.closeModal();
            }
        };
    }
}

new TodoList();

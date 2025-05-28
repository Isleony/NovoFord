const form = document.querySelector('#form'); 
const modal = bootstrap.Modal.getOrCreateInstance(form);
const textInput = document.querySelector('#textInput');
const dateInput = document.querySelector('#dateInput');
const textarea = document.querySelector('#textArea');
const msg = document.querySelector('#msg');
const tasks = document.querySelector('#tasks');
const add = document.querySelector('#add');

add.addEventListener("click", (e) => {
    modal.show();
    console.log("Botao clicado");
    formValidation();
});

const formValidation = () => {
    if (textInput.value === "") {
        console.log("Falha");
        msg.innerHTML = "Tarefa nao pode estar em branco"
    }
    else {
        console.log("sucesso");
        msg.innerHTML = "";
        acceptData();
        console.log(modal);
        modal.hide();
    }
}

let data = [];

const acceptData = () => {
    data.push({
        text: textInput.value,
        date: dateInput.value,
        description: textarea.value
    });
    localStorage.setItem("data", JSON.stringify(data));
    console.log(data);
    createTasks();
}

const createTasks = () => {
    tasks.innerHTML = "";
    data.map((x, y) => {
        return (tasks.innerHTML += `
            <div id=${y}>
                <span class="fw-bold">${x.text}</span>
                <span class="small text-secondary">${x.date}</span>
                <p>${x.description}</p>

                <span class="options">
                    <i onClick="editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
                    <i onClick="deleteTask(this); createTasks()" class="fas fa-trash-alt"></i>
                </span>
            </div>
            `)
    });
    resetForm();
};

const resetForm = () => {
    textInput.value = "";
    dateInput.value = "";
    textarea.value = "";
};

const deleteTask = (e) => {
    e.parentElement.parentElement.remove();
    data.splice(e.parentElement.parentElement.id, 1);
    localStorage.setItem("data", JSON.stringify(data));
    console.log(data);
};

const editTask = (e) => {
    let selectedTask = e.parentElement.parentElement;
    textInput.value = selectedTask.children[0].innerHTML;
    dateInput.value = selectedTask.children[1].innerHTML;
    textarea.value = selectedTask.children[2].innerHTML;

    deleteTask(e);
};
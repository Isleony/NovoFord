let form = document.querySelector('#form')
let textInput = document.querySelector('#textInput')
let dateInput = document.querySelector('#dateInput')
let textarea = document.querySelector('#textArea')
let msg = document.querySelector('#msg')
let tasks = document.querySelector('#tarefas')
let add = document.querySelector('#add')

form.addEventListener("submit", (e) => {
    e.preventDefault()
    console.log("botao clicado")
    formValidation()
})

let formValidation = () => {
    if (textInput.value === "") {
        console.log("Falha")
        msg.innerHTML = "tarefa nao pode estar em branco"
    }
    else {
        console.log("sucesso")
        msg.innerHTML = ""
        acceptData()
        add.setAttribute("data-bs-dismiss", "modal")
        add.click();

        (() => {
            add.setAttribute("data-bs-dismiss", "")
        })();
    }
}

let data = []

// Carregar dados do localStorage ao iniciar
window.addEventListener("load", () => {
    data = JSON.parse(localStorage.getItem("data")) || [];
    createTasks();
});

let acceptData = () => {
    data.push({
        text: textInput.value,
        date: dateInput.value,
        description: textarea.value
    })
    localStorage.setItem("data", JSON.stringify(data))
    console.log(data)
    createTasks()
}

let createTasks = () => {   
    tasks.innerHTML = "";  // Corrigido: Limpa corretamente o conteúdo de tarefas antes de adicionar novas

    data.map((x, y) => {
        return (tasks.innerHTML += `
            <div id="${y}">
            <span class="fw-bold">${x.text}</span>  
            <span class="small text-secondary">${x.date}</span>
            <p>${x.description}</p>

            <span class="options">
            <i onClick="editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
            <i onClick="deleteTask(this); createTasks()" class="fas fa-trash-alt"></i>
            </span>
            </div>
        `)
    })
    
    resetForm()
}

let resetForm = () => {
    textInput.value = ""
    dateInput.value = ""
    textarea.value = ""
}

let deleteTask = (e) => {
    e.parentElement.parentElement.remove()
    data.splice(e.parentElement.parentElement.id, 1)
    localStorage.setItem("data", JSON.stringify(data))
    console.log(data)
}

// Corrigido: Agora também atualiza a descrição ao editar
let editTask = (e) => {
    let selectedTask = e.parentElement.parentElement;
    textInput.value = selectedTask.children[0].innerHTML;
    dateInput.value = selectedTask.children[1].innerHTML;
    textarea.value = selectedTask.children[2].innerHTML;
}

//(e) é o elemento
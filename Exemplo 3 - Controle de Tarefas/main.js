import express from 'express';
const app = express();
const port = 3000;

app.use(express.static('public')); // Certifique-se de que o HTML e JS estão na pasta 'public'npm install express


app.get('/', (_req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});


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

let createTasks = () => {   //método 
    tasks.innerHTML = "",
        data.map((x, y) => {
    return (tasks.innerHTML += `
            <div id=${y}>
            <span class="fw-bold">${x.text}</span>  
            <span class="small text-secondary">${x.date}</span>
            <p>${x.description}</p>

            <span class="options">
            <i onClick="editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
             <i onClick="deleteTask(this)"; creatTask()" class="fas fa-trash-alt"></i>
            
            </span>
            </div>
            

            `) //é uma propriedade do JavaScript usada para acessar ou modificar o conteúdo HTML dentro de um elemento
})
resetForm()



}

let resetForm = () => {
    textInput.value=""
    dateInput.value=""
    textarea.value=""
}

// <span class="fw-bold">${x.text}</span>: O texto armazenado em x.text será exibido dentro de um <span>, e a classe "fw-bold" aplica o estilo de negrito ao texto.
//span ->texto de unica linha
//p ->mais de uma linha ->textArea
//options - > icones aqui
//localStorage.setItem("data", JSON.stringify(data)): Aqui, os dados armazenados na variável data são convertidos em uma string JSON usando JSON.stringify(data) e, em seguida, são armazenados no localStorage com a chave "data". O localStorage permite que os dados sejam salvos no navegador de forma persistente, ou seja, mesmo que a página seja recarregada, os dados continuarão armazenados.

//console.log(data): Isso imprime o conteúdo da variável data no console do navegador, ajudando a visualizar os dados que estão sendo armazenados.

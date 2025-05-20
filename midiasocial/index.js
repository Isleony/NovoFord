let form = document.querySelector('#form');
let postagem = document.querySelector("#postagem");
let posts = document.querySelector("#posts");
let txtPostagem = document.querySelector("#txtPostagem");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("Botão clicado");

    formValidation();
});

let formValidation = () => {
    if (postagem.value.trim() === "") {
        txtPostagem.innerHTML = "Postagem não pode estar em branco";
        console.log("Falha");
    } else {
        console.log("Sucesso");
        txtPostagem.innerHTML = "";
        acceptData();
    }
};

let data = {};

let acceptData = () => {
    data["text"] = postagem.value.trim();
    console.log("Dados aceitos:", data);
    createPost();
};

let createPost = () => {
    posts.innerHTML += `
    <div>
        <p>${data.text}</p>
        <span class="options">
            <i onclick="editPost(this)" class="fas fa-edit"></i>
            <i onclick="deletePost(this)" class="fas fa-trash-alt"></i>
        </span>
    </div>       
    `;
    postagem.value = "";
};

let deletePost = (e) => {
    e.parentElement.parentElement.remove();
};

let editPost = (e) => {
    postagem.value = e.parentElement.previousElementSibling.innerHTML;
    e.parentElement.parentElement.remove();
};

const api = "https://wedev-api.sky.pro/api/v2/alexey-kurochkin/comments";
const loginURL = 'https://wedev-api.sky.pro/api/user/login';

let token;

const setToken = (newToken) => {
    token = newToken;
}

let userName;

const setUserName = (newName) => {
    userName = newName;
}

function getTodos() {
    return fetch(api, {
        method: "GET",
    })
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            }
            if (response.status === 400) {
                throw new Error('Имя и комментарий должны быть не короче 3 символов')
            }
            if (response.status === 500) {
                throw new Error('Сервер отдыхает')
            }
            else {
                throw new Error('Не работает интернет')
            }
        })
}

function postTodo() {
    const nameUser = document.querySelector(".add-form-name");
    const commentUser = document.querySelector(".add-form-text");
    return fetch(api, {
        method: "POST",
        body: JSON.stringify({
            text: commentUser.value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;"),
            name: nameUser.value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;"),
        }),
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then((response) => {
            if (response.status === 201) {
                nameUser.value = "";
                commentUser.value = "";
                return response.json();
            }
            if (response.status === 400) {
                throw new Error('Имя и комментарий должны быть не короче 3 символов')
            }
            if (response.status === 500) {
                throw new Error("Сервер отдыхает");
            }
        })
}

function postLogin({ login, password }) {

    return fetch(loginURL, {
        method: "POST",
        body: JSON.stringify({
            login,
            password,
        }),
    })
        .then((response) => {
            if (response.status === 201) {
                return response.json();
            }
            if (response.status === 400) {
                throw new Error("Неверно введено имя или пароль");
            }
        })
        .catch((error) => {
            if (error.message === "Неверно введено имя или пароль") {
                alert("Неверно введено имя или пароль");
            }
        })
}

function catchTodo(error) {
    if (error.message === "Сервер сломался, попробуй позже") {
        addComment();
    }
    if (error.message === "Имя и комментарий должны быть не короче 3 символов") {
        alert("Имя и комментарий должны быть не короче 3 символов");
    }
}

export { token, getTodos, setToken, postTodo, postLogin, catchTodo, userName, setUserName }
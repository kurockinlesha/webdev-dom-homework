import * as api from './api.js';
import * as render from './render.js';
import * as main from './main.js';

const renderLogin = ({ userComment, isLoading, addComment }) => {
    const app = document.querySelector('.app');
    const loginHtml = `
    <div class="container">
    <div class="add-form">
    <h1>Страница входа</h1>
    <h3 class="form-title">Форма входа</h3> 
        <input type="text" id="login-input" class="add-form-login-name" placeholder="Логин" />
        <input type="text" id="password-input" class="add-form-login-password" placeholder="Пароль" />
        <div class="add-form-login-row">
    <button class="add-form-login-button" id="login-button">Войти</button>
    </div>
    `
    app.innerHTML = loginHtml;

    const btnElement = document.querySelector('#login-button');
    const loginInputElement = document.querySelector('#login-input');
    const passwordInputElement = document.querySelector('#password-input');

    btnElement.addEventListener('click', () => {
        api.postLogin({
            login: loginInputElement.value,
            password: passwordInputElement.value,
        }).then((responseData) => {
            api.setToken(responseData.user.token);
            return responseData;
        }).then((responseData) => {
            render.renderUserComments({ userComment, isLoading, addComment, responseData });
        })
    })
}

export { renderLogin }
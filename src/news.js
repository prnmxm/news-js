import './vendor/normalize.css'
import './pages/news.css'

import Event from "./js/components/Event";
import BaseComponent from "./js/components/BaseComponent";
import MainApi from "./js/api/MainApi";
import HeaderNews from "./js/components/HeaderNews";
import PopupForm from "./js/components/PopupForm";
import FormAuth from "./js/components/FormAuth";
import FormReg from "./js/components/FormReg";
import FormValidator from "./js/components/FormValidator";
import validation from "./js/utils/validationInput";
const {maiApiUrl,newsApiConfig} = require('./js/configs/configApi');

const event = new Event();
const headerTtitle = document.querySelector('.header__title');
const formValidator = new FormValidator(validation);
const nav__button = document.querySelector('.nav__button');
const popupDiv = document.querySelector('.popup');
const api = new MainApi(maiApiUrl);
const {formSingInSettings, formSignUpSettings} = require('./js/configs/configForm');

const formAuth = new FormAuth(formSingInSettings, api.signIn, event.trigger);
const formReg = new FormReg(formSignUpSettings,api.signUp, event.trigger);
const configPopup = {
  auth: {
    name: 'Вход',
    content: formAuth.create(),
    listener: [{type: 'input', self: formValidator.setEventListeners},{type: 'submit', self:  formAuth._eventSubmit}],
    second: 'Войти',
    secondForm: 'reg'
  },
  reg: {
    name: 'Регистрация',
    content: formReg.create(),
    listener: [{type: 'input', self: formValidator.setEventListeners},{type: 'submit', self:  formReg._eventSubmit}],
    second: 'Зарегистрироваться',
    secondForm: 'auth'
  },
  success: {
    name: 'Пользователь успешно зарегистрирован!',
    second: 'Выполнить вход',
    secondForm: 'auth'
  }
};
const popup = new PopupForm(popupDiv,configPopup);
const baseComponent = new BaseComponent(api.getUserData,event.trigger);
const header = new HeaderNews(api, nav__button, popup, headerTtitle);
event.on('userData', header.setData);
event.on('userData', header.render);
event.on('userAuth', popup.close);
event.on('userReg', popup.open);
baseComponent.checkAuth();


const getData = require('./js/utils/getData');


import NewsApi from "./js/api/NewsApi";


const newsApi = new NewsApi(newsApiConfig,getData)

import NewsCard from "./js/components/NewsCard";
const newsCard = new NewsCard(0);
const containerResult = document.querySelector('.result')
import CardListNews from "./js/components/CardListNews";
const searchKeys = document.querySelector('.header__paragraph');
const cardList = new CardListNews(searchKeys,newsCard, containerResult, api);
event.on('empty', cardList.searchNotFound)
api.getArticles().then((e)=> {
  if(e.length === 0 ){
    event.trigger('empty', true)
    return
  }
  cardList.initial(e)
  cardList.render();
})



const navToggler = document.querySelector('.nav__toggler');
const navItems = document.querySelector('.nav__items');
const nav = document.querySelector('.nav');
const body = document.querySelector('body');
navToggler.addEventListener('click', (e) => {
    if(e.currentTarget.classList.contains('collapsed')) {
        e.currentTarget.classList.remove('collapsed');
        navItems.classList.remove('nav__items_show');
        nav.classList.remove('nav_theme_dark');
        nav.classList.remove('nav_theme_white');

        document.querySelector('.overflow').remove();
        body.style.overflow = '';

        return;
    }
    e.currentTarget.classList.add('collapsed');
    navItems.classList.add('nav__items_show');
    nav.classList.add('nav_theme_dark');
    nav.classList.add('nav_theme_white');
    body.style.overflow = 'hidden';

    body.insertAdjacentHTML('afterend', '<div class="overflow"></div>');

});
api.getUserData().then((data) => {
  if (data === undefined){
    return location = './';
  }
})
  .catch((e)=> {
    return location = './';
  })

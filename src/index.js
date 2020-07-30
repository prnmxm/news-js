import './vendor/normalize.css'
import './pages/index.css'
import Event from "./js/components/Event";
import BaseComponent from "./js/components/BaseComponent";
import MainApi from "./js/api/MainApi";
import Header from "./js/components/Header";
import PopupForm from "./js/components/PopupForm";
import FormAuth from "./js/components/FormAuth";
import FormReg from "./js/components/FormReg";
import FormValidator from "./js/components/FormValidator";
import validation from "./js/utils/validationInput";
import CardListMain from "./js/components/CardListMain";
import NewsCard from "./js/components/NewsCard";
import NewsApi from "./js/api/NewsApi";
const event = new Event();
const {maiApiUrl,newsApiConfig} = require('./js/configs/configApi');

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
    second: 'Зарегистрироваться',
    secondForm: 'reg'
  },
  reg: {
    name: 'Регистрация',
    content: formReg.create(),
    listener: [{type: 'input', self: formValidator.setEventListeners},{type: 'submit', self:  formReg._eventSubmit}],
    second: 'Войти',
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
const header = new Header(api, nav__button, popup);
event.on('userData', header.setData);
event.on('userData', header.render);
event.on('userAuth', popup.close);
event.on('userReg', popup.open);
baseComponent.checkAuth();


const getData = require('./js/utils/getData');




const newsApi = new NewsApi(newsApiConfig,getData)

const newsCard = new NewsCard(1);
const containerResult = document.querySelector('.result')
const cardList = new CardListMain(newsCard, containerResult, api);


event.on('search', cardList.initial);
event.on('search', cardList.render);
event.on('searchError', cardList.searchError);
event.on('searchNotFound', cardList.searchNotFound);

event.on('searchLoader', cardList.renderLoader);



const formSearch = document.querySelector('.formSearch');
formSearch.addEventListener('submit', (e) => {
  e.preventDefault();
  const searchValue = e.currentTarget.elements.search.value;
  event.trigger('searchLoader', true)
  newsApi.getNews(searchValue).then( e => {
    if(e.articles.length === 0) {
      event.trigger('searchNotFound', false)
      return;
    }

    return event.trigger('search', {arr: e.articles, searchValue})
  }).catch((e)=> {
    event.trigger('searchError', true)})
});

const navToggler = document.querySelector('.nav__toggler');
const navItems = document.querySelector('.nav__items');
const nav = document.querySelector('.nav');
const body = document.querySelector('body');
navToggler.addEventListener('click', (e) => {
    if(e.currentTarget.classList.contains('collapsed')) {
        e.currentTarget.classList.remove('collapsed');
        navItems.classList.remove('nav__items_show');
        nav.classList.remove('nav_theme_dark');
        document.querySelector('.overflow').remove();
        body.style.overflow = '';

        return;
    }
    e.currentTarget.classList.add('collapsed');
    navItems.classList.add('nav__items_show');
    nav.classList.add('nav_theme_dark');
    body.style.overflow = 'hidden';

    body.insertAdjacentHTML('beforeend', '<div class="overflow"></div>');

})

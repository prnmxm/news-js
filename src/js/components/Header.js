export default class Header {
  constructor(api, button, popup) {
    this.data = null;
    this.isLoggedIn = false;
    this.api = api;
    this.button = button;
    this.render = this.render.bind(this);
    this.popup = popup;
  }
  async render ()  {
    try {
      if(this.isLoggedIn) {
        this.button.innerHTML = this._templateProfile(this.data.name);
        this.exitListener()
      }else {
        this.button.innerHTML = this._templateAuth();
        this.authListener()
      }
    }
    catch (e) {
      this.button.innerHTML = this._templateAuth();
      this.authListener()
    }
  }

  setData = (data) => {
    if(data) {
      this.data = data;
      this.isLoggedIn =!this.isLoggedIn
    }
  }
  _templateAuth = () => {
    return `Авторизоваться`;
  };
  _templateProfile = (name) => {
    this.button.insertAdjacentHTML('beforebegin', `<li class="nav__item"><a href="./news.html" class="nav__link link">Сохранённые статьи</a></li>`)
    return `<span class="caret">${name}<span class="icon-logout"></span></span>`;
  }
  exitListener = () => {
    this.button.removeEventListener('click', this.popupOpen)
    this.button.addEventListener('click', () => {
      this.api.exitUser().then(e=>{
        document.location.reload(true);
        // this.isLoggedIn = false;
        // this.render();
      });
    }, {once:true});
  };
  authListener = () => {
    this.button.addEventListener('click', this.popupOpen);
  }
  popupOpen = () => {
    this.popup.open('auth');
  }
}

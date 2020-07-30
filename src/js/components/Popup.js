export default class Popup {
  constructor(popup, settings) {
    this.popup = popup;
    this.settings = settings;
    this.currentPopup = null;
    this.isOpen = false;
    this.content = null;
    this.open = this.open.bind(this)
  };
  _clearContent ()  {
    this.popup.innerHTML = '';
  };
  _setContent  (data)  {
    this.popup.insertAdjacentElement('beforeend', this._template(data));
    this.content = data.content;
  };
  open (data)  {
    const current = this.settings[data];

    if(this.currentPopup !== data) {
      if(this.isOpen) this._delEvent();
      if(this.currentPopup !== null) this._clearContent();
      this.currentPopup = data;
      this._setContent(current);
    }
    if(!this.isOpen) {
      this._addEvent(current);
      this.popup.classList.add('popup', 'popup_open');
    }
  };

  _addEvent (data) {
    this.popup.querySelector('.popup__close').addEventListener('click', this.close);
    this.popup.addEventListener('click', this.close);

  };
  _delEvent () {
    this.popup.querySelector('.popup__close').removeEventListener('click', this.close);
    this.popup.removeEventListener('click', this.close);
  };
  close  (event)  {
    event.stopPropagation();
    if (event.target.classList.contains('popup_open') || event.target.classList.contains('icon-close')) {
      this.popup.classList.remove('popup_open');
      this._delEvent();
    }
  };

  _template (data)  {
    const body = document.createElement('div');
    body.classList.add('popup__body');
    body.insertAdjacentHTML('beforeend', `<h3 class="popup__name">${data.name}</h3><div class="popup__close"><span class="icon-close"></span></div>`);
    if(data.content) {
      body.append(data.content);
    }
    return body;
  };

}

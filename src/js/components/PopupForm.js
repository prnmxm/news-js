import Popup from "./Popup";

export default class PopupForm extends Popup {
  constructor(popup, settings,listener) {
    super(popup, settings);
    this.listener = listener;
  }
  _setContent = (data) => {
    super._setContent(data);
    this.listener = data.listener || [];
    this.popup.querySelector('.popup__body').insertAdjacentHTML('beforeend', this._secondTemplate(data))
  };
  _addEvent = (data) => {
    super._addEvent(data);
    if(this.listener !== 0 ) {
      this.listener.forEach(e=>{
        this.content.addEventListener(e.type, e.self);
      })
    }
    if (this.settings[this.currentPopup].second) this.popup.querySelector('.popup__link').addEventListener('click', this._second);
  };
  _delEvent = () => {
    super._delEvent();
    if(this.listener !== 0 ) {
      this.listener.forEach(e=>{
        this.content.removeEventListener(e.type, e.self);
      })
    }
    if (this.settings[this.currentPopup].second) this.popup.querySelector('.popup__link').removeEventListener('click', this._second);
  };

  close = (event) => {
    super.close(event);
    if (event.type === "submit") {
      this.popup.classList.remove('popup_open');
      this.content.reset(event);
      this._delEvent();
    }
  };
  _second = () => {
    this.open(this.settings[this.currentPopup].secondForm)
  };
  _secondTemplate = (data) => {
    if(data.second) {
      return `<p class="paragraph popup__text">${data.content ? 'или' : ''} <span class="popup__link">${data.second}</span></p>`;
    }
    return '';
  };
}

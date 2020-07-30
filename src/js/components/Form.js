export default class Form {
  constructor(settings) {
    this.settings = settings;
    this.data = null;
    this.form = null;
    this.error = null;
  }
  _getInfo =  (form) =>  {
    const cardData = {};
    Array.from(form.elements).forEach(e => {
      if (e.type !== "submit") {
        cardData[e.name] = e.value;
      }
    });
    return cardData;
  };
  showError(error){
    const errorSpan = document.createElement('span');
    errorSpan.classList.add('popup__error');
    errorSpan.textContent = error;
    this.error = errorSpan;
    this.form.querySelector('.popup__button ').insertAdjacentElement('beforebegin',this.error)
  }
  hideError(){
    if(this.error) {
      this.error.remove()
    }
  }
  blockForm(form){
    Array.from(form.elements).forEach((e)=> {
      if(e.classList.contains('popup__field')) {
        e.setAttribute('disabled', true)
      }
      if(e.classList.contains('popup__button')) {
        e.setAttribute('disabled', true)
        e.classList.remove('popup__button_active')
      }
  })
  }
  unblockForm(form){
    Array.from(form.elements).forEach((e)=> {
      if(e.classList.contains('popup__field')) {
        e.disabled = false
      }
      if(e.classList.contains('popup__button')) {
        e.classList.add('popup__button_active')
        e.disabled = false
      }
    })
  }
  create = () =>  {
    const form = document.createElement('form');
    this.form = form;
    form.classList.add('popup__form');
    form.insertAdjacentHTML('beforeend', this._template(this.settings));
    return form;
  };

  _eventSubmit  (e)  {
    e.preventDefault();
    this.data = this._getInfo(e.currentTarget);
  };
  _template (data)  {
    return `
        <form class="popup__form">
            ${this._addInputs(data.inputs)}
            <button class="popup__button button" disabled>${data.button.title}</button>
        </form>`
  };

  _addInputs (inputs) {
    return inputs.map(e=> this._popupGroup(e)).join('');
  };
  _popupGroup  (input){
    return `
      <div class="popup__group">
          <label for="${input.id}" class="popup__label">${input.label}</label>
          <input type="${input.type}" id="${input.id}" name="${input.id}" class="popup__field" autocomplete="off"
          placeholder="${input.placeholder}" minlength="${input.minlength}" maxlength="${input.maxlength}" ${input.required ? 'required': ''}>
          <span class="popup__error"></span>
      </div>`
  }


}

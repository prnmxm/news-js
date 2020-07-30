export default class FormValidator {
  constructor(validation) {
    this.valiadtion = validation;
  }
  _checkInputValidity(event) {
    const target = event.target;
    const error = target.closest(".popup__group").querySelector(".popup__error");
    const check = this.checkError(target);
    if(check) {
      return this._showError(error, check)
    }
    this._hideError(error)
  }
  checkError(target) {
    const targetState = target.validity;
    if (targetState.valueMissing) {
      return "Это обязательное поле";
    }
    if(this.valiadtion.types[target.name]) {
      return this.valiadtion.types[target.name](target);
    }
    if (targetState.tooLong || targetState.tooShort) {
      return`Должно быть от ${target.getAttribute('minlength')} до ${target.getAttribute('maxlength')} символов`;
    }
    if (!targetState.valid) {
      return'Неверное значение';
    }
    return true;
  }
  _setSubmitButtonState(form) {
    const formElements = Array.from(form.elements);
    const inputs = formElements.filter(e => {
      return e.classList.contains("popup__field");
    });
    const button = formElements.find(e => e.type == "submit");
    const inputsValid = inputs.every(e => {
      return !this.checkError(e);
    });
    if (inputsValid) {
      button.removeAttribute("disabled", true);
      button.classList.add("popup__button_active");
      this.reset(form)
    } else {
      button.setAttribute("disabled", true);
      button.classList.remove("popup__button_active");
    }
  }

  setEventListeners = (e) => {
    const form = e.currentTarget;
    this._setSubmitButtonState(form);
    this._checkInputValidity(e);
  };

  _showError(error, text) {
    error.textContent = text;
    error.style.display = "block";
  }

  _hideError(error) {
    error.textContent = "";
    error.style.display = "";
  }

  reset = (form) => {
    const formElements = Array.from(form.elements);
    formElements.filter(e => {
      return e.classList.contains("popup__field");
    }).forEach(e=> {
      this._hideError(e.closest(".popup__group").querySelector(".popup__error"))
    })
  };
}

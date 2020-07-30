const email = {
  id: 'email',
  label: 'Email',
  placeholder: 'Введите почту',
  type: 'email',
  minlength: "4",
  maxlength: "30",
  required: true
};
const password = {
  id: 'password',
  label: 'Пароль',
  placeholder: 'Введите пароль',
  type: 'password',
  minlength: "6",
  maxlength: "30",
  required: true
};
const name = {
  id: 'name',
  label: 'Имя',
  placeholder: 'Введите своё имя',
  type: 'text',
  minlength: "2",
  maxlength: "30",
  required: true
};
const formSingInSettings = {
  inputs: [email, password],
  button: {
    title: 'Войти',
  }
};

const formSignUpSettings = {
  inputs: [email, password, name],
  button: {
    title: 'Зарегистрироваться',
  }
};

module.exports = {formSingInSettings, formSignUpSettings};

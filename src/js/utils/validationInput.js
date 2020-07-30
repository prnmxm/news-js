function createError(field, regexp, error) {
  return (target) => {
    if(target.value.length < target.getAttribute('minlength')) {
      return `Минимальная длина ${field} ${target.getAttribute('minlength')}`
    }
    if(target.value.length > target.getAttribute('maxlength')) {
      return `Максимальная длина ${field} ${target.getAttribute('maxlength')}`
    }
    return regexp.test(target.value) ?  false : error;
  }
}
const regExpMail = /([a-zA-Z0-9]([-_.]?[a-zA-Z0-9]+)*)@([a-zA-Z0-9]([-]?[a-zA-Z0-9]+)*)(\.([a-zA-Z])+)+/i;
const regExpName = /([А-ЯЁ][а-яё]+)(?:(?:-)([А-ЯЁ][а-яё]+))?/i;
const regExpPass = /(?=^.{6,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[a-zA-Z])/ig;

const validationEmail = createError('почты', regExpMail, 'Введите корректную почту');
const validationName = createError('имени', regExpName, 'Введите настоящее имя');
const validationPass = createError('пароля', regExpPass, 'Пароль должен содержать цифры латинские буквы');

// function validationEmail(target) {
//   if(target.value.length < target.getAttribute('minlength')) {
//     return `Минимальная длина почты ${target.getAttribute('minlength')}`
//   }
//   if(target.value.length > target.getAttribute('maxlength')) {
//     return `Максимальная длина почты ${target.getAttribute('maxlength')}`
//   }
//   const regexp = /([a-zA-Z0-9]([-_.]?[a-zA-Z0-9]+)*)@([a-zA-Z0-9]([-]?[a-zA-Z0-9]+)*)(\.([a-zA-Z])+)+/i;
//   return regExpMail.test(target.value) ?  false : 'Введите корректную почту';
// }
// function validationName(target) {
//   if(target.value.length < target.getAttribute('minlength')) {
//     return `Минимальная длина имени ${target.getAttribute('minlength')}`
//   }
//   if(target.value.length > target.getAttribute('maxlength')) {
//     return `Максимальная длина имени ${target.getAttribute('maxlength')}`
//   }
//   const regexp = /([А-ЯЁ][а-яё]+)(?:(?:-)([А-ЯЁ][а-яё]+))?/i;
//   return regexp.test(target.value) ?  false : 'Введите настоящее имя';
// }
// function validationPass(target) {
//   if(target.value.length < target.getAttribute('minlength')) {
//     return `Минимальная длина пароля ${target.getAttribute('minlength')}`
//   }
//   if(target.value.length > target.getAttribute('maxlength')) {
//     return `Максимальная длина пароля ${target.getAttribute('maxlength')}`
//   }
//   const regexp = /(\w+){6,}/g;
//   return regexp.test(target.value) ?  false : 'Пароль должен состоять из цифр и латинских букв';
// }

const validation = {
  types: {
    email: validationEmail,
    name: validationName,
    password: validationPass
  }
};
export default validation;

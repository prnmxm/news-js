export default class CardList {
  constructor(cardTemplate,container,api) {
    this.container = container;
    this.cardTemplate = cardTemplate;
    this.cards = [];
    this.api = api;
    this.searchValue = null;
    this.isLoggedIn = false;
    this.render = this.render.bind(this)
  }
  render  () {
    const template = document.createElement('div');
    template.classList.add('result__container','container');
    template.insertAdjacentHTML('beforeend', `<div class="cards"></div>`);
    const button = document.createElement('button');
    button.textContent = 'Показать еще';
    button.classList.add('cards__more', 'button');
    template.querySelector('.cards').append(button);
    this.showMore(button)
    this.container.innerHTML = ''
    this.container.append(template);

  }
  checkAuth () {

  }
  addCards = () => {
    const button = this.container.querySelector('.cards__more');
    button.insertAdjacentHTML('beforebegin', this.cards.splice(0,3).map( e => {
      return this.cardTemplate.render(e, this.isLoggedIn)
    }).join(''));
    this.showMore(button)
  }

  showMore = (button) => {
    if(this.cards.length !== 0) {
      button.style.display = 'block';
      button.addEventListener('click', this.addCards)
      return
    }
    button.removeEventListener('click', this.addCards)
    button.style.display = 'none';
    return button;
  }

  renderLoader = () => {
    const proloader = `
        <div class="circle-preloader"></div>
        <p class="result__search">Идет поиск новостей...</p>
   `
    this.container.innerHTML = proloader;
  }
  searchNotFound= () =>{
    const notFound = `
            <div class="result__notFound"></div>
            <h2 class="result__subtitle">Ничего не найдено</h2>
        `
    this.container.innerHTML = notFound;

  }
  searchError = () => {
    const searchError = `
            <div class="result__notFound"></div>
            <h2 class="result__subtitle">Попробуй позже</h2>
        `
      this.container.innerHTML = searchError;

  }
}





// export default class CardList {
//   constructor(cardTemplate,containerResult,api) {
//     this.cardTemplate = cardTemplate;
//     this.cards = [];
//     this.searchValue = null;
//     this.containerResult = containerResult;
//     this.api = api;
//     this.isLoggedIn = false;
//   }
//   render = () =>{
//     const template = document.createElement('div');
//     template.classList.add('result__container','container');
//     template.insertAdjacentHTML('beforeend', '<div class="cards"></div>')
//     const button = document.createElement('button');
//     button.textContent = 'Показать еще';
//     button.classList.add('cards__more', 'button');
//     template.querySelector('.cards').append(button);
//     this.showMore(button)
//     this.containerResult.innerHTML = ''
//     this.containerResult.append(template);
//     this.api.getUserData().then(()=> {
//       this.isLoggedIn = true;
//       this.saveCards();
//     }).catch(()=> this.isLoggedIn=false).finally(()=> this.addCards())
//   }
//   addCards = () => {
//     const button = this.containerResult.querySelector('.cards__more');
//     button.insertAdjacentHTML('beforebegin', this.cards.splice(0,3).map( e => {
//       return this.cardTemplate.render(e, this.isLoggedIn)
//     }).join(''));
//     this.showMore(button)
//   }
//   saveCards = () => {
//     this.containerResult.addEventListener('click', (e) => {
//       if(e.target.closest('.card__favorites')&&!e.target.closest('.card__favorites').querySelector('.icon-favorite_active')) {
//         const card = e.target.closest('.card');
//         const data = {
//           keyword: this.searchValue,
//           title: card.querySelector('.card__title').textContent,
//           text: card.querySelector('.card__paragraph').textContent,
//           date: card.querySelector('.card__date').textContent,
//           source: card.querySelector('.card__owner').textContent,
//           link: card.querySelector('.card__body').getAttribute('href'),
//           image: card.querySelector('.card__image').getAttribute('src')
//         }
//         this.api.createArticle(data).then(() => {
//           this.cardTemplate.changeButtonFavActive(e.target.closest('.card__favorites').querySelector('.icon-favorite'));
//         }).catch(e=> console.log(e))
//       }
//     })
//   }
//   showMore = (button) => {
//     if(this.cards.length !== 0) {
//       button.style.display = 'block';
//       button.addEventListener('click', this.addCards)
//       return
//     }
//     button.removeEventListener('click', this.addCards)
//     button.style.display = 'none';
//     return button;
//   }
//   initial = (data) => {
//     this.cards = data.arr;
//     if ()
//       this.searchValue = data.searchValue;
//   }
//   renderLoader = () => {
//     const proloader = `
//         <div class="circle-preloader"></div>
//         <p class="result__search">Идет поиск новостей...</p>
//    `
//     this.containerResult.innerHTML = proloader;
//   }
//   searchNotFound= () =>{
//     const notFound = `
//             <div class="result__notFound"></div>
//             <h2 class="result__subtitle">Ничего не найдено</h2>
//         `
//     this.containerResult.innerHTML = notFound;
//
//   }
//   searchError = () => {
//     const searchError = `
//             <div class="result__notFound"></div>
//             <h2 class="result__subtitle">Попробуй позже</h2>
//         `
//     this.containerResult.innerHTML = searchError;
//
//   }
// }

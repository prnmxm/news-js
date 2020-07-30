import CardList from "./CardList";

export default class CardListMain extends CardList{
  saveCards  () {
    this.container.addEventListener('click', (e) => {
      if(e.target.closest('.card__favorites')&&!e.target.closest('.card__favorites').querySelector('.icon-favorite_active')) {
        const card = e.target.closest('.card');
        const data = {
          keyword: this.searchValue,
          title: card.querySelector('.card__title').textContent || 'null',
          text: card.querySelector('.card__paragraph').textContent || 'null',
          date: card.querySelector('.card__date').textContent || 'null',
          source: card.querySelector('.card__owner').textContent || 'null',
          link: card.querySelector('.card__body').getAttribute('href'),
          image: card.querySelector('.card__image').getAttribute('src')
        }
        this.api.createArticle(data).then(() => {
          this.cardTemplate.changeButtonFavActive(e.target.closest('.card__favorites').querySelector('.icon-favorite'));
        }).catch(e=> console.log(e))
      }
    })

  }
  render() {
    super.render();
    this.api.getUserData().then(()=> {
      this.isLoggedIn = true;
      this.saveCards();
    }).catch(()=> this.isLoggedIn=false).finally(()=> this.addCards())

  }
  initial = (data) => {
    this.searchValue = data.searchValue;
    const dataCards = data.arr;
    this.cards = dataCards.map((e,i)=> {
      return data = {
        _id: i,
        image: e.urlToImage,
        link: e.url,
        date: e.publishedAt,
        title: e.title,
        text: e.description,
        source: e.source.name,
        keyword: e.keyword,
      }
    });
  }
}

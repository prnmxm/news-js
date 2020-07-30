import CardList from "./CardList";

export default class CardListNews extends CardList{
  constructor(searchKeys,cardTemplate,container,api) {
    super(cardTemplate,container,api)
    this.searchKeys = searchKeys;
  }
  render() {
    super.render();
    this.api.getUserData().then(()=> {
      this.isLoggedIn = true;
      this.deleteCards();
    }).catch(()=> this.isLoggedIn=false).finally(()=> {
      const keywords = [];
      this.cards.forEach(e=> {
        if(!keywords.includes(e.keyword)) {
          keywords.push(e.keyword)
        }
      })

      this.searchKeys.textContent =  `По ключевым словам: ${keywords.splice(0,2)} ${keywords.length !== 0 ? `и ${keywords.length} другим`: ''}`
      this.addCards()

    })

  }
  deleteCards  () {
    this.container.addEventListener('click', (e) => {
      if(e.target.closest('.card__favorites')) {
        const card = e.target.closest('.card');
        this.api.removeArticle(card.id).then((e) => {
          card.remove();
        }).catch(e=> console.log(e))
      }
    })

  }

  initial = (data) => {
    this.cards = data;
    this.searchValue = data.keyword;
  }
}

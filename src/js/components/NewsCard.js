export default class NewsCard {
  constructor(page) {
    this.isLoggedIn = false;
    this.page = page;
  }
  renderIcon () {
    if(this.page) {
      return this.renderButtonFav()
    }else {
      return this.renderButtonTrash()
    }

  }
  renderButtonFav = () => {
    if(!this.isLoggedIn) {
      return `<span class="icon-favorite"></span><span class="card__tooltip">Войдите, чтобы сохранять статьи</span>`;
    }
    return `<span class="icon-favorite"></span>`;

  }
  renderButtonTrash = () => {
    return `<span class="icon-trash"></span>`;
  }
  changeButtonFavActive = (icon) => {
    icon.classList.add('icon-favorite_active')
  }
  render = (data, isLoggedIn) => {
    this.isLoggedIn = isLoggedIn;
    return `<div class="card" ${data._id ? `id="${data._id}"`: ''}>
                <div class="card__header">
                    <div class="card__right-block">
                        <button class="card__favorites">${this.renderIcon()}</button>
                    </div>
                    <img class="card__image" src="${data.image === null ? 'https://via.placeholder.com/300':data.image }" alt="Природа">
                </div>
                <a class="card__body link" href="${data.link}">
                    <span class="card__date textMuted">${data.date.match(/[0-9]+-[0-9]+-[0-9]+/)[0]}</span>
                    <h3 class="card__title">${data.title}</h3>
                    <p class="card__paragraph paragraph">${data.text}
                    </p>
                </a>
                <div class="card__footer">
                    <a class="card__owner textMuted link" href="/" target="_blank">${data.source}</a>
                </div>
            </div>`
  }
}

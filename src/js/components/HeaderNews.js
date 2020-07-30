import Header from "./Header";

export default class HeaderNews extends Header{
  constructor(api, button, popup, nameBlock) {
    super(api, button, popup);
    this.nameBlock = nameBlock;
  }

  async render() {
    super.render();
    this.nameBlock.textContent = this.data.name + ', у вас 5 сохранённых статей'
  }
}

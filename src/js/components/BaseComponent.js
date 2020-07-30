export default class BaseComponent {
  constructor(getUserData,trigger) {
    this.getUserData = getUserData;
    this.trigger = trigger;
  }
  checkAuth () {
    this.getUserData().then(e=> {
      this.trigger('userData', e)
    }).catch( e=> {
      this.trigger('userData', false)
    })
  }
}

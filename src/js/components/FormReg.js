import Form from "./Form";

export default class FormReg extends Form {
  constructor(settings, api,eventTrigger) {
    super(settings);
    this.api = api;
    this.eventTrigger = eventTrigger;
  }
  _eventSubmit = (e) => {
    super._eventSubmit(e);
    this.hideError();
    const cur = e.currentTarget;
    this.blockForm(cur)
    this.api(this.data).then(data=> {
      this.eventTrigger('userReg', 'success');

    }).catch(err=> {
      this.unblockForm(cur)
      this.showError(err.message)
    })

  }
}

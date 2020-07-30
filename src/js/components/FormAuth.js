import Form from "./Form";

export default class FormAuth extends Form {
  constructor(settings, api, eventTrigger) {
    super(settings);
    this.api = api;
    this.eventTrigger = eventTrigger;
  }
  _eventSubmit = async (e) => {
    super._eventSubmit(e);
    this.hideError();
    const cur = e.currentTarget;
    this.blockForm(cur)
    this.api(this.data).then(e=>{
      document.location.reload(true);
    }).catch(e=>{
        this.unblockForm(cur)
        this.showError(e.message)
    })
  }
}

export default class Event {
  constructor() {
    this.events = {};
  }
  on = (eventName, fn) =>{
    this.events[eventName] = this.events[eventName] || [];
    this.events[eventName].push(fn);
  };
  off = (eventName, fn) => {
    if(this.events[eventName]) {
      this.events = this.events[eventName].filter( e => {
        if(fn !== e) return e;
      })
    }
  };
  trigger = (eventName, data) => {
    if(this.events[eventName]) {
      this.events[eventName].forEach( e => {
        e(data);
      })
    }
  }
}

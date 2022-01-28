import { makeAutoObservable } from "mobx";

class OrderBy {
  order = "";
  counter = 0;

  constructor() {
    makeAutoObservable(this);
    this.counter = 0;
    this.order = "";
  }
  setOrder(order) {
    this.order = order;
    this.counter = this.counter + 1;
  }
  setBack() {
    this.counter = 0;
    this.order = "";
  }
}

export default new OrderBy();

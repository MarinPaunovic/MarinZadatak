import { makeAutoObservable } from "mobx";

class OrderBy {
  order = "";
  counter = 0;

  constructor() {
    makeAutoObservable(this);
  }
  setOrder(order) {
    this.order = order;
  }
  setCounter(counter) {
    this.counter = counter;
  }
}

export default new OrderBy();

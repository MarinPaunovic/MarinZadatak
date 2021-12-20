import { makeAutoObservable } from "mobx";

class OrderBy {
  Order = "";
  Counter = 0;

  constructor() {
    makeAutoObservable(this);
  }
  setOrder(order) {
    this.Order = order;
  }
  setCounter(counter) {
    this.Counter = counter;
  }
}

export default new OrderBy();

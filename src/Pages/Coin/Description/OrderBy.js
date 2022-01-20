import { makeAutoObservable } from "mobx";
import Crypto from "../List/ListStore";
class OrderBy {
  order = "";
  counter = 0;

  constructor() {
    makeAutoObservable(this);
  }
  setOrder(order) {
    this.order = order;
    this.counter = this.counter + 1;
    Crypto.setAction();
  }
}

export default new OrderBy();

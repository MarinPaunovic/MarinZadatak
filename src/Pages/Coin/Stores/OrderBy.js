import { makeAutoObservable } from "mobx";

class OrderBy {
  order = "";
  counter = 0;

  constructor() {
    makeAutoObservable(this);
  }
  setOrder(order) {
    if (order !== "") {
      console.log("order");
      this.order = order;
      this.counter = this.counter + 1;
    } else {
      console.log("ciscenje");
      this.order = "";
      this.counter = 0;
    }
  }
}

export default OrderBy;

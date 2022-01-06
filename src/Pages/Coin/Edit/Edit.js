import { makeAutoObservable } from "mobx";

class EditItemId {
  itemId = "";
  name = "";
  tag = "";
  price = 0;
  marketCap = 0;

  constructor() {
    makeAutoObservable(this);
  }

  setItemId(newId) {
    this.itemId = newId;
  }
  setName(name) {
    this.name = name;
  }
  setTag(tag) {
    this.tag = tag;
  }
  setPrice(price) {
    this.price = price;
  }
  setMarketCap(marketCap) {
    this.marketCap = marketCap;
  }
}

export default new EditItemId();

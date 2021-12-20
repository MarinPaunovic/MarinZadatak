import { makeAutoObservable } from "mobx";

class EditItemId {
  itemId = "";
  Ime = "";
  Kratica = "";
  Price = 0;
  MarketCap = 0;

  constructor() {
    makeAutoObservable(this);
  }

  setItemId(newId) {
    this.itemId = newId;
  }
  setIme(Ime) {
    this.Ime = Ime;
  }
  setKratica(Kratica) {
    this.Kratica = Kratica;
  }
  setPrice(Price) {
    this.Price = Price;
  }
  setMarketCap(MarketCap) {
    this.MarketCap = MarketCap;
  }
}

export default new EditItemId();

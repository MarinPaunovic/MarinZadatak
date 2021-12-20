import { makeAutoObservable } from "mobx";

class AddNewList {
  Ime = "";
  Kratica = "";
  Price = 0;
  MarketCap = 0;

  constructor() {
    makeAutoObservable(this);
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

export default new AddNewList();

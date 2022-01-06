import { makeAutoObservable } from "mobx";

class Search {
  item = "";

  constructor() {
    makeAutoObservable(this);
  }
  setItem(searchItem) {
    this.item = searchItem;
  }
}

export default new Search();

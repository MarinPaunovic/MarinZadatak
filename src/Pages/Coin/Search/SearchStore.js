import { makeAutoObservable } from "mobx";
import Crypto from "../List/ListStore";

class SearchStore {
  item = "";

  constructor() {
    makeAutoObservable(this);
  }
  setItem(searchItem) {
    this.item = searchItem;
  }
  setSearch(item) {
    this.setItem(item);
    let newList = [];
    let test = 0;
    Crypto.list.filter((value) =>
      value.name.toLowerCase().includes(item.toLocaleLowerCase()) ||
      value.tag.toLowerCase().includes(item.toLocaleLowerCase())
        ? (newList.push({
            name: value.name,
            tag: value.tag,
            price: value.price,
            marketCap: value.marketCap,
            id: value.id,
          }),
          Crypto.setSearchList(newList),
          test++)
        : test === 0 && Crypto.setSearchList(newList)
    );
  }
}

export default new SearchStore();

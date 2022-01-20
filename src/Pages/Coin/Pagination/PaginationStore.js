import { makeAutoObservable, runInAction } from "mobx";
import Crypto from "../List/ListStore";

class Page {
  pageNumber = 1;
  pages = [];
  constructor() {
    makeAutoObservable(this);
  }

  setPageNumber(page) {
    this.pageNumber = page;
  }
  setPages(number) {
    this.pages = number;
  }
  getPages(length) {
    const oListNumber = length;
    const test = Math.ceil(oListNumber / 5);
    for (let i = 1; test >= i; i++) {
      this.pages.push(i);
    }
  }

  setPagination() {
    let indexFrom = (this.pageNumber - 1) * 5;
    let indexTo = this.pageNumber * 5;
    const newList = [];
    if (indexTo > Crypto.list.length) {
      for (indexFrom; Crypto.list.length > indexFrom; indexFrom++) {
        if (Crypto.list[indexFrom]) {
          newList.push({
            name: Crypto.list[indexFrom].name,
            tag: Crypto.list[indexFrom].tag,
            price: Crypto.list[indexFrom].price,
            marketCap: Crypto.list[indexFrom].marketCap,
            id: Crypto.list[indexFrom].id,
          });
        } else return;
        Crypto.setPageList(newList);
      }
    } else {
      for (indexFrom; indexTo > indexFrom; indexFrom++) {
        if (Crypto.list[indexFrom]) {
          newList.push({
            name: Crypto.list[indexFrom].name,
            tag: Crypto.list[indexFrom].tag,
            price: Crypto.list[indexFrom].price,
            marketCap: Crypto.list[indexFrom].marketCap,
            id: Crypto.list[indexFrom].id,
          });
        } else return;
        Crypto.setPageList(newList);
      }
    }
  }
}

export default new Page();

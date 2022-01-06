import { makeAutoObservable } from "mobx";

class Crypto {
  list = [];
  searchList = [];
  pageList = [];
  renderAfterEdit = true;

  constructor() {
    makeAutoObservable(this);
  }

  setList(newList) {
    this.list = newList;
  }
  setSearchList(newList) {
    this.searchList = newList;
  }

  setPageList(newList) {
    this.pageList = newList;
  }
  setRenderAfterEdit() {
    this.renderAfterEdit = !this.renderAfterEdit;
  }
}

export default new Crypto();

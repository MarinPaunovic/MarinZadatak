import { makeAutoObservable } from "mobx";

class Crypto {
  List = [];
  SearchList = [];
  pageList = [];
  renderAfterEdit = true;

  constructor() {
    makeAutoObservable(this);
  }

  setList(newList) {
    return (this.List = newList);
  }
  setSearchList(newList) {
    this.SearchList = newList;
  }

  setPageList(newList) {
    this.pageList = newList;
  }
  setRenderAfterEdit() {
    this.renderAfterEdit = !this.renderAfterEdit;
  }
}

export default new Crypto();

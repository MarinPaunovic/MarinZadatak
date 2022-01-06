import { makeAutoObservable } from "mobx";

class Page {
  pageNumber = 1;

  constructor() {
    makeAutoObservable(this);
  }

  setPageNumber(page) {
    this.pageNumber = page;
  }
}

export default new Page();

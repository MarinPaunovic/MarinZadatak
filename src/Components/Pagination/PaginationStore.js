import { makeAutoObservable, runInAction } from "mobx";

class Page {
  pageNumber = 1;
  pages = [];
  indexFrom = null;
  indexTo = null;
  constructor() {
    makeAutoObservable(this);
    this.getPages();
    this.setIndex();
  }

  clearPages() {
    this.pages = [];
  }
  setPageNumber(page) {
    this.pageNumber = page;
    this.setIndex();
  }
  setPages(number) {
    this.pages = number;
  }
  getPages(length) {
    this.clearPages();
    if (length === 0) {
      this.pages = [];
    } else {
      const test = Math.ceil(length / 5);
      for (let i = 1; test >= i; i++) {
        this.pages.push(i);
      }

      this.setIndex();
    }
  }
  setIndex() {
    runInAction(() => {
      this.indexTo = this.pageNumber * 5;
      this.indexFrom = (this.pageNumber - 1) * 5;
    });
  }
  setIndexTo() {
    this.indexTo = null;
  }

  setIndexFrom() {
    this.indexFrom = null;
  }
}

export default Page;

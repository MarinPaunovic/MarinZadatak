import { makeAutoObservable, runInAction } from "mobx";

class Page {
  pageNumber = 1;
  pages = [];
  indexFrom = null;
  indexTo = null;
  constructor(props) {
    makeAutoObservable(this);
    this.getPages(props.length);
    this.setPageList = props.method;
  }

  clearPages() {
    this.pages = [];
  }
  setPageNumber(page) {
    this.pageNumber = page;
    this.setIndex();
    this.setPageList(this.indexTo, this.indexFrom);
  }
  setPages(number) {
    this.pages = number;
  }
  getPages(length) {
    this.clearPages();
    if (!length || length === 0) {
      this.pages = [];
    } else {
      const test = Math.ceil(length / 5);
      for (let i = 1; test >= i; i++) {
        this.pages.push(i);
      }
    }
  }
  setIndex() {
    runInAction(() => {
      this.indexTo = this.pageNumber * 5;
      this.indexFrom = (this.pageNumber - 1) * 5;
    });
  }
}

export default Page;

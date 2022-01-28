import { makeAutoObservable } from "mobx";

class GetCommentStore {
  coinId = "";
  toggle = false;

  constructor() {
    makeAutoObservable(this);
    this.toggle = false;
    this.coinId = "";
  }
  setCoinId() {
    this.coinId = "";
  }

  setToggle(id) {
    if (id === this.coinId) {
      this.coinId = "";
      this.toggle = false;
    } else {
      this.coinId = id;
      this.toggle = true;
    }
  }
}

export default new GetCommentStore();

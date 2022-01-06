import { makeAutoObservable } from "mobx";

class GetCommentStore {
  test;
  coinId;

  constructor() {
    makeAutoObservable(this);
  }

  setTest(test) {
    this.test = test;
  }
  setCoinId(coinId) {
    this.coinId = coinId;
  }
}

export default new GetCommentStore();

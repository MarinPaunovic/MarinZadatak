import { makeAutoObservable } from "mobx";

class GetCommentStore {
  coinId;

  constructor() {
    makeAutoObservable(this);
  }

  setCoinId(coinId) {
    this.coinId = coinId;
  }
}

export default new GetCommentStore();

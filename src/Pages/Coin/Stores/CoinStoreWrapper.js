import Crypto from "./ListStore";
import SearchStore from "./SearchStore";
import GetCommentStore from "./GetCommentsStore";

class CoinStoreWrapper {
  constructor() {
    this.crypto = new Crypto(this);
    this.search = new SearchStore(this);
    this.getComment = new GetCommentStore(this);
  }
}

export default CoinStoreWrapper;

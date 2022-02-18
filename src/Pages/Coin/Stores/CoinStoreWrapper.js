import Crypto from "./ListStore";
import SearchStore from "./SearchStore";
import Page from "../../../Components/Pagination/PaginationStore";
import OrderBy from "./OrderBy";
import GetCommentStore from "./GetCommentsStore";

class CoinStoreWrapper {
  constructor() {
    this.order = new OrderBy(this);
    this.crypto = new Crypto(this);
    this.search = new SearchStore(this);
    this.getComment = new GetCommentStore(this);
  }
}

export default CoinStoreWrapper;

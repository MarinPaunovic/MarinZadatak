import Crypto from "./ListStore";
import SearchStore from "./SearchStore";
import Page from "../../../Components/Pagination/PaginationStore";
import OrderBy from "./OrderBy";
import GetCommentStore from "./GetCommentsStore";

class ListRootStore {
  constructor() {
    this.page = new Page(this);
    this.order = new OrderBy(this);
    this.crypto = new Crypto(this);
    this.search = new SearchStore(this);
    this.getComment = new GetCommentStore(this);
  }
}

export default ListRootStore;

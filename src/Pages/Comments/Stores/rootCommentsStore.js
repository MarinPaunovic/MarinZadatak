import EditCommentStore from "./EditCommentStore";
import CommentStore from "./CommentStore";
import AddCommentStore from "./AddCommentStore";
import DeleteCommentStore from "./DeleteCommentStore";
import Page from "../../../Components/Pagination/PaginationStore";

class commentsStores {
  constructor(props) {
    this.page = new Page(this);
    this.comments = new CommentStore({ stores: this, id: props });
    this.edit = new EditCommentStore(this);
    this.add = new AddCommentStore(this);
    this.delete = new DeleteCommentStore(this);
  }
}
export default commentsStores;

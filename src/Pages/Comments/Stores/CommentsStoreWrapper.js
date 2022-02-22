import EditCommentStore from "./EditCommentStore";
import CommentStore from "./CommentStore";
import AddCommentStore from "./AddCommentStore";
import DeleteCommentStore from "./DeleteCommentStore";

class CommentsStoreWrapper {
  constructor() {
    this.comments = new CommentStore(this);
    this.edit = new EditCommentStore(this);
    this.add = new AddCommentStore(this);
    this.delete = new DeleteCommentStore(this);
  }
}
export default CommentsStoreWrapper;

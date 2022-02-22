import { makeAutoObservable } from "mobx";
import { comments } from "../../../Services/DatabaseService";

class EditCommentStore {
  editComment = "";
  editCommentId = null;

  constructor(props) {
    makeAutoObservable(this);
    this.setEditCommentId(props.commentId);
  }

  setEdit(comment) {
    this.editComment = comment;
  }
  setEditCommentId(id) {
    this.editCommentId = id;
  }
  setHandleEdit(id) {
    if (!this.editComment) {
      this.setEditCommentId("");
    } else {
      let data = { comment: this.editComment };
      comments.setEdit(id, data);
    }
  }
}

export default EditCommentStore;

import { makeAutoObservable } from "mobx";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../../db/firebase";

class EditCommentStore {
  editComment = "";
  editCommentId = null;

  constructor() {
    makeAutoObservable(this);
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
      updateDoc(doc(db, "Comments", id), {
        comment: this.editComment,
      });
    }
  }
}

export default EditCommentStore;

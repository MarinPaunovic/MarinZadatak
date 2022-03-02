import { makeAutoObservable } from "mobx";
import { comments } from "../../../Services/DatabaseService";

class DeleteCommentStore {
  id = "";
  deleteAction = false;
  deleteConfirmation = false;

  constructor() {
    makeAutoObservable(this);
  }
  setDeleteAction(bool) {
    this.deleteAction = bool;
  }
  setDeleteConfirmation(bool) {
    this.deleteConfirmation = bool;
  }
  setDeleteId(id) {
    this.id = id;
  }
  setDelete(id) {
    comments.setDelete(id);
    this.deleteAction = !this.deleteAction;
    this.deleteConfirmation = true;
  }
}

export default DeleteCommentStore;

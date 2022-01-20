import { doc, deleteDoc } from "firebase/firestore";
import { makeAutoObservable } from "mobx";
import { db } from "../../../db/firebase";

class DeleteComment {
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
    this.id = id.id;
  }
  setDelete(id) {
    deleteDoc(doc(db, "Comments", id));
    this.deleteAction = !this.deleteAction;
  }
}

export default new DeleteComment();

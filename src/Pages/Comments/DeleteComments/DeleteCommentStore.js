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
  setDeleteConfirmation() {
    this.deleteConfirmation = false;
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
    this.deleteConfirmation = true;
  }
}

export default new DeleteComment();

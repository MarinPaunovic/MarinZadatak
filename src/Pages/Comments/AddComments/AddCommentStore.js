import { makeAutoObservable } from "mobx";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../db/firebase";

class AddCommentStore {
  content;
  toggle = false;

  constructor() {
    makeAutoObservable(this);
  }
  setContent(content) {
    this.content = content;
  }

  setToggle() {
    this.toggle = !this.toggle;
  }
  setComment(id, content) {
    addDoc(collection(db, "Comments"), {
      coinId: id,
      comment: content,
      createdAt: new Date().toLocaleDateString(undefined, {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    });
  }
}

export default new AddCommentStore();

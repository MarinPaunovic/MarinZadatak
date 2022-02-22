import { makeAutoObservable } from "mobx";
import { comments } from "../../../Services/DatabaseService";

class AddCommentStore {
  content = "";
  toggle = false;
  addAction = false;

  constructor() {
    makeAutoObservable(this);
    this.addAction = false;
  }
  setContent(content) {
    this.content = content;
  }
  setAddAction() {
    this.addAction = false;
  }
  setToggle() {
    this.toggle = !this.toggle;
  }
  addComment(id) {
    let data = {
      coinId: id,
      comment: this.content,
      createdAt: new Date().toLocaleDateString(undefined, {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    comments.setAdd(data);
    this.addAction = true;
  }
}

export default AddCommentStore;

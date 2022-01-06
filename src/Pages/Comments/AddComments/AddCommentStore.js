import { makeAutoObservable } from "mobx";

class AddCommentStore {
  userId;
  user;
  commentId;
  comment;
  createdAt;

  constructor() {
    makeAutoObservable(this);
  }
  setUserId(userId) {
    this.userId = userId;
  }
  setUser(user) {
    this.user = user;
  }
  setComment(comment) {
    this.comment = comment;
  }
  setCreatedAt(createdAt) {
    this.createdAt = createdAt;
  }
  setCommentId(id) {
    this.commentId = id;
  }
}

export default new AddCommentStore();

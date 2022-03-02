import { query, collection, where, onSnapshot } from "firebase/firestore";
import { makeAutoObservable, reaction, runInAction } from "mobx";
import { db } from "../../../db/firebase";
import { coins } from "../../../Services/DatabaseService";

class CommentStore {
  comments = [];
  pageComments = [];
  coinName = "";
  coinNames = [];
  coinId = "";
  id = "";
  indexFrom = 0;
  indexTo = 5;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
    this.getCoinNames();
    reaction(
      //kada imam id, setaj komentare i ime
      () => this.id,
      () => {
        if (this.id.length !== 0) {
          this.getComments(this.id);
          this.getCoinName(this.id);
        }
      }
    );
    reaction(
      () => this.comments,
      (curr, prev) => {
        if (!this.pageComments.length) {
          this.setPageComments(5, 0);
        }
        if (prev.length > curr.length && curr.length % 5 !== 0) {
          this.setPageComments(this.indexTo, this.indexFrom);
        }
        if (prev.length < curr.length && prev.length !== 0) {
          this.setPageComments(this.indexTo, this.indexFrom);
        }
        if (curr !== prev && curr.length === prev.length) {
          this.setPageComments(this.indexTo, this.indexFrom);
        }
      }
    );
  }
  setIndex(iF, iT) {
    this.indexTo = iT;
    this.indexFrom = iF;
  }
  setId(id) {
    runInAction(() => (this.id = id));
  }
  getComments(id) {
    onSnapshot(
      query(collection(db, "Comments"), where("coinId", "==", id)),
      (doc) => {
        const comments = doc.docs.map((item) => ({
          ...item.data(),
          id: item.id,
        }));
        runInAction(() => {
          this.comments = comments;
        });
      }
    );
  }
  setEditAction() {
    this.editAction = false;
  }
  async getCoinName(id) {
    let getName = await coins.getAll();
    const name = getName.docs.map((item) => {
      if (item.id === id) {
        return item.data().name;
      }
      return;
    });
    runInAction(() => (this.coinName = name));
  }
  async getCoinNames() {
    let getNames = await coins.getAll();
    let names = getNames.docs.map((item) => ({
      name: item.data().name,
      id: item.id,
    }));
    runInAction(() => {
      this.coinNames = names;
    });
  }

  setPageComments(iT, iF) {
    let indexTo = iT;
    let indexFrom = iF;
    const pageComments = [];
    if (indexTo > this.comments.length) {
      for (indexFrom; this.comments.length > indexFrom; indexFrom++) {
        pageComments.push(this.comments[indexFrom]);
      }
      this.pageComments = pageComments;
    } else {
      for (indexFrom; indexTo > indexFrom; indexFrom++) {
        pageComments.push(this.comments[indexFrom]);
      }
      this.pageComments = pageComments;
    }
  }
}

export default CommentStore;

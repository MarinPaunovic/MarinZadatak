import {
  query,
  getDocs,
  collection,
  where,
  onSnapshot,
} from "firebase/firestore";
import { makeAutoObservable, reaction, runInAction } from "mobx";
import { db } from "../../../db/firebase";

class CommentStore {
  comments = [];
  pageComments = [];
  coinName = "";
  coinNames = [];
  coinId = "";
  test = 5;

  constructor(props) {
    makeAutoObservable(this);
    reaction(
      () => props.stores.page.pageNumber,
      () =>
        this.setPageComments(
          props.stores.page.indexTo,
          props.stores.page.indexFrom
        )
    );
    reaction(
      () => props.stores.page.pages.length,
      (a, b) => {
        if (b > a) {
          this.setPageComments(
            props.stores.page.indexTo - 5,
            props.stores.page.indexFrom - 5
          );
          props.stores.page.setPageNumber(props.stores.page.pageNumber - 1);
        }
      }
    );
    reaction(
      () => this.comments,
      () =>
        this.setPageComments(
          props.stores.page.indexTo,
          props.stores.page.indexFrom
        )
    );

    this.getComments(props.id.commentId);
    this.getCoinNames();
    this.getCoinName(props.id.commentId);
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
          if (!this.pageComments.length) {
            this.setPageComments(5, 0);
          }
        });
      }
    );
  }
  setEditAction() {
    this.editAction = false;
  }
  getCoinName(id) {
    getDocs(query(collection(db, "Crypto"))).then((value) => {
      const test = [];
      value.docs.map((item) => {
        if (item.id === id) {
          test.push(item.data().name);
        }
        return null;
      });
      runInAction(() => {
        this.coinName = test;
      });
    });
  }
  getCoinNames() {
    getDocs(query(collection(db, "Crypto"))).then((value) => {
      const test = value.docs.map((item) => ({
        name: item.data().name,
        id: item.id,
      }));
      runInAction(() => {
        this.coinNames = test;
      });
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

import {
  query,
  getDocs,
  collection,
  where,
  onSnapshot,
} from "firebase/firestore";
import { makeAutoObservable, runInAction } from "mobx";
import PaginationStore from "../../../Components/Pagination/PaginationStore";
import { db } from "../../../db/firebase";

class CommentStore {
  comments = [];
  pageComments = [];
  coinName = "";
  coinNames = [];
  coinId = "";

  constructor() {
    makeAutoObservable(this);
    this.comments = "";
    this.pageComments = "";
    this.coinNames = "";
    this.coinName = "";
    this.coinId = "";
  }
  getComments(id) {
    this.coinId = id;
    onSnapshot(
      query(collection(db, "Comments"), where("coinId", "==", id)),
      (doc) => {
        const comments = doc.docs.map((item) => ({
          ...item.data(),
          id: item.id,
        }));
        runInAction(() => (this.comments = comments));
        this.setPageComments();
      }
    );
  }
  setComments(comment) {
    this.comments = comment;
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

  setCoinName(name) {
    this.coinName = name;
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
  setCoinNames(name) {
    this.coinNames = name;
  }
  setPageComments() {
    let indexTo = PaginationStore.indexTo;
    let indexFrom = PaginationStore.indexFrom;
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

export default new CommentStore();

import { query, getDocs, collection, where, onSnapshot } from "firebase/firestore";
import { makeAutoObservable, runInAction } from "mobx";
import { db } from "../../../db/firebase";

class CommentStore {
  comments = [];
  coinName = "";
  coinNames = [];
  coinId = [];

  constructor() {
    makeAutoObservable(this);
  }

  getComments(id) {
    onSnapshot(query(collection(db, "Comments"), where("coinId", "==", id)), (doc) => {
      const comments = doc.docs.map((item) => ({
        ...item.data(),
        id: item.id,
      }));
      runInAction(() => (this.comments = comments));
    });
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
      const test = value.docs.map((item) => ({ name: item.data().name, id: item.id }));
      runInAction(() => {
        this.coinNames = test;
      });
    });
  }
  setCoinNames(name) {
    this.coinNames = name;
  }
}

export default new CommentStore();

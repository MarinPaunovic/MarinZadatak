import { makeAutoObservable, runInAction } from "mobx";
import { db } from "../../../db/firebase";
import OrderBy from "../../../Pages/Coin/Description/OrderBy";

import {
  onSnapshot,
  collection,
  doc,
  deleteDoc,
  orderBy,
  query,
  where,
  getDocs,
} from "firebase/firestore";
class Crypto {
  list = [];
  searchList = [];
  pageList = [];
  action = false;
  searchValue = true;

  constructor() {
    makeAutoObservable(this);
  }

  setList(newList) {
    this.list = newList;
  }
  setSearchList(newList) {
    this.searchList = newList;
  }

  setPageList(newList) {
    this.pageList = newList;
  }
  getList() {
    onSnapshot(
      query(
        collection(db, "Crypto"),
        orderBy(!OrderBy.order ? "marketCap" : OrderBy.order, OrderBy.counter % 2 ? "desc" : "asc")
      ),
      (doc) => {
        const list = doc.docs.map((item) => ({
          ...item.data(),
          id: item.id,
        }));
        runInAction(() => (this.list = list));
        runInAction(() => (this.action = true));
      }
    );
  }
  setAction() {
    this.action = !this.action;
  }
  setDelete(id) {
    deleteDoc(doc(db, "Crypto", id));
    const collRef = collection(db, "Comments");
    const q = query(collRef, where("coinId", "==", id));
    getDocs(q).then((value) => value.docs.map((item) => deleteDoc(doc(db, "Comments", item.id))));
    this.searchValue = false;
    runInAction(() => (this.action = !this.action));
  }
}

export default new Crypto();

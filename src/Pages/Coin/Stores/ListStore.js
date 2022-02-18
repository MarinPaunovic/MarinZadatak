import { makeAutoObservable, runInAction, reaction } from "mobx";
import { db } from "../../../db/firebase";
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
  counter = 0;

  constructor(props) {
    makeAutoObservable(this);
    this.getList();
    //reakcija na listu
    reaction(
      () => this.list,
      () => this.setPageList(5, 0)
    );
  }
  setBackCounter() {
    this.counter = 0;
  }
  setSearchValue() {
    this.searchValue = true;
  }
  setList(newList) {
    this.list = newList;
  }
  setSearchList(newList) {
    this.searchList = newList;
  }

  setOrder(orderBy) {
    this.counter = this.counter + 1;
    this.getList(orderBy, this.counter);
  }

  setPageList(iT, iF) {
    let indexFrom = iF;
    let indexTo = iT;
    const newList = [];
    if (indexTo > this.list.length) {
      for (indexFrom; this.list.length > indexFrom; indexFrom++) {
        if (this.list[indexFrom]) {
          newList.push({
            name: this.list[indexFrom].name,
            tag: this.list[indexFrom].tag,
            price: this.list[indexFrom].price,
            marketCap: this.list[indexFrom].marketCap,
            id: this.list[indexFrom].id,
          });
        } else return;
        this.pageList = newList;
      }
    } else {
      for (indexFrom; indexTo > indexFrom; indexFrom++) {
        if (this.list[indexFrom]) {
          newList.push({
            name: this.list[indexFrom].name,
            tag: this.list[indexFrom].tag,
            price: this.list[indexFrom].price,
            marketCap: this.list[indexFrom].marketCap,
            id: this.list[indexFrom].id,
          });
        } else return;
        this.pageList = newList;
      }
    }
  }
  getList(order, orderCounter) {
    onSnapshot(
      query(
        collection(db, "Crypto"),
        orderBy(!order ? "marketCap" : order, orderCounter % 2 ? "desc" : "asc")
      ),
      (doc) => {
        const list = doc.docs.map((item) => ({
          ...item.data(),
          id: item.id,
        }));
        runInAction(() => {
          this.list = list;
        });
      }
    );
  }
  setDelete(id) {
    deleteDoc(doc(db, "Crypto", id));
    const collRef = collection(db, "Comments");
    const q = query(collRef, where("coinId", "==", id));
    getDocs(q).then((value) =>
      value.docs.map((item) => deleteDoc(doc(db, "Comments", item.id)))
    );
    this.searchValue = false;
  }
}
export default Crypto;

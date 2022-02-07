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

  constructor(props) {
    makeAutoObservable(this);
    this.getList();
    reaction(
      () => props.page.pages.length,
      (a, b) => {
        if (b > a) {
          console.log("stranica manje");
          this.setPageList(props.page.indexTo - 5, props.page.indexFrom - 5);
          props.page.setPageNumber(props.page.pageNumber - 1);
        }
      }
    );
    reaction(
      () => props.page.pageNumber,
      () => this.setPageList(props.page.indexTo, props.page.indexFrom)
    );
    reaction(
      () => props.order.counter,
      () =>
        this.getList(
          props.page.indexTo,
          props.page.indexFrom,
          props.order.order,
          props.order.counter
        )
    );
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
  getList(iT, iF, order, orderCounter) {
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
          if (!this.pageList.length) {
            this.setPageList(5, 0);
          }
          if (order && orderCounter) {
            this.setPageList(iT, iF);
          }
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

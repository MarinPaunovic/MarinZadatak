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

    //reakcija na listu
    reaction(
      () => this.list,
      (a, b) => {
        //pri promjeni liste ako nema pages, napravi
        if (!props.page.pages.length) {
          //setanje paginacije
          props.page.setIndex();
          props.page.getPages(this.list.length);
        }
        if (a !== b) {
          if (a.length > b.length && b.length !== 0) {
            //kada je list item veci, dodajem item i setaj mi novu listu, nove pages , novu pageListu
            props.page.getPages(this.list.length);
            this.getList(props.order.order, props.order.counter);
            this.setPageList(props.page.indexTo, props.page.indexFrom);
          }
          if (a.length < b.length) {
            //kada se briše iz liste, setaj novu listu i page listu(refresh da ostane isto)
            props.page.getPages(this.list.length);
            this.getList(props.order.order, props.order.counter);
            this.setPageList(props.page.indexTo, props.page.indexFrom);
          }

          if (!props.crypto.pageList.length) {
            //setaj mi na promjenu liste pageList ako nema vec pageListe(pocetna)
            this.setPageList(props.page.indexTo, props.page.indexFrom);
          }
          if (a.length === b.length) {
            //set pageListe za edit/order
            this.setPageList(props.page.indexTo, props.page.indexFrom);
          }
        }
      }
    );
    reaction(
      () => props.order.counter,
      () => {
        if (props.order.counter == 0) {
          //counter JE nula i ide default list
          this.getList(props.order.order, props.order.counter);
        } else {
          //counter NIJE nula i bit ce order
          this.getList(props.order.order, props.order.counter);
        }
      }
    );
    //reakcija na pageNumber
    reaction(
      () => props.page.pageNumber,
      () => {
        //kada se mjenja page number, promjeni i pageListu za taj number
        this.setPageList(props.page.indexTo, props.page.indexFrom);
      }
    );
    reaction(
      () => props.page.pages.length,
      (a, b) => {
        if (a < b) {
          if (
            //kada na zadnjoj stranici nakon brisanja treba maknuti stranicu
            props.page.pageNumber !== 1 &&
            props.page.pageNumber - 1 === props.page.pages.length
          ) {
            props.page.setPageNumber(props.page.pageNumber - 1);
          }
        }
      }
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

import { makeAutoObservable, runInAction } from "mobx";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../db/firebase";

class EditStore {
  itemId = "";
  name = "";
  tag = "";
  price = "";
  marketCap = "";
  editCompleted = false;
  editFailed = false;
  action = false;

  constructor(props) {
    makeAutoObservable(this);
    this.id = props;
    this.getEdit(this.id);
  }
  setEditCompleted() {
    this.editCompleted = false;
  }
  setEditFailed() {
    this.editFailed = false;
  }

  setItemId(newId) {
    this.itemId = newId;
  }
  setName(name) {
    this.name = name;
  }
  setTag(tag) {
    this.tag = tag;
  }
  setPrice(price) {
    this.price = price;
  }
  setMarketCap(marketCap) {
    this.marketCap = marketCap;
  }
  setAction() {
    this.action = false;
  }
  getEdit(id) {
    getDoc(doc(db, "Crypto", id)).then((value) => {
      this.setName(value.data().name);
      this.setTag(value.data().tag);
      this.setPrice(value.data().price);
      this.setMarketCap(value.data().marketCap);
    });
    runInAction(() => (this.action = true));
  }
  setEdit(id) {
    if (!this.name || !this.tag) {
      setTimeout(() => {
        runInAction(() => (this.editFailed = true));
      }, 200);
      setTimeout(() => {
        runInAction(() => (this.editFailed = false));
      }, 2000);
    } else {
      if (isNaN(this.price, this.marketCap)) {
        alert("Price and  Marketcap must be a number");
      } else {
        updateDoc(doc(db, "Crypto", id), {
          name: this.name,
          tag: this.tag,
          price: +this.price,
          marketCap: +this.marketCap,
        });
        setTimeout(() => {
          runInAction(() => (this.editCompleted = true));
        }, 200);
        setTimeout(() => {
          runInAction(() => (this.editCompleted = false));
        }, 2000);
      }
    }
  }
}

export default EditStore;

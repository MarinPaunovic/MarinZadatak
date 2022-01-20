import { makeAutoObservable } from "mobx";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../db/firebase";
class EditItemId {
  itemId = "";
  name = "";
  tag = "";
  price = null;
  marketCap = null;

  constructor() {
    makeAutoObservable(this);
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
  getEdit(id) {
    getDoc(doc(db, "Crypto", id)).then((value) => {
      console.log(value.data());
      this.setName(value.data().name);
      this.setTag(value.data().tag);
      this.setPrice(value.data().price);
      this.setMarketCap(value.data().marketCap);
    });
  }
  setEdit(id) {
    if (isNaN(this.price, this.marketCap)) {
      alert("Price and  Marketcap must be a number");
    } else {
      updateDoc(doc(db, "Crypto", id), {
        name: this.name,
        tag: this.tag,
        price: this.price,
        marketCap: this.marketCap,
      });
    }
  }
}

export default new EditItemId();

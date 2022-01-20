import { makeAutoObservable } from "mobx";
import AddStore from "./AddStore";
import Timer from "./Timer";
import { db } from "../../../db/firebase";
import { collection, addDoc } from "firebase/firestore";

class AddNewList {
  name = "";
  tag = "";
  price = "";
  marketCap = "";
  conditionPrice = Boolean;
  conditionMarketCap = Boolean;
  inputs = Boolean;
  addDisplay = false;
  failDisplay = false;

  constructor() {
    makeAutoObservable(this);
  }
  handleConditionPrice(bool) {
    this.conditionPrice = bool;
  }
  handleConditionMarketCap(bool) {
    this.conditionMarketCap = bool;
  }
  handleInputs(bool) {
    this.inputs = bool;
  }
  handleFailDisplay(bool) {
    this.failDisplay = bool;
  }
  handleAddDisplay(bool) {
    this.addDisplay = bool;
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
  setSubmit(e) {
    e.preventDefault();
    if (this.name && this.tag && this.price && this.marketCap) {
      if (!isNaN(this.price) && !isNaN(this.marketCap)) {
        addDoc(collection(db, "Crypto"), {
          name: this.name,
          tag: this.tag,
          price: this.price,
          marketCap: this.marketCap,
        });
        this.setName("");
        this.setTag("");
        this.setPrice("");
        this.setMarketCap("");
        this.inputs = true;
        let id1 = setTimeout(function () {
          AddStore.handleAddDisplay(true);
        }, 200);
        Timer.setTestId1(id1);
        let id2 = setTimeout(function () {
          AddStore.handleAddDisplay(false);
        }, 2000);
        Timer.setTestId2(id2);
      } else {
        if (isNaN(this.price)) {
          this.conditionPrice = false;
          alert("Price field must be a NUMBER");
        } else {
          this.conditionPrice = true;
        }
        if (isNaN(this.marketCap)) {
          this.conditionMarketCap = false;
          alert("Marketcap field must be a NUMBER");
        } else {
          this.conditionMarketCap = true;
        }
      }
    } else {
      let id3 = setTimeout(function () {
        AddStore.handleFailDisplay(true);
      }, 200);
      Timer.setTestId3(id3);
      let id4 = setTimeout(function () {
        AddStore.handleFailDisplay(false);
      }, 2000);
      Timer.setTestId4(id4);
    }
  }
}

export default new AddNewList();

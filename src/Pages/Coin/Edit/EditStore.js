import { makeAutoObservable, runInAction } from "mobx";
import { coins } from "../../../Services/DatabaseService";
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
  async getEdit(id) {
    const edit = await coins.getOne(id);
    this.setName(edit.data().name);
    this.setTag(edit.data().tag);
    this.setPrice(edit.data().price);
    this.setMarketCap(edit.data().marketCap);
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
        let data = {
          name: this.name,
          tag: this.tag,
          price: +this.price,
          marketCap: +this.marketCap,
        };
        coins.setEdit(id, data);
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

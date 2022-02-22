import { makeAutoObservable, runInAction, reaction } from "mobx";
import { db } from "../../../db/firebase";
import { onSnapshot, collection, orderBy, query } from "firebase/firestore";
import { coins } from "../../../Services/DatabaseService";
class Crypto {
  list = [];
  searchList = [];
  pageList = [];
  action = false;
  searchValue = true;
  counter = 0;
  orderBy = undefined;
  indexTo = 5;
  indexFrom = 0;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
    this.getList();
    reaction(
      () => this.list,
      (curr, prev) => {
        if (prev.length === 0 && this.pageList.length === 0) {
          this.setPageList(5, 0);
        }
        if (prev.length > curr.length && this.orderBy) {
          this.counter = 0;
          this.setOrder(this.orderBy);
        } else this.setPageList(this.indexTo, this.indexFrom);
      }
    );
  }
  setIndex(iF, iT) {
    this.indexTo = iT;
    this.indexFrom = iF;
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
    if (!this.orderBy) {
      this.orderBy = orderBy;
    }
    if (this.orderBy && this.orderBy !== orderBy) {
      this.counter = 0;
      this.orderBy = orderBy;
    }
    switch (this.orderBy) {
      case "name":
        if (this.counter % 2 === 0) {
          this.counter = this.counter + 1;
          this.list.sort((a, b) => {
            let nameA = a.name.toUpperCase();
            let nameB = b.name.toUpperCase();
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
            return 0;
          });
          this.setPageList(this.indexTo, this.indexFrom);
        } else {
          this.counter = this.counter + 1;
          this.list.sort((a, b) => {
            let nameA = a.name.toUpperCase();
            let nameB = b.name.toUpperCase();
            if (nameA < nameB) {
              return 1;
            }
            if (nameA > nameB) {
              return -1;
            }
            return 0;
          });
          this.setPageList(this.indexTo, this.indexFrom);
        }
        break;
      case "tag":
        if (this.counter % 2 === 0) {
          this.counter = this.counter + 1;
          this.list.sort((a, b) => {
            let tagA = a.tag.toUpperCase();
            let tagB = b.tag.toUpperCase();
            if (tagA < tagB) {
              return -1;
            }
            if (tagA > tagB) {
              return 1;
            }
            return 0;
          });
          this.setPageList(this.indexTo, this.indexFrom);
        } else {
          this.counter = this.counter + 1;
          this.list.sort((a, b) => {
            let tagA = a.tag.toUpperCase();
            let tagB = b.tag.toUpperCase();
            if (tagA < tagB) {
              return 1;
            }
            if (tagA > tagB) {
              return -1;
            }
            return 0;
          });
          this.setPageList(this.indexTo, this.indexFrom);
        }
        break;
      case "price":
        if (this.counter % 2 === 0) {
          this.counter = this.counter + 1;
          this.list.sort((a, b) => {
            let priceA = a.price;
            let priceB = b.price;
            if (priceA < priceB) {
              return -1;
            }
            if (priceA > priceB) {
              return 1;
            }
            return 0;
          });
          this.setPageList(this.indexTo, this.indexFrom);
        } else {
          this.counter = this.counter + 1;
          this.list.sort((a, b) => {
            let priceA = a.price;
            let priceB = b.price;
            if (priceA < priceB) {
              return 1;
            }
            if (priceA > priceB) {
              return -1;
            }
            return 0;
          });
          this.setPageList(this.indexTo, this.indexFrom);
        }
        break;
      case "marketCap":
        if (this.counter % 2 === 0) {
          this.counter = this.counter + 1;
          this.list.sort((a, b) => {
            let marketCapA = a.marketCap;
            let marketCapB = b.marketCap;
            if (marketCapA < marketCapB) {
              return -1;
            }
            if (marketCapA > marketCapB) {
              return 1;
            }
            return 0;
          });
          this.setPageList(this.indexTo, this.indexFrom);
        } else {
          this.counter = this.counter + 1;
          this.list.sort((a, b) => {
            let marketCapA = a.marketCap;
            let marketCapB = b.marketCap;
            if (marketCapA < marketCapB) {
              return 1;
            }
            if (marketCapA > marketCapB) {
              return -1;
            }
            return 0;
          });
          this.setPageList(this.indexTo, this.indexFrom);
        }
        break;
    }
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

  getList() {
    onSnapshot(
      query(collection(db, "Crypto"), orderBy("marketCap", "desc")),
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
    coins.setDelete(id, "Comments", "coinId");
    this.searchList = this.searchList.filter((value) => value.id !== id);
  }
}
export default Crypto;

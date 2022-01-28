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
import PaginationStore from "../../../Components/Pagination/PaginationStore";

class Crypto {
  list = [];
  searchList = [];
  pageList = [];
  action = false;
  searchValue = true;

  constructor() {
    makeAutoObservable(this);
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

  setPageList() {
    let indexFrom = PaginationStore.indexFrom;
    let indexTo = PaginationStore.indexTo;
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
      query(
        collection(db, "Crypto"),
        orderBy(
          !OrderBy.order ? "marketCap" : OrderBy.order,
          OrderBy.counter % 2 ? "desc" : "asc"
        )
      ),
      (doc) => {
        const list = doc.docs.map((item) => ({
          ...item.data(),
          id: item.id,
        }));
        runInAction(() => {
          this.list = list;
          this.setPageList();
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
export default new Crypto();

// import { makeAutoObservable, runInAction } from "mobx";
// import { db } from "../../../db/firebase";
// import OrderBy from "../../../Pages/Coin/Description/OrderBy";
// import {
//   onSnapshot,
//   collection,
//   doc,
//   deleteDoc,
//   orderBy,
//   query,
//   where,
//   getDocs,
// } from "firebase/firestore";
// import PaginationStore from "../../../Components/Pagination/PaginationStore";
// import { inject } from "mobx-react";
// import Page from "../../../Components/Pagination/PaginationStore";

// class Crypto {
//   list = [];
//   searchList = [];
//   pageList = [];
//   action = false;
//   searchValue = true;
//   test = 1;

//   constructor(props) {
//     console.log(props);
//     makeAutoObservable(this);
//     this.getList();
//   }
//   setTest(test) {
//     this.test = test;
//   }
//   setSearchValue() {
//     this.searchValue = true;
//   }
//   setList(newList) {
//     this.list = newList;
//   }
//   setSearchList(newList) {
//     this.searchList = newList;
//   }

//   setPageList(iF, iT) {
//     let indexFrom = iF;
//     let indexTo = iT;
//     const newList = [];
//     if (indexTo > this.list.length) {
//       for (indexFrom; this.list.length > indexFrom; indexFrom++) {
//         if (this.list[indexFrom]) {
//           newList.push({
//             name: this.list[indexFrom].name,
//             tag: this.list[indexFrom].tag,
//             price: this.list[indexFrom].price,
//             marketCap: this.list[indexFrom].marketCap,
//             id: this.list[indexFrom].id,
//           });
//         } else return;
//         this.pageList = newList;
//       }
//     } else {
//       for (indexFrom; indexTo > indexFrom; indexFrom++) {
//         if (this.list[indexFrom]) {
//           newList.push({
//             name: this.list[indexFrom].name,
//             tag: this.list[indexFrom].tag,
//             price: this.list[indexFrom].price,
//             marketCap: this.list[indexFrom].marketCap,
//             id: this.list[indexFrom].id,
//           });
//         } else return;
//         this.pageList = newList;
//       }
//     }
//   }
//   getList() {
//     onSnapshot(
//       query(
//         collection(db, "Crypto"),
//         orderBy(
//           !OrderBy.order ? "marketCap" : OrderBy.order,
//           OrderBy.counter % 2 ? "desc" : "asc"
//         )
//       ),
//       (doc) => {
//         const list = doc.docs.map((item) => ({
//           ...item.data(),
//           id: item.id,
//         }));
//         runInAction(() => {
//           this.list = list;
//         });
//       }
//     );
//   }
//   setDelete(id) {
//     deleteDoc(doc(db, "Crypto", id));
//     const collRef = collection(db, "Comments");
//     const q = query(collRef, where("coinId", "==", id));
//     getDocs(q).then((value) =>
//       value.docs.map((item) => deleteDoc(doc(db, "Comments", item.id)))
//     );
//     this.searchValue = false;
//   }
// }
// export default Crypto;

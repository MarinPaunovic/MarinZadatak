import { makeAutoObservable } from "mobx";
import Crypto from "../List/ListStore";

class SearchStore {
  item = "";
  searchList = [];

  constructor() {
    makeAutoObservable(this);
  }
  // setList(props) {
  //   console.log(props);
  // }

  setItem(searchItem) {
    this.item = searchItem;
  }
  setSearch(item, list) {
    this.setItem(item);
    let newList = [];
    let test = 0;
    list.filter((value) =>
      value.name.toLowerCase().includes(item.toLocaleLowerCase()) ||
      value.tag.toLowerCase().includes(item.toLocaleLowerCase())
        ? (newList.push({
            name: value.name,
            tag: value.tag,
            price: value.price,
            marketCap: value.marketCap,
            id: value.id,
          }),
          (this.searchList = newList),
          test++)
        : test === 0 && (this.searchList = newList)
    );
  }
}

export default SearchStore;

// import { makeAutoObservable } from "mobx";
// import Crypto from "../List/ListStore";

// class SearchStore {
//   item = "";

//   constructor() {
//     makeAutoObservable(this);
//   }
//   setItem(searchItem) {
//     this.item = searchItem;
//   }
//   setSearch(item) {
//     this.setItem(item);
//     let newList = [];
//     let test = 0;
//     Crypto.list.filter((value) =>
//       value.name.toLowerCase().includes(item.toLocaleLowerCase()) ||
//       value.tag.toLowerCase().includes(item.toLocaleLowerCase())
//         ? (newList.push({
//             name: value.name,
//             tag: value.tag,
//             price: value.price,
//             marketCap: value.marketCap,
//             id: value.id,
//           }),
//           Crypto.setSearchList(newList),
//           test++)
//         : test === 0 && Crypto.setSearchList(newList)
//     );
//   }
// }

// export default new SearchStore();

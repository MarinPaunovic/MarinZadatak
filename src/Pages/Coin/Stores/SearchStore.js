import { makeAutoObservable } from "mobx";

class SearchStore {
  item = "";

  constructor(props) {
    makeAutoObservable(this);
    this.crypto = props.crypto;
  }

  setItem(searchItem) {
    this.item = searchItem;
  }
  setSearch(item) {
    this.setItem(item);
    let newList = [];
    let test = 0;
    this.crypto.list.filter((value) =>
      value.name.toLowerCase().includes(item.toLocaleLowerCase()) ||
      value.tag.toLowerCase().includes(item.toLocaleLowerCase())
        ? (newList.push({
            name: value.name,
            tag: value.tag,
            price: value.price,
            marketCap: value.marketCap,
            id: value.id,
          }),
          (this.crypto.searchList = newList),
          test++)
        : test === 0 && (this.crypto.searchList = newList)
    );
  }
}

export default SearchStore;

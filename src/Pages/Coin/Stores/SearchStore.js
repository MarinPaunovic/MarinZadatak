import { makeAutoObservable, reaction } from "mobx";

class SearchStore {
  item = "";
  searchList = [];

  constructor(props) {
    makeAutoObservable(this);
    reaction(
      () => this.item,
      () => {
        if (this.item !== "") {
          props.page.getPages(0);
        } else props.page.getPages(props.crypto.list.length);
      }
    );
  }

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

import Crypto from "../List/List";
import { observer } from "mobx-react";
import Search from "./Search";
import EditItemId from "../Edit/Edit";

export const SearchItem = observer(() => {
  const handleChange = (sValue) => {
    Search.setItem(sValue);
    let newList = [];
    let test = 0;
    Crypto.list.filter((value) =>
      value.name.toLowerCase().includes(Search.item.toLocaleLowerCase()) ||
      value.tag.toLowerCase().includes(Search.item.toLocaleLowerCase())
        ? (newList.push({
            name: value.name,
            tag: value.tag,
            price: value.price,
            marketCap: value.marketCap,
            id: value.id,
          }),
          Crypto.setSearchList(newList),
          test++)
        : test === 0 && Crypto.setSearchList(newList)
    );
    EditItemId.setItemId("");
  };

  return (
    <div className="SearchBar" id="SearchBarId">
      <input
        type="text"
        id="SearchBarId1"
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Search.."
      ></input>
      <button type="submit" className="searchButton">
        <i className="material-icons">search</i>
      </button>
    </div>
  );
});

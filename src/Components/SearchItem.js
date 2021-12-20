import Crypto from "../Classes/List";
import { observer } from "mobx-react";
import Search from "../Classes/Search";
import EditItemId from "../Classes/Edit";

export const SearchItem = observer(() => {
  const handleChange = (sValue) => {
    Search.setItem(sValue);
    let newList = [];
    let test = 0;
    Crypto.List.filter((value) =>
      value.Ime.toLowerCase().includes(Search.item.toLocaleLowerCase()) ||
      value.Kratica.toLowerCase().includes(Search.item.toLocaleLowerCase())
        ? (newList.push({
            Ime: value.Ime,
            Kratica: value.Kratica,
            Price: value.Price,
            MarketCap: value.MarketCap,
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

import { observer } from "mobx-react";
import SearchStore from "./SearchStore";
import Crypto from "../List/ListStore";

export const SearchItem = observer(() => {
  return (
    <div className="SearchBar" id="SearchBarId">
      <input
        type="text"
        value={Crypto.searchValue ? SearchStore.item : ""}
        onChange={(e) => SearchStore.setSearch(e.target.value)}
        placeholder="Search.."
      ></input>
      <button type="submit" className="searchButton">
        <i className="material-icons">search</i>
      </button>
    </div>
  );
});

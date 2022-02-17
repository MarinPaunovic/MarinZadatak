import { observer } from "mobx-react";
import React from "react";

class SearchItem extends React.Component {
  render() {
    const search = this.props.search;
    const crypto = this.props.crypto;
    return (
      <div className="SearchBar" id="SearchBarId">
        <input
          type="text"
          value={search.item}
          onChange={(e) => {
            search.setSearch(e.target.value, crypto.list);
          }}
          placeholder="Search.."
        ></input>
        <button type="submit" className="searchButton">
          <i className="material-icons">search</i>
        </button>
      </div>
    );
  }
}
export default observer(SearchItem);

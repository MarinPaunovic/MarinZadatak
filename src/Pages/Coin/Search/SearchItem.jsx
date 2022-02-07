import { inject, observer } from "mobx-react";
import React from "react";

class SearchItem extends React.Component {
  render() {
    const search = this.props.stores.search;
    return (
      <div className="SearchBar" id="SearchBarId">
        <input
          type="text"
          value={search.item}
          onChange={(e) => {
            search.setSearch(e.target.value, this.props.stores.crypto.list);
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
export default inject(({ stores }) => ({
  stores: stores,
}))(observer(SearchItem));

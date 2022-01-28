// import { inject, observer } from "mobx-react";
// import React from "react";

// class SearchItem extends React.Component {
//   render() {
//     const search = this.props.search;
//     // const crypto = this.props.crypto;
//     return (
//       <div className="SearchBar" id="SearchBarId">
//         <input
//           type="text"
//           value={crypto.searchValue ? search.item : ""}
//           onChange={() => {
//             // search.setSearch(e.target.value);
//             crypto.setTest();
//           }}
//           placeholder="Search.."
//         ></input>
//         <button type="submit" className="searchButton">
//           <i className="material-icons">search</i>
//         </button>
//       </div>
//     );
//   }
// }
// export default inject(() => ({}))(observer(SearchItem));

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

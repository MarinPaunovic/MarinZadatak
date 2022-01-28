import { SearchItem } from "../Pages/Coin/Search/SearchItem";
import React from "react";
import { ListItem } from "../Pages/Coin/List/ListItem";
import { Pagination } from "../Components/Pagination/Pagination";
import { Description } from "../Pages/Coin/Description/Description";
import { observer } from "mobx-react";
import Crypto from "../Pages/Coin/List/ListStore";

const Homepage = observer(() => {
  return (
    <div className="Homepage">
      <SearchItem />
      <Description />
      <ListItem />
      {Crypto.list != "" && <Pagination length={Crypto.list.length} />}
    </div>
  );
});

export default Homepage;

// import { inject, Provider } from "mobx-react";
// import React from "react";
// import { observer } from "mobx-react";
// import ListItem from "../Pages/Coin/List/ListItem";
// import SearchItem from "../Pages/Coin/Search/SearchItem";
// import Crypto from "../Pages/Coin/List/ListStore";
// import SearchStore from "../Pages/Coin/Search/SearchStore";
// import { Description } from "../Pages/Coin/Description/Description";
// import Pagination from "../Components/Pagination/Pagination";
// import PaginationStore from "../Components/Pagination/PaginationStore";
// import { runInAction } from "mobx";
// import Page from "../Components/Pagination/PaginationStore";

// class Homepage extends React.Component {
//   render() {
//     const stores = this.props;
//     return (
//       <Provider stores={stores}>
//         <SearchItem />
//         <Description />
//         <ListItem />
//         <Pagination />
//       </Provider>
//     );
//   }
// }

// export default inject(() => ({
//   crypto: new Crypto(new Page()),
//   search: new SearchStore(),
//   page: new Page(),
// }))(observer(Homepage));

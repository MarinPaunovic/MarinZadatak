import { Provider } from "mobx-react";
import React from "react";
import { observer } from "mobx-react";
import ListItem from "./List/ListItem";
import SearchItem from "./Search/SearchItem";
import Description from "./Description/Description";
import Pagination from "../../Components/Pagination/Pagination";
import ListRootStore from "./Stores/rootStore";

class Homepage extends React.Component {
  constructor() {
    super();
    this.stores = new ListRootStore();
  }
  render() {
    return (
      <>
        <Provider stores={this.stores}>
          <SearchItem />
          <Description order={this.stores.order} />
          <ListItem />
          <Pagination
            length={
              !this.stores.search.item ? this.stores.crypto.list.length : 0
            }
          />
        </Provider>
      </>
    );
  }
}

export default observer(Homepage);

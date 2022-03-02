import React from "react";
import { observer } from "mobx-react";
import ListItem from "./List/ListItem";
import SearchItem from "./Search/SearchItem";
import Description from "./Description/Description";
import Pagination from "../../../Components/Pagination/Pagination";
import { inject } from "mobx-react";
class Homepage extends React.Component {
  render() {
    const stores = this.props.stores;
    return (
      <>
        <SearchItem search={stores.search} crypto={stores.crypto} />
        <Description order={stores.order} onClick={stores.crypto.setOrder} />
        <ListItem stores={stores} />
        {stores.crypto.list.length !== 0 && !stores.search.item && (
          <Pagination
            onPageChange={stores.crypto.setPageList}
            index={stores.crypto.setIndex}
            length={stores.crypto.list.length}
          />
        )}
      </>
    );
  }
}

export default inject((provider) => ({
  stores: new provider.coinStore(),
}))(observer(Homepage));

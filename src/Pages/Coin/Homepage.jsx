import React from "react";
import { observer } from "mobx-react";
import ListItem from "./List/ListItem";
import SearchItem from "./Search/SearchItem";
import Description from "./Description/Description";
import Pagination from "../../Components/Pagination/Pagination";
import { inject } from "mobx-react";
class Homepage extends React.Component {
  componentWillUnmount() {
    this.props.stores.coinStore.page.setPageNumber(1);
    this.props.stores.coinStore.order.setOrder("");
    this.props.stores.coinStore.getComment.setCoinId();
  }
  render() {
    const stores = this.props.stores.coinStore;
    return (
      <>
        <SearchItem search={stores.search} crypto={stores.crypto} />
        <Description order={stores.order} />
        <ListItem stores={stores} />
        <Pagination
          page={stores.page}
          length={!stores.search.item ? stores.crypto.list.length : 0}
        />
      </>
    );
  }
}

export default inject((provider) => ({
  stores: provider,
}))(observer(Homepage));

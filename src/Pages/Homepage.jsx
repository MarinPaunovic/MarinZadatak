import { inject, Provider } from "mobx-react";
import React from "react";
import { observer } from "mobx-react";
import ListItem from "../Pages/Coin/List/ListItem";
import SearchItem from "../Pages/Coin/Search/SearchItem";
import Crypto from "../Pages/Coin/List/ListStore";
import SearchStore from "../Pages/Coin/Search/SearchStore";
import Description from "../Pages/Coin/Description/Description";
import Pagination from "../Components/Pagination/Pagination";
import Page from "../Components/Pagination/PaginationStore";
import OrderBy from "./Coin/Description/OrderBy";
import GetCommentStore from "./Coin/List/GetComments/GetCommentsStore";
import EditStore from "./Coin/Edit/EditStore";

class Homepage extends React.Component {
  render() {
    return (
      <>
        <Provider stores={this.props}>
          <SearchItem />
          <Description order={this.props.order} />
          <ListItem
            pageNumber={this.props.page.pageNumber}
            list={this.props.crypto.list.length}
            counter={this.props.order.counter}
            indexFrom={this.props.page.indexFrom}
            indexTo={this.props.page.indexTo}
          />
          <Pagination
            length={!this.props.search.item ? this.props.crypto.list.length : 0}
          />
        </Provider>
      </>
    );
  }
}

export default inject(() => ({
  crypto: new Crypto(),
  search: new SearchStore(),
  page: new Page(),
  order: new OrderBy(),
  getComment: new GetCommentStore(),
}))(observer(Homepage));

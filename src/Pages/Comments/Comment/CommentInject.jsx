import { inject, Provider, observer } from "mobx-react";
import commentsStores from "../Stores/rootCommentsStore";
import Comment from "./Comment";
import React from "react";
import Pagination from "../../../Components/Pagination/Pagination";

class CommentInject extends React.Component {
  constructor(props) {
    super(props);
    this.stores = new commentsStores(props.id);
  }
  render() {
    const stores = this.stores;
    const id = this.props.id;
    return (
      <>
        <Provider stores={stores} id={id}>
          <Comment />
          <Pagination length={stores.comments.comments.length} />
        </Provider>
      </>
    );
  }
}
export default observer(CommentInject);

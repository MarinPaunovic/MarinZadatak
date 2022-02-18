import { inject, observer } from "mobx-react";
import Comment from "./Comment";
import React from "react";
import Pagination from "../../../Components/Pagination/Pagination";

class CommentInject extends React.Component {
  render() {
    const stores = this.props.stores;
    const id = this.props.id.commentId;
    return (
      <>
        <Comment stores={stores} id={id} />
        <Pagination
          onPageChange={stores.comments.setPageComments.bind(stores.comments)}
          length={stores.comments.comments.length}
        />
      </>
    );
  }
}
export default inject((provider) => ({
  stores: provider.commentStore,
}))(observer(CommentInject));

import { inject, observer } from "mobx-react";
import Comment from "./Comment";
import React from "react";
import Pagination from "../../../Components/Pagination/Pagination";

class CommentInject extends React.Component {
  render() {
    const store = this.props.store;
    const id = this.props.id.commentId;
    return (
      <>
        <Comment stores={store} id={id} />
        {store.comments.comments.length !== 0 && (
          <Pagination
            index={store.comments.setIndex}
            onPageChange={store.comments.setPageComments}
            length={store.comments.comments.length}
          />
        )}
      </>
    );
  }
}
export default inject((provider) => ({
  store: new provider.commentStore(),
}))(observer(CommentInject));

import { inject, Provider, observer } from "mobx-react";
import CommentStore from "./CommentStore";
import DeleteCommentStore from "../DeleteComments/DeleteCommentStore";
import AddCommentStore from "../AddComments/AddCommentStore";
import EditCommentStore from "../EditComments/EditCommentStore";
import Page from "../../../Components/Pagination/PaginationStore";
import Comment from "./Comment";
import React from "react";
import Pagination from "../../../Components/Pagination/Pagination";

class CommentInject extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Provider stores={this.props}>
        <Comment
          list={this.props.comments.comments.length}
          indexFrom={this.props.page.indexFrom}
          indexTo={this.props.page.indexTo}
        />
        <Pagination
          comments={this.props.comments.comments}
          length={this.props.comments.comments.length}
        />
      </Provider>
    );
  }
}
export default inject(() => ({
  comments: new CommentStore(),
  edit: new EditCommentStore(),
  add: new AddCommentStore(),
  delete: new DeleteCommentStore(),
  page: new Page(),
}))(observer(CommentInject));

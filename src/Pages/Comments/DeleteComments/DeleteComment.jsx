import { inject } from "mobx-react";
import React from "react";
import DeleteCommentStore from "./DeleteCommentStore";

class DeleteComment extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <button
          className="DeleteComment"
          onClick={() => {
            // console.log(this.props.id);
            this.props.delete.setDeleteAction(true);
            this.props.delete.setDeleteId(this.props.id);
          }}
        >
          Delete
        </button>
      </>
    );
  }
}

export default inject()(DeleteComment);

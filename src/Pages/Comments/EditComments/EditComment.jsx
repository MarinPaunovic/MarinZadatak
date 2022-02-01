import { inject } from "mobx-react";
import React from "react";
import EditCommentStore from "./EditCommentStore";

class EditComment extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <button
        onClick={() => this.props.edit.setEditCommentId(this.props.id)}
        className="EditComment"
      >
        edit
      </button>
    );
  }
}

export default inject()(EditComment);

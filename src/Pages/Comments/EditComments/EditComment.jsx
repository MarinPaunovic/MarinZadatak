import React from "react";

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

export default EditComment;

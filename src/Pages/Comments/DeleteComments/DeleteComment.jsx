import React from "react";

class DeleteComment extends React.Component {
  render() {
    return (
      <>
        <button
          className="DeleteComment"
          onClick={() => {
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

export default DeleteComment;

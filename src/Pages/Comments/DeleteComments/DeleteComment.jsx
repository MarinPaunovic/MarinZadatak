import { inject } from "mobx-react";
import React from "react";

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

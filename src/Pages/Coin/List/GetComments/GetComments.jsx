import { Link } from "react-router-dom";
import { inject, observer } from "mobx-react";
import React from "react";

class GetComments extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <Link
          to={`/comments/${this.props.id}`}
          className="GetCommentButton"
          style={
            this.props.id == this.props.store.coinId
              ? { display: "block" }
              : { display: "none" }
          }
        >
          Comment
        </Link>

        <button
          onClick={() => {
            this.props.store.setToggle(this.props.id);
          }}
          className="GetComment"
        >
          <i className="material-icons">
            {this.props.id == this.props.store.coinId
              ? "arrow_drop_up"
              : "arrow_drop_down"}
          </i>
        </button>
      </>
    );
  }
}
export default inject()(observer(GetComments));

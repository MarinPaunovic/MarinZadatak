import { inject, observer } from "mobx-react";
import React from "react";

class Description extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="Description">
        <button onClick={() => this.props.order.setOrder("name")}>Name</button>
        <button onClick={() => this.props.order.setOrder("tag")}>Tag</button>
        <button onClick={() => this.props.order.setOrder("price")}>
          Price
        </button>
        <button onClick={() => this.props.order.setOrder("marketCap")}>
          Market cap
        </button>
      </div>
    );
  }
}
export default inject()(observer(Description));

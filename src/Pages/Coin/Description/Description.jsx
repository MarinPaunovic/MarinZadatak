import { inject, observer } from "mobx-react";
import React from "react";

class Description extends React.Component {
  render() {
    const order = this.props.order;
    return (
      <div className="Description">
        <button onClick={() => order.setOrder("name")}>Name</button>
        <button onClick={() => order.setOrder("tag")}>Tag</button>
        <button onClick={() => order.setOrder("price")}>Price</button>
        <button onClick={() => order.setOrder("marketCap")}>Market cap</button>
      </div>
    );
  }
}
export default observer(Description);

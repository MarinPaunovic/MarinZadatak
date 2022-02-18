import React from "react";

class Description extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = props.onClick;
    this.counter = 0;
  }
  render() {
    const order = this.props.order;

    return (
      <div className="Description">
        <button onClick={() => this.onClick("name", this.counter + 1)}>
          Name
        </button>
        <button onClick={() => this.onClick("tag")}>Tag</button>
        <button onClick={() => this.onClick("price")}>Price</button>
        <button onClick={() => this.onClick("marketCap")}>Market cap</button>
      </div>
    );
  }
}
export default Description;

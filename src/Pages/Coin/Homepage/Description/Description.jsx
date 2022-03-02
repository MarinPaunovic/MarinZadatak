import React from "react";

class Description extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = props.onClick;
  }
  render() {
    return (
      <div className="Description">
        <button onClick={() => this.onClick("name")}>Name</button>
        <button onClick={() => this.onClick("tag")}>Tag</button>
        <button onClick={() => this.onClick("price")}>Price</button>
        <button onClick={() => this.onClick("marketCap")}>Market cap</button>
      </div>
    );
  }
}
export default Description;

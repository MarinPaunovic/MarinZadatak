import { inject, observer } from "mobx-react";
import React from "react";
import EditStore from "./EditStore";

class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.id = props.id.editid;
    this.edit = new EditStore();
    this.edit.getEdit(this.id);
  }
  render() {
    return (
      <>
        {
          <div className="EditWrapper">
            <label>Name</label>
            <input
              value={this.edit.name}
              onChange={(e) => this.edit.setName(e.target.value)}
            ></input>
            <label>Tag</label>
            <input
              value={this.edit.tag}
              onChange={(e) => this.edit.setTag(e.target.value)}
            ></input>
            <label>Price</label>
            <input
              value={this.edit.price}
              onChange={(e) => this.edit.setPrice(e.target.value)}
            ></input>
            <label>Market Cap</label>
            <input
              value={this.edit.marketCap}
              onChange={(e) => this.edit.setMarketCap(e.target.value)}
            ></input>
            <button onClick={() => this.edit.setEdit(this.id)}>Edit</button>
          </div>
        }
        <div
          className={
            this.edit.editCompleted ? "CoinEditCompleted" : "NoDisplay"
          }
        >
          Coin edited!
        </div>
        <div className={this.edit.editFailed ? "CoinEditFailed" : "NoDisplay"}>
          All fields must have corresponding values and cannot be empty!
        </div>
      </>
    );
  }
}
export default observer(Edit);

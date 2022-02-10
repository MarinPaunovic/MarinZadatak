import AddNewList from "./AddStore";
import { inject, observer } from "mobx-react";
import React from "react";
import Timer from "./Timer";
import AddStore from "./AddStore";

class AddItem extends React.Component {
  render() {
    return (
      <div className="AddEdit">
        <label>Name</label>
        <input
          type="text"
          value={
            this.props.addStore.inputs ? this.props.addStore.name : undefined
          }
          onChange={(e) => {
            this.props.addStore.setName(e.target.value);
          }}
          id="nameInput"
        ></input>
        <label> Tag</label>
        <input
          type="text"
          value={
            this.props.addStore.inputs ? this.props.addStore.tag : undefined
          }
          onChange={(e) => {
            this.props.addStore.setTag(e.target.value);
          }}
          id="tagInput"
        ></input>
        <label>Price</label>
        <input
          className={
            this.props.addStore.conditionPrice ? "testBorderB" : "testBorderR"
          }
          type="text"
          value={this.props.addStore.inputs ? this.props.addStore.price : ""}
          onChange={(e) => {
            this.props.addStore.setPrice(e.target.value);
          }}
          id="priceInput"
        ></input>

        <label>Market Cap</label>

        <input
          className={
            this.props.addStore.conditionMarketCap
              ? "testBorderB"
              : "testBorderR"
          }
          type="text"
          value={
            this.props.addStore.inputs ? this.props.addStore.marketCap : ""
          }
          onChange={(e) => {
            this.props.addStore.setMarketCap(e.target.value);
          }}
          id="marketCapInput"
        ></input>

        <div className="Button">
          <form
            onSubmit={(e) =>
              this.props.addStore.setSubmit(
                e,
                this.props.timer,
                this.props.addStore
              )
            }
          >
            <button type="Submit" value="Submit">
              Add
            </button>
          </form>
        </div>

        <div className="AddMessage" id="AddMessage">
          <span
            className="CoinAdded"
            id="CoinAdded"
            style={
              this.props.addStore.addDisplay
                ? { display: "block" }
                : { display: "none" }
            }
          >
            Coin added!
          </span>
          <span
            className="EmptyFields"
            id="EmptyFields"
            style={
              this.props.addStore.failDisplay
                ? { display: "block" }
                : { display: "none" }
            }
          >
            Some fields are empty!
          </span>
        </div>
      </div>
    );
  }
}
export default inject(() => ({
  addStore: new AddNewList(),
  timer: new Timer(),
}))(observer(AddItem));

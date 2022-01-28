import AddNewList from "./AddStore";
import { observer } from "mobx-react";
import React, { useEffect } from "react";
import Timer from "./Timer";
import AddStore from "./AddStore";

export const AddItem = observer(() => {
  useEffect(() => {
    return () => {
      clearTimeout(Timer.timerId1);
      clearTimeout(Timer.timerId2);
      clearTimeout(Timer.timerId3);
      clearTimeout(Timer.timerId4);
      // AddStore.handleConditionMarketCap(true);
      // AddStore.handleConditionPrice(true);
      AddStore.setName("");
      AddStore.setTag("");
      AddStore.setPrice("");
      AddStore.setMarketCap("");
      AddStore.handleAddDisplay(false);
      AddStore.handleFailDisplay(false);
      // AddStore.handleInputs(false);
    };
  }, []);

  return (
    <div className="AddEdit">
      <label>Name</label>
      <input
        type="text"
        value={AddStore.inputs ? AddStore.name : undefined}
        onChange={(e) => {
          AddNewList.setName(e.target.value);
        }}
        id="nameInput"
      ></input>
      <label> Tag</label>
      <input
        type="text"
        value={AddStore.inputs ? AddStore.tag : undefined}
        onChange={(e) => {
          AddNewList.setTag(e.target.value);
        }}
        id="tagInput"
      ></input>
      <label>Price</label>
      <input
        className={AddStore.conditionPrice ? "testBorderB" : "testBorderR"}
        type="text"
        value={AddStore.inputs ? AddStore.price : ""}
        onChange={(e) => {
          AddNewList.setPrice(e.target.value);
        }}
        id="priceInput"
      ></input>

      <label>Market Cap</label>

      <input
        className={AddStore.conditionMarketCap ? "testBorderB" : "testBorderR"}
        type="text"
        value={AddStore.inputs ? AddStore.marketCap : ""}
        onChange={(e) => {
          AddNewList.setMarketCap(e.target.value);
        }}
        id="marketCapInput"
      ></input>

      <div className="Button">
        <form onSubmit={(e) => AddStore.setSubmit(e)}>
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
            AddStore.addDisplay ? { display: "block" } : { display: "none" }
          }
        >
          Coin added!
        </span>
        <span
          className="EmptyFields"
          id="EmptyFields"
          style={
            AddStore.failDisplay ? { display: "block" } : { display: "none" }
          }
        >
          Some fields are empty!
        </span>
      </div>
    </div>
  );
});

import AddNewList from "./AddStore";
import { db } from "../../../db/firebase";
import { collection, addDoc } from "firebase/firestore";
import { observer } from "mobx-react";
import React, { useEffect } from "react";
import Timer from "./Timer";
import Style from "../../../Classes/Style";

export const AddItem = observer(() => {
  const submit = (e) => {
    e.preventDefault();
    if (AddNewList.name && AddNewList.tag && AddNewList.price && AddNewList.marketCap) {
      if (!isNaN(AddNewList.price) && !isNaN(AddNewList.marketCap)) {
        addDoc(collection(db, "Crypto"), {
          name: AddNewList.name,
          tag: AddNewList.tag,
          price: AddNewList.price,
          marketCap: AddNewList.marketCap,
        });
        AddNewList.setName("");
        AddNewList.setTag("");
        AddNewList.setPrice("");
        AddNewList.setMarketCap("");
        Style.setValue("nameInput", "");
        Style.setValue("tagInput", "");
        Style.setValue("priceInput", "");
        Style.setValue("marketCapInput", "");
        let id1 = setTimeout(function () {
          Style.setDisplay("CoinAdded", "block");
        }, 200);
        Timer.setTestId1(id1);
        let id2 = setTimeout(function () {
          Style.setDisplay("CoinAdded", "none");
        }, 2000);
        Timer.setTestId2(id2);
        Style.setBorderColor("priceInput", "");
        Style.setBorderColor("marketCapInput", "");
      } else {
        if (isNaN(AddNewList.price)) {
          Style.setBorderColor("priceInput", "red");
          alert("Price field must be a NUMBER");
        } else {
          Style.setBorderColor("priceInput", "");
        }
        if (isNaN(AddNewList.marketCap)) {
          Style.setBorderColor("marketCapInput", "red");
          alert("Market Cap field must be a NUMBER");
        } else {
          Style.setBorderColor("marketCapInput", "");
        }
      }
    } else {
      let id3 = setTimeout(function () {
        Style.setDisplay("EmptyFields", "block");
      }, 200);
      Timer.setTestId3(id3);
      let id4 = setTimeout(function () {
        Style.setDisplay("EmptyFields", "none");
      }, 2000);
      Timer.setTestId4(id4);
    }
  };
  useEffect(() => {
    return () => {
      clearTimeout(Timer.timerId1);
      clearTimeout(Timer.timerId2);
      clearTimeout(Timer.timerId3);
      clearTimeout(Timer.timerId4);
    };
  }, []);

  return (
    <div className="AddEdit">
      <label>Name</label>
      <input
        type="text"
        onChange={(e) => {
          AddNewList.setName(e.target.value);
        }}
        id="nameInput"
      ></input>
      <label> Tag</label>
      <input
        type="text"
        onChange={(e) => {
          AddNewList.setTag(e.target.value);
        }}
        id="tagInput"
      ></input>
      <label>Price</label>
      <input
        type="text"
        onChange={(e) => {
          AddNewList.setPrice(e.target.value);
        }}
        id="priceInput"
      ></input>

      <label>Market Cap</label>

      <input
        type="text"
        onChange={(e) => {
          AddNewList.setMarketCap(e.target.value);
        }}
        id="marketCapInput"
      ></input>

      <div className="Button">
        <form onSubmit={submit}>
          <button type="Submit" value="Submit">
            Add
          </button>
        </form>
      </div>

      <div className="AddMessage" id="AddMessage">
        <span className="CoinAdded" id="CoinAdded">
          Coin added!
        </span>
        <span className="EmptyFields" id="EmptyFields">
          Some fields are empty!
        </span>
      </div>
    </div>
  );
});

import AddNewList from "../Classes/Add";
import { db } from "../db/firebase";
import { collection, addDoc } from "firebase/firestore";
import { observer } from "mobx-react";
import React, { useEffect } from "react";
import Timer from "../Classes/Timer";

export const AddItem = observer(() => {
  const submit = (e) => {
    e.preventDefault();
    if (AddNewList.Ime && AddNewList.Kratica && AddNewList.Price && AddNewList.MarketCap) {
      if (!isNaN(AddNewList.Price) && !isNaN(AddNewList.MarketCap)) {
        addDoc(collection(db, "Crypto"), {
          Ime: AddNewList.Ime,
          Kratica: AddNewList.Kratica,
          Price: AddNewList.Price,
          MarketCap: AddNewList.MarketCap,
        });
        AddNewList.setIme("");
        AddNewList.setKratica("");
        AddNewList.setPrice("");
        AddNewList.setMarketCap("");
        document.getElementById("imeInput").value = "";
        document.getElementById("kraticaInput").value = "";
        document.getElementById("priceInput").value = "";
        document.getElementById("marketCapInput").value = "";
        let id1 = setTimeout(function () {
          document.getElementById("CoinAdded").style.display = "block";
        }, 200);
        Timer.setTestId1(id1);
        let id2 = setTimeout(function () {
          document.getElementById("CoinAdded").style.display = "none";
        }, 2000);
        Timer.setTestId2(id2);
        document.getElementById("priceInput").style.borderColor = "";
        document.getElementById("marketCapInput").style.borderColor = "";
      } else {
        if (isNaN(AddNewList.Price)) {
          document.getElementById("priceInput").style.borderColor = "red";
          alert("Price filed must be a NUMBER");
        } else {
          document.getElementById("priceInput").style.borderColor = "";
        }
        if (isNaN(AddNewList.MarketCap)) {
          document.getElementById("marketCapInput").style.borderColor = "red";
          alert("Market Cap filed must be a NUMBER");
        } else {
          document.getElementById("marketCapInput").style.borderColor = "";
        }
      }
    } else {
      let id3 = setTimeout(function () {
        document.getElementById("EmptyFields").style.display = "block";
      }, 200);
      Timer.setTestId3(id3);
      let id4 = setTimeout(function () {
        document.getElementById("EmptyFields").style.display = "none";
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
      <label>Ime</label>
      <input
        type="text"
        onChange={(e) => {
          AddNewList.setIme(e.target.value);
        }}
        id="imeInput"
      ></input>
      <label> Kratica</label>
      <input
        type="text"
        onChange={(e) => {
          AddNewList.setKratica(e.target.value);
        }}
        id="kraticaInput"
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

      <div className="button">
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

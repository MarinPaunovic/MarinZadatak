import EditItemId from "../Classes/Edit";
import Crypto from "../Classes/List";
import { observer } from "mobx-react";
import { updateDoc, doc } from "firebase/firestore";
import db from "../db/firebase";

export const EditItem = observer(() => {
  let EditList = [];
  const closeEdit = () => {
    document.getElementById("EditItem").style.display = "none";
    EditItemId.setItemId("");
  };

  EditItemId.itemId &&
    Crypto.List.filter((value) =>
      value.id.toLowerCase().includes(EditItemId.itemId.toLocaleLowerCase())
        ? EditList.push({
            Ime: value.Ime,
            Kratica: value.Kratica,
            Price: value.Price,
            MarketCap: value.MarketCap,
          })
        : undefined
    );
  const editItem = () => {
    if (!EditItemId.Ime || !EditItemId.Kratica || !EditItemId.Price || !EditItemId.MarketCap) {
      document.getElementById("EditItem").style.display = "none";
      return;
    }
    updateDoc(doc(db, "Crypto", EditItemId.itemId), {
      Ime: EditItemId.Ime,
      Kratica: EditItemId.Kratica,
      Price: EditItemId.Price,
      MarketCap: EditItemId.MarketCap,
    });
    document.getElementById("EditItem").style.display = "none";
    EditItemId.setItemId("");
    Crypto.setRenderAfterEdit();
    document.getElementById("SearchBarId1").value = "";
  };

  const EditListIme = (ime) => {
    EditItemId.setIme(ime);
  };

  const EditListKratica = (Kratica) => {
    EditItemId.setKratica(Kratica);
  };
  const EditListPrice = (Price) => {
    EditItemId.setPrice(Price);
  };
  const EditListMarketCap = (MarketCap) => {
    EditItemId.setMarketCap(MarketCap);
  };

  return (
    <div className="EditItem" id="EditItem">
      <div className="EditItemInner">
        <button className="CloseEdit" onClick={closeEdit}>
          X
        </button>
        {EditItemId.itemId &&
          EditList.map((value, i) => (
            <div key={i}>
              <label>Ime</label>
              <input defaultValue={value.Ime} onChange={(e) => EditListIme(e.target.value)}></input>
              <label>Kratica</label>
              <input
                defaultValue={value.Kratica}
                onChange={(e) => EditListKratica(e.target.value)}
              ></input>
              <label>Price</label>
              <input
                defaultValue={value.Price}
                onChange={(e) => EditListPrice(e.target.value)}
              ></input>
              <label>Market Cap</label>
              <input
                defaultValue={value.MarketCap}
                onChange={(e) => EditListMarketCap(e.target.value)}
              ></input>
              <button onClick={() => editItem()}>Edit</button>
            </div>
          ))}
      </div>
    </div>
  );
});

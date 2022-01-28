import { observer } from "mobx-react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import EditStore from "./EditStore";

export const Edit = observer(() => {
  const { editid } = useParams();

  useEffect(() => {
    console.log(EditStore);

    EditStore.setItemId(editid);
    EditStore.getEdit(editid);

    return () => {
      EditStore.setItemId("");
      EditStore.setName("");
      EditStore.setTag("");
      EditStore.setPrice(null);
      EditStore.setMarketCap(null);
      EditStore.setEditCompleted();
      EditStore.setEditFailed();
      EditStore.setAction();
    };
  }, []);
  return (
    <>
      {EditStore.marketCap && (
        <div className="EditWrapper">
          <label>Name</label>
          <input
            value={EditStore.name}
            onChange={(e) => EditStore.setName(e.target.value)}
          ></input>
          <label>Tag</label>
          <input
            value={EditStore.tag}
            onChange={(e) => EditStore.setTag(e.target.value)}
          ></input>
          <label>Price</label>
          <input
            value={EditStore.price}
            onChange={(e) => EditStore.setPrice(e.target.value)}
          ></input>
          <label>Market Cap</label>
          <input
            value={EditStore.marketCap}
            onChange={(e) => EditStore.setMarketCap(e.target.value)}
          ></input>
          <button onClick={() => EditStore.setEdit(editid)}>Edit</button>
        </div>
      )}
      <div
        className={EditStore.editCompleted ? "CoinEditCompleted" : "NoDisplay"}
      >
        Coin edited!
      </div>
      <div className={EditStore.editFailed ? "CoinEditFailed" : "NoDisplay"}>
        All fields must have corresponding values and cannot be empty!
      </div>
    </>
  );
});

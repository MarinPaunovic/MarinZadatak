import { observer } from "mobx-react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import EditStore from "./EditStore";

export const Edit = observer(() => {
  const { editid } = useParams();

  useEffect(() => {
    EditStore.getEdit(editid);
    EditStore.setItemId(editid);
    return () => {
      EditStore.setItemId("");
      EditStore.setName("");
      EditStore.setTag("");
      EditStore.setPrice(null);
      EditStore.setMarketCap(null);
    };
  }, []);
  return (
    <>
      {EditStore.itemId && (
        <div>
          <input
            defaultValue={EditStore.name}
            onChange={(e) => EditStore.setName(e.target.value)}
          ></input>
          <input
            defaultValue={EditStore.tag}
            onChange={(e) => EditStore.setTag(e.target.value)}
          ></input>
          <input
            defaultValue={EditStore.price}
            onChange={(e) => EditStore.setPrice(e.target.value)}
          ></input>
          <input
            defaultValue={EditStore.marketCap}
            onChange={(e) => EditStore.setMarketCap(e.target.value)}
          ></input>
          <button onClick={() => EditStore.setEdit(editid)}>Edit</button>
        </div>
      )}
    </>
  );
});

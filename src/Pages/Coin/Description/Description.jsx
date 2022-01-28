import { observer } from "mobx-react";
import { useEffect } from "react";
import OrderBy from "./OrderBy";

export const Description = observer(() => {
  useEffect(() => {
    return () => {
      OrderBy.setBack();
    };
  }, []);
  return (
    <div className="Description">
      <button onClick={() => OrderBy.setOrder("name")}>Name</button>
      <button onClick={() => OrderBy.setOrder("tag")}>Tag</button>
      <button onClick={() => OrderBy.setOrder("price")}>Price</button>
      <button onClick={() => OrderBy.setOrder("marketCap")}>Market cap</button>
    </div>
  );
});

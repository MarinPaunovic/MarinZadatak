import Crypto from "../List/ListStore";
import { observer } from "mobx-react";
import Search from "../Search/SearchStore";
import PaginationStore from "./PaginationStore";
import { useEffect } from "react";

export const Pagination = observer(() => {
  useEffect(() => {
    PaginationStore.getPages(Crypto.list.length);
    return () => {
      PaginationStore.setPages([]);
    };
  }, [Crypto.action]);

  return (
    <div className="Pagination">
      {!Search.item &&
        PaginationStore.pages &&
        PaginationStore.pages.map((index, x) => {
          return (
            <button key={x} onClick={() => PaginationStore.setPageNumber(index)}>
              {index}
            </button>
          );
        })}
    </div>
  );
});

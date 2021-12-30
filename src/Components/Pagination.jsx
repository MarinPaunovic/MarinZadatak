import Crypto from "../Classes/List";
import { observer } from "mobx-react";
import Page from "../Classes/Page";
import Search from "../Classes/Search";

export const Pagination = observer(() => {
  const abc = [];
  const oListNumber = Crypto.List.length;
  const test = Math.ceil(oListNumber / 5);
  for (let i = 1; test >= i; i++) {
    abc.push({ i });
  }

  const handlePages = (index) => {
    Page.setPageNumber(index);
  };

  return (
    <div className="Pagination">
      {!Search.item &&
        abc.map((index, x) => {
          return (
            <button key={x} onClick={() => handlePages(index.i)}>
              {index.i}
            </button>
          );
        })}
    </div>
  );
});

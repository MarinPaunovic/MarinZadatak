import db from "../db/firebase";
import { onSnapshot, collection, doc, deleteDoc, orderBy, query } from "@firebase/firestore";
import Crypto from "../Classes/List";
import Search from "../Classes/Search";
import { useEffect, useRef } from "react";
import { observer } from "mobx-react";
import EditItemId from "../Classes/Edit";
import OrderBy from "../Classes/OrderBy";
import Page from "../Classes/Page";

export const ListItem = observer(() => {
  const getSetList = () => {
    onSnapshot(
      query(
        collection(db, "Crypto"),
        orderBy(!OrderBy.Order ? "MarketCap" : OrderBy.Order, OrderBy.Counter % 2 ? "desc" : "asc")
      ),
      (doc) => {
        const List = doc.docs.map((item) => ({
          ...item.data(),
          id: item.id,
        }));
        Crypto.setList(List);
      }
    );
  };
  useEffect(() => {
    getSetList();
    return () => {
      Search.setItem("");
      Page.setPageNumber(1);
    };
  }, [OrderBy.Order, OrderBy.Counter, Crypto.renderAfterEdit]);

  const openEdit = (id) => {
    document.getElementById("EditItem").style.display = "block";
    EditItemId.setItemId(id);
  };

  const handleClickDelete = (id) => {
    deleteDoc(doc(db, "Crypto", id));
    Crypto.setRenderAfterEdit();
    document.getElementById("SearchBarId1").value = "";
  };
  const firstRender = useRef(true);

  const testara = () => {
    if (!Crypto.List) {
      return;
    }
    let indexFrom = (Page.pageNumber - 1) * 5;
    let indexTo = Page.pageNumber * 5;
    const newList = [];
    if (indexTo > Crypto.List.length) {
      for (indexFrom; Crypto.List.length > indexFrom; indexFrom++) {
        if (Crypto.List[indexFrom]) {
          newList.push({
            Ime: Crypto.List[indexFrom].Ime,
            Kratica: Crypto.List[indexFrom].Kratica,
            Price: Crypto.List[indexFrom].Price,
            MarketCap: Crypto.List[indexFrom].MarketCap,
            id: Crypto.List[indexFrom].id,
          });
        } else return;
        Crypto.setPageList(newList);
      }
    } else {
      for (indexFrom; indexTo > indexFrom; indexFrom++) {
        if (Crypto.List[indexFrom]) {
          newList.push({
            Ime: Crypto.List[indexFrom].Ime,
            Kratica: Crypto.List[indexFrom].Kratica,
            Price: Crypto.List[indexFrom].Price,
            MarketCap: Crypto.List[indexFrom].MarketCap,
            id: Crypto.List[indexFrom].id,
          });
        } else return;
        Crypto.setPageList(newList);
      }
    }
  };

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    testara();
  }, [Crypto.List, Page.pageNumber]);

  return (
    <div className="List" id="ListId">
      {!Search.item && Crypto.pageList
        ? Crypto.pageList.map((item, i) => (
            <div className="OneItem" key={i}>
              <p>{item.Ime} </p>
              <div>{item.Kratica} </div>
              <div>{item.Price} $</div>
              <div>{item.MarketCap} $ </div>
              <button onClick={() => openEdit(item.id)}>Edit</button>
              <button onClick={() => handleClickDelete(item.id)}>Delete</button>
            </div>
          ))
        : Crypto.SearchList.map((item, i) => (
            <div className="OneItem" key={i}>
              <p>{item.Ime} </p>
              <div>{item.Kratica} </div>
              <div>{item.Price} $</div>
              <div>{item.MarketCap} $ </div>
              <button onClick={() => openEdit(item.id)}>Edit</button>
              <button onClick={() => handleClickDelete(item.id)}>Delete</button>
            </div>
          ))}
    </div>
  );
});
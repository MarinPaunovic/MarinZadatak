import { db } from "../../../db/firebase";
import { onSnapshot, collection, doc, deleteDoc, orderBy, query } from "@firebase/firestore";
import Crypto from "./List";
import Search from "../../../Pages/Coin/Search/Search";
import { useEffect, useRef } from "react";
import { observer } from "mobx-react";
import OrderBy from "../../../Pages/Coin/Description/OrderBy";
import Page from "../Pagination/Page";
import { Link } from "react-router-dom";
import AuthUser from "../../User/Auth/AuthUser";
import { userAuth } from "../../../Functions/userAuth";
import Style from "../../../Classes/Style";
import { GetComments } from "../../Comments/GetComments/GetComments";

export const ListItem = observer(() => {
  const authState = userAuth();

  const getSetList = () => {
    onSnapshot(
      query(
        collection(db, "Crypto"),
        orderBy(!OrderBy.order ? "marketCap" : OrderBy.order, OrderBy.counter % 2 ? "desc" : "asc")
      ),
      (doc) => {
        const list = doc.docs.map((item) => ({
          ...item.data(),
          id: item.id,
        }));

        Crypto.setList(list);
      }
    );
  };

  useEffect(() => {
    getSetList();
    return () => {
      Search.setItem("");
      Page.setPageNumber(1);
    };
  }, [OrderBy.order, OrderBy.counter, Crypto.renderAfterEdit, AuthUser.userAuth]);

  const handleClickDelete = (id) => {
    deleteDoc(doc(db, "Crypto", id));
    Crypto.setRenderAfterEdit();
    Style.setValue("SearchBarId1", "");
  };
  const firstRender = useRef(true);

  const pagination = () => {
    if (!Crypto.list) {
      return;
    }
    let indexFrom = (Page.pageNumber - 1) * 5;
    let indexTo = Page.pageNumber * 5;
    const newList = [];
    if (indexTo > Crypto.list.length) {
      for (indexFrom; Crypto.list.length > indexFrom; indexFrom++) {
        if (Crypto.list[indexFrom]) {
          newList.push({
            name: Crypto.list[indexFrom].name,
            tag: Crypto.list[indexFrom].tag,
            price: Crypto.list[indexFrom].price,
            marketCap: Crypto.list[indexFrom].marketCap,
            id: Crypto.list[indexFrom].id,
          });
        } else return;
        Crypto.setPageList(newList);
      }
    } else {
      for (indexFrom; indexTo > indexFrom; indexFrom++) {
        if (Crypto.list[indexFrom]) {
          newList.push({
            name: Crypto.list[indexFrom].name,
            tag: Crypto.list[indexFrom].tag,
            price: Crypto.list[indexFrom].price,
            marketCap: Crypto.list[indexFrom].marketCap,
            id: Crypto.list[indexFrom].id,
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
    pagination();
  }, [Crypto.list, Page.pageNumber]);
  return (
    <div className="List" id="ListId">
      {!Search.item && Crypto.pageList
        ? Crypto.pageList.map((item, i) => (
            <div key={i}>
              <div className="OneItem">
                <div>{item.name} </div>
                <div>{item.tag} </div>
                <div>{item.price} $</div>
                <div>{item.marketCap} $ </div>
                {authState && (
                  <>
                    {" "}
                    <Link to={`/edit/${item.id}`}>Edit</Link>
                    <button onClick={() => handleClickDelete(item.id)}>Delete</button>
                  </>
                )}
              </div>
              <GetComments id={item.id} />
            </div>
          ))
        : Crypto.searchList.map((item, i) => (
            <div className="OneItem" key={i}>
              <div>{item.name} </div>
              <div>{item.tag} </div>
              <div>{item.price} $</div>
              <div>{item.marketCap} $ </div>
              {authState && (
                <>
                  {" "}
                  <Link to={`/edit/${item.id}`}>Edit</Link>
                  <button onClick={() => handleClickDelete(item.id)}>Delete</button>
                </>
              )}
            </div>
          ))}
    </div>
  );
});

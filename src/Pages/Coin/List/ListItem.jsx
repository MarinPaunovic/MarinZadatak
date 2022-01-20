import Crypto from "./ListStore";
import { useEffect } from "react";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";
// import AuthUser from "../../User/Auth/AuthUser";
// import { userAuth } from "../../../Functions/userAuth";
import { GetComments } from "../../Comments/GetComments/GetComments";
import PaginationStore from "../Pagination/PaginationStore";
import SearchStore from "../../../Pages/Coin/Search/SearchStore";

export const ListItem = observer(() => {
  // const authState = userAuth();

  useEffect(() => {
    Crypto.getList();
    PaginationStore.setPagination();
    return () => {
      SearchStore.setItem("");
    };
  }, [Crypto.action, PaginationStore.pageNumber]);

  return (
    <div className="List" id="ListId">
      {!SearchStore.item && Crypto.pageList
        ? Crypto.pageList.map((item, i) => (
            <div key={i}>
              <div className="OneItem">
                <div>{item.name} </div>
                <div>{item.tag} </div>
                <div>{item.price} $</div>
                <div>{item.marketCap} $ </div>

                <>
                  {" "}
                  <Link to={`/edit/${item.id}`}>Edit</Link>
                  <button onClick={() => Crypto.setDelete(item.id)}>Delete</button>
                </>
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

              <>
                {" "}
                <Link to={`/edit/${item.id}`}>Edit</Link>
                <button onClick={() => Crypto.setDelete(item.id)}>Delete</button>
              </>
            </div>
          ))}
    </div>
  );
});

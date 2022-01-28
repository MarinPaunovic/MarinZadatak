import Crypto from "./ListStore";
import React from "react";
import { useEffect } from "react";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";
// import AuthUser from "../../User/Auth/AuthUser";
// import { userAuth } from "../../../Functions/userAuth";
import { GetComments } from "./GetComments/GetComments";
import PaginationStore from "../../../Components/Pagination/PaginationStore";
import SearchStore from "../../../Pages/Coin/Search/SearchStore";
import OrderBy from "../Description/OrderBy";

export const ListItem = observer(() => {
  // const authState = userAuth();

  useEffect(() => {
    Crypto.getList();
    return () => {
      SearchStore.setItem("");
    };
  }, [PaginationStore.pageNumber, PaginationStore.indexFrom, OrderBy.counter]);

  return (
    <>
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
                    <button onClick={() => Crypto.setDelete(item.id)}>
                      Delete
                    </button>
                  </>
                </div>
                <GetComments id={item.id} />
              </div>
            ))
          : Crypto.searchList &&
            Crypto.searchList.map((item, i) => (
              <div className="OneItem" key={i}>
                <div>{item.name} </div>
                <div>{item.tag} </div>
                <div>{item.price} $</div>
                <div>{item.marketCap} $ </div>

                <>
                  {" "}
                  <Link to={`/edit/${item.id}`}>Edit</Link>
                  <button onClick={() => Crypto.setDelete(item.id)}>
                    Delete
                  </button>
                </>
              </div>
            ))}
      </div>
    </>
  );
});

// import React, { componentDidMount } from "react";
// import { observer, inject } from "mobx-react";
// import { Link } from "react-router-dom";
// import { GetComments } from "../List/GetComments/GetComments";
// import PaginationStore from "../../../Components/Pagination/PaginationStore";
// import { action, makeAutoObservable, runInAction } from "mobx";
// class ListItem extends React.Component {
//   render() {
//     const crypto = this.props.stores.crypto;
//     const pages = this.props.stores.page;

//     return (
//       <>
//         <button
//           onClick={() => {
//             crypto.setTest(crypto.test + 1);
//           }}
//         >
//           click me!
//         </button>
//         <div>{crypto.test}</div>
//         <div className="List" id="ListId">
//           {crypto.pageList &&
//             crypto.pageList.map((item, i) => (
//               <div key={i}>
//                 <div className="OneItem">
//                   <div>{item.name} </div>
//                   <div>{item.tag} </div>
//                   <div>{item.price} $</div>
//                   <div>{item.marketCap} $ </div>

//                   <>
//                     {" "}
//                     <Link to={`/edit/${item.id}`}>Edit</Link>
//                     <button onClick={() => crypto.setDelete(item.id)}>
//                       Delete
//                     </button>
//                   </>
//                 </div>
//                 <GetComments id={item.id} />
//               </div>
//             ))}
//         </div>
//       </>
//     );
//   }
// }
// export default inject(({ stores }) => ({
//   stores,
// }))(observer(ListItem));

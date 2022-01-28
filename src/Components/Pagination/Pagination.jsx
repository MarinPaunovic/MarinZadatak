// import { inject, observer } from "mobx-react";
// import React from "react";

// class Pagination extends React.Component {
//   render() {
//     const PaginationStore = this.props.stores.page;
//     const crypto = this.props.stores.crypto;
//     // if (crypto.list != "") {
//     //   console.log(crypto.list.length);
//     //   PaginationStore.getPages(this.props.store.crypto.list.length);
//     // }

//     return (
//       <div className="Pagination">
//         {PaginationStore.pages &&
//           PaginationStore.pages.map((index, x) => {
//             return (
//               <button
//                 key={x}
//                 onClick={() => {
//                   PaginationStore.setPageNumber(index);
//                   console.log(
//                     PaginationStore.indexFrom,
//                     PaginationStore.indexTo,
//                     "pagination"
//                   );
//                 }}
//                 style={
//                   PaginationStore.pageNumber == index
//                     ? {
//                         borderStyle: "solid",
//                         borderWidth: "0.7px",
//                         borderRadius: "3px",
//                       }
//                     : undefined
//                 }
//               >
//                 {index}
//               </button>
//             );
//           })}
//       </div>
//     );
//   }
// }

// export default inject(({ stores }) => ({
//   stores,
// }))(observer(Pagination));

import { observer } from "mobx-react";
import Search from "../../Pages/Coin/Search/SearchStore";
import PaginationStore from "./PaginationStore";
import { useEffect } from "react";
import DeleteCommentStore from "../../Pages/Comments/DeleteComments/DeleteCommentStore";
import CommentStore from "../../Pages/Comments/Comment/CommentStore";
import AddCommentStore from "../../Pages/Comments/AddComments/AddCommentStore";

export const Pagination = observer(({ length }) => {
  useEffect(() => {
    PaginationStore.getPages(length);
    return () => {
      PaginationStore.setPages([]);
      PaginationStore.setPageNumber(1);
    };
  }, [AddCommentStore.addAction, DeleteCommentStore.deleteConfirmation]);

  return (
    <div className="Pagination">
      {!Search.item &&
        PaginationStore.pages &&
        PaginationStore.pages.map((index, x) => {
          return (
            <button
              key={x}
              onClick={() => {
                PaginationStore.setPageNumber(index);
              }}
              style={
                PaginationStore.pageNumber == index
                  ? {
                      borderStyle: "solid",
                      borderWidth: "0.7px",
                      borderRadius: "3px",
                    }
                  : undefined
              }
            >
              {index}
            </button>
          );
        })}
    </div>
  );
});

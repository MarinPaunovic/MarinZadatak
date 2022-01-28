import { Link } from "react-router-dom";
import { observer } from "mobx-react";
import GetCommentsStore from "./GetCommentsStore";
import { useEffect } from "react";

export const GetComments = observer((id) => {
  useEffect(() => {
    return () => {
      GetCommentsStore.setCoinId();
    };
  }, []);
  return (
    <>
      <Link
        to={`/comments/${id.id}`}
        className="GetCommentButton"
        style={
          id.id == GetCommentsStore.coinId
            ? { display: "block" }
            : { display: "none" }
        }
      >
        Comment
      </Link>

      <button
        onClick={() => {
          GetCommentsStore.setToggle(id.id);
        }}
        className="GetComment"
      >
        <i className="material-icons">
          {id.id == GetCommentsStore.coinId
            ? "arrow_drop_up"
            : "arrow_drop_down"}
        </i>
      </button>
    </>
  );
});

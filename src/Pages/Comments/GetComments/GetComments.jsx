import { useState } from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react";

export const GetComments = observer((id) => {
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    if (!toggle) {
      setToggle(true);
    }
    if (toggle) {
      setToggle(false);
    }
  };

  return (
    <>
      <Link
        to={`/comments/${id.id}`}
        className="GetCommentButton"
        style={toggle ? { display: "grid" } : { display: "none" }}
      >
        Comment
      </Link>

      <button onClick={handleToggle} className="GetComment">
        <i className="material-icons">{toggle ? "arrow_drop_up" : "arrow_drop_down"}</i>
      </button>
    </>
  );
});

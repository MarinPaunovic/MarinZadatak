import { useRef, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../db/firebase";
import { observer } from "mobx-react";
import { DeleteComments } from "../DeleteComments/DeleteComment.jsx";
import { useEffect } from "react";
import Style from "../../../Classes/Style";
import { AddComment } from "../AddComments/AddComment.jsx";
import AddCommentStore from "../AddComments/AddCommentStore";

export const GetComments = observer((id) => {
  const [comments, setComments] = useState([]);
  const [toggle, setToggle] = useState(false);

  const firstRender = useRef(true);

  const getComments = () => {
    onSnapshot(collection(db, "Comments"), (value) => {
      let comments = [];
      value.docs.map((item) => {
        if (id.id === item.data().coinId) {
          comments.push({ ...item.data(), id: item.id });
        }
      });
      setComments(comments);
    });
  };

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    getComments();
  }, [toggle]);

  const handleToggle = () => {
    if (!toggle) {
      setToggle(true);
    }
    if (toggle) {
      setToggle(false);
    }
  };
  const showAddInputs = () => {
    Style.setDisplay("AddCommentWrapper", "block");
    AddCommentStore.setCommentId(id.id);
  };

  return (
    <>
      <button
        onClick={showAddInputs}
        className="AddCommentButton"
        style={toggle ? { display: "grid" } : { display: "none" }}
      >
        Add Comment
      </button>
      <AddComment />
      <button onClick={handleToggle} className="GetComment">
        <i className="material-icons">{toggle ? "arrow_drop_up" : "arrow_drop_down"}</i>
      </button>
      <div className="CommentsWrapper">
        {comments &&
          comments.map((item, i) => (
            <div
              className="Comments"
              id={id.id}
              key={i}
              style={toggle ? { display: "grid" } : { display: "none" }}
            >
              <div className="UserWrap">
                <div className="User">user</div>
                <div className="CreatedAt">14:25, 19.1.2022</div>
              </div>
              <div className="Comment">{item.comment}</div>
              <div className="CommentButtons">
                <button className="Edit">Edit</button>
                <DeleteComments id={item.id} />
              </div>
            </div>
          ))}
      </div>
    </>
  );
});

import { observer } from "mobx-react";
import DeleteCommentStore from "./DeleteCommentStore";

const DeleteComment = observer((commentId) => {
  return (
    <button className="DeleteComment" onClick={() => DeleteCommentStore.setDelete(commentId)}>
      Delete
    </button>
  );
});

export default DeleteComment;

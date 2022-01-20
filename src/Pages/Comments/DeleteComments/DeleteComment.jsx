import { observer } from "mobx-react";
import DeleteCommentStore from "./DeleteCommentStore";

const DeleteComment = observer((commentId) => {
  return (
    <>
      <button
        className="DeleteComment"
        onClick={() => {
          DeleteCommentStore.setDeleteAction(true);
          DeleteCommentStore.setDeleteId(commentId);
        }}
      >
        Delete
      </button>
    </>
  );
});

export default DeleteComment;

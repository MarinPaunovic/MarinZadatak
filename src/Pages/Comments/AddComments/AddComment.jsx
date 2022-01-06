import { addComment } from "./AddComment";
import { closeAddCommentInput } from "./AddComment";
import AddCommentStore from "./AddCommentStore";
import { observer } from "mobx-react";

export const AddComment = observer(() => {
  return (
    <>
      <div className="AddCommentWrapper" id={"AddCommentWrapper"}>
        <div></div>
        <div className="AddCommentInputs">
          <label>Comment</label>
          <textarea
            maxLength={300}
            id={"AddCommentTextarea"}
            onChange={(e) => AddCommentStore.setComment(e.target.value)}
          ></textarea>
          <button onClick={() => addComment(AddCommentStore.commentId)}>Add</button>
          <button
            className="CloseAddCommentButton"
            onClick={() => closeAddCommentInput("AddCommentWrapper")}
          >
            X
          </button>
        </div>
      </div>
    </>
  );
});

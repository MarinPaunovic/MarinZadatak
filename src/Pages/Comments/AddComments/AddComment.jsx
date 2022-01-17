import { observer } from "mobx-react";
import AddCommentStore from "./AddCommentStore";

export const AddComment = observer((id) => {
  const ACS = AddCommentStore;
  return (
    <>
      <button
        className="AddCommentButton"
        onClick={() => {
          ACS.setToggle();
        }}
      >
        Add Comment
      </button>
      {ACS.toggle && (
        <div className="AddCommentWrapper" id={"AddCommentWrapper"}>
          <div className="AddCommentInputs">
            <label>Comment</label>
            <textarea
              maxLength={300}
              id={"AddCommentTextarea"}
              onChange={(e) => ACS.setContent(e.target.value)}
            ></textarea>
            <button
              onClick={() => {
                ACS.setComment(id.id, ACS.content);
                ACS.setToggle();
              }}
            >
              Add
            </button>
            <button className="CloseAddCommentButton" onClick={() => ACS.setToggle()}>
              X
            </button>
          </div>
        </div>
      )}
    </>
  );
});

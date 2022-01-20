import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { observer } from "mobx-react";
import CommentStore from "./CommentStore";
import DeleteComment from "../DeleteComments/DeleteComment";
import { AddComment } from "../AddComments/AddComment.jsx";
import EditComment from "../EditComments/EditComment";
import EditCommentStore from "../EditComments/EditCommentStore";
import DeleteCommentStore from "../DeleteComments/DeleteCommentStore";

export const Comment = observer(() => {
  const { commentId } = useParams("commentId");
  useEffect(() => {
    CommentStore.getComments(commentId);
    CommentStore.getCoinName(commentId);
    CommentStore.getCoinNames();

    return () => {
      CommentStore.setComments("");
      CommentStore.setCoinName("");
      CommentStore.setCoinNames("");
      EditCommentStore.setEditCommentId("");
    };
  }, [DeleteComment.deleteAction]);
  return (
    <>
      {DeleteCommentStore.deleteAction && (
        <div className="DeleteConfirmationWrapper">
          <div className="DeleteConfirmationComponents">
            <label>Are you sure that you want to delete comment?</label>
            <div className="DeleteConfirmationButtons">
              <button onClick={() => DeleteCommentStore.setDelete(DeleteCommentStore.id)}>
                Yes
              </button>
              <button onClick={() => DeleteCommentStore.setDeleteAction(false)}>No</button>
            </div>
          </div>
        </div>
      )}
      <div className="CommentCoinName">{CommentStore.coinName}</div>
      <div className="CommentButtonWrapper">
        <AddComment id={commentId} />
        <div className="CoinCommentChoice">
          <button className="CoinCommentChoiceButton">Change coin</button>
          <div className="CoinCommentChoiceContent">
            {CommentStore.coinNames &&
              CommentStore.coinNames.map(
                (item, i) =>
                  item.name != CommentStore.coinName && (
                    <a key={i} href={item.id}>
                      {item.name}
                    </a>
                  )
              )}
          </div>
        </div>
      </div>

      <div className="CommentWrapper">
        {!EditCommentStore.editCommentId && CommentStore.comments
          ? CommentStore.comments.map((item, i) => (
              <div key={i} className="EachComment">
                <div>user</div>
                <div>Comment</div>
                <div className="CommentTimestamp">{item.createdAt}</div>
                <div className="CommentContent">{item.comment}</div>
                <DeleteComment id={item.id} />
                <EditComment id={item.id} />
              </div>
            ))
          : CommentStore.comments &&
            CommentStore.comments.map((item, i) =>
              item.id !== EditCommentStore.editCommentId ? (
                <div key={i} className="EachComment">
                  <div>user</div>
                  <div>Comment</div>
                  <div className="CommentTimestamp">{item.createdAt}</div>
                  <div className="CommentContent">{item.comment}</div>
                  <DeleteComment id={item.id} />
                  <EditComment id={item.id} />
                </div>
              ) : (
                <div key={i} className="EachComment">
                  <div>user</div>
                  <div>Comment</div>
                  <div className="CommentTimestamp">{item.createdAt}</div>
                  <textarea
                    style={{ resize: "none", height: "50px" }}
                    maxLength={255}
                    onChange={(e) => EditCommentStore.setEdit(e.target.value)}
                    defaultValue={item.comment}
                  ></textarea>
                  <button
                    className="DeleteComment"
                    onClick={() => EditCommentStore.setEditCommentId("")}
                  >
                    Cancel
                  </button>
                  <button
                    className="EditComment"
                    onClick={() => {
                      EditCommentStore.setHandleEdit(item.id);
                      EditCommentStore.setEditCommentId("");
                    }}
                  >
                    confirm
                  </button>
                </div>
              )
            )}
      </div>
    </>
  );
});

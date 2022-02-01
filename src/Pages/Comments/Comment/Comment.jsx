import React from "react";
import { observer, inject } from "mobx-react";
import AddComment from "../AddComments/AddComment";
import DeleteComment from "../DeleteComments/DeleteComment";
import EditComment from "../EditComments/EditComment";

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.delete = props.stores.delete;
    this.comments = props.stores.comments;
    this.add = props.stores.add;
    this.page = props.stores.page;
    this.commentId = props.stores.id.commentId;
    this.edit = props.stores.edit;
    this.page.setIndex();
    this.comments.getCoinName(this.commentId);
    this.comments.getCoinNames();
    this.comments.getComments(
      this.commentId,
      this.page.indexTo,
      this.page.indexFrom
    );
  }

  componentDidUpdate(to) {
    if (to.list !== this.comments.comments.length) {
      this.page.setPageNumber(1);
    }
    if (
      to.indexFrom !== this.page.indexFrom &&
      to.indexTo !== this.page.indexTo
    ) {
      this.comments.setPageComments(this.page.indexTo, this.page.indexFrom);
    }
  }
  render() {
    return (
      <>
        {this.delete.deleteAction && (
          <div className="DeleteConfirmationWrapper">
            <div className="DeleteConfirmationComponents">
              <label>Are you sure that you want to delete comment?</label>
              <div className="DeleteConfirmationButtons">
                <button onClick={() => this.delete.setDelete(this.delete.id)}>
                  Yes
                </button>
                <button onClick={() => this.delete.setDeleteAction(false)}>
                  No
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="CommentCoinName">{this.comments.coinName}</div>
        <div className="CommentButtonWrapper">
          <AddComment id={this.commentId} add={this.add} page={this.page} />
          <div className="CoinCommentChoice">
            <button className="CoinCommentChoiceButton">Change coin</button>
            <div className="CoinCommentChoiceContent">
              {this.comments.coinNames &&
                this.comments.coinNames.map(
                  (item, i) =>
                    item.name != this.comments.coinName && (
                      <a key={i} href={item.id}>
                        {item.name}
                      </a>
                    )
                )}
            </div>
          </div>
        </div>
        <div className="CommentWrapper">
          {!this.edit.editCommentId && this.comments.pageComments
            ? this.comments.pageComments.map((item, i) => (
                <div key={i} className="EachComment">
                  <div>user</div>
                  <div>Comment</div>
                  <div className="CommentTimestamp">{item.createdAt}</div>
                  <div className="CommentContent">{item.comment}</div>
                  <DeleteComment id={item.id} delete={this.delete} />
                  <EditComment id={item.id} edit={this.edit} />
                </div>
              ))
            : this.comments.pageComments &&
              this.comments.pageComments.map((item, i) =>
                item.id !== this.edit.editCommentId ? (
                  <div key={i} className="EachComment">
                    <div>user</div>
                    <div>Comment</div>
                    <div className="CommentTimestamp">{item.createdAt}</div>
                    <div className="CommentContent">{item.comment}</div>
                    <DeleteComment id={item.id} delete={this.delete} />
                    <EditComment id={item.id} edit={this.edit} />
                  </div>
                ) : (
                  <div key={i} className="EachComment">
                    <div>user</div>
                    <div>Comment</div>
                    <div className="CommentTimestamp">{item.createdAt}</div>
                    <textarea
                      style={{ resize: "none", height: "50px" }}
                      maxLength={255}
                      onChange={(e) =>
                        this.props.stores.edit.setEdit(e.target.value)
                      }
                      defaultValue={item.comment}
                    ></textarea>
                    <button
                      className="DeleteComment"
                      onClick={() =>
                        this.props.stores.edit.setEditCommentId("")
                      }
                    >
                      Cancel
                    </button>
                    <button
                      className="EditComment"
                      onClick={() => {
                        this.props.stores.edit.setHandleEdit(item.id);
                        this.props.stores.edit.setEditCommentId("");
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
  }
}
export default inject((provider) => provider)(observer(Comment));

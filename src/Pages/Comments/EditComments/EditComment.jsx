import EditCommentStore from "./EditCommentStore";

const EditComment = (id) => {
  return (
    <button onClick={() => EditCommentStore.setEditCommentId(id.id)} className="EditComment">
      edit
    </button>
  );
};

export default EditComment;

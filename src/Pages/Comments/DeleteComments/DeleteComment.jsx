import { deleteComment } from "./DeleteComment";
export const DeleteComments = (id) => {
  return <button onClick={() => deleteComment(id.id)}>Delete</button>;
};

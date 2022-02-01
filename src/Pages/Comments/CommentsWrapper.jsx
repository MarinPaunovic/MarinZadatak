import CommentInject from "./Comment/CommentInject";
import { useParams } from "react-router-dom";

export const CommentsWrapper = () => {
  let params = useParams("commentId");
  return <CommentInject id={params} />;
};

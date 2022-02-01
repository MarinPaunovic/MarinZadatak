import Edit from "./Edit";
import { useParams } from "react-router-dom";

export const EditWrapper = () => {
  let params = useParams("commentId");
  return <Edit id={params} />;
};

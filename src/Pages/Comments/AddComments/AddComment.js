import { db } from "../../../db/firebase";
import { addDoc, collection } from "firebase/firestore";
import Style from "../../../Classes/Style";
import AddCommentStore from "./AddCommentStore";

export function addComment(id) {
  if (AddCommentStore.comment) {
    addDoc(collection(db, "Comments"), {
      comment: AddCommentStore.comment,
      coinId: id,
    });
    AddCommentStore.setComment("");
    Style.setValue("AddCommentTextarea", "");
  } else return;
}

export function closeAddCommentInput(id) {
  Style.setDisplay(id, "none");
  AddCommentStore.setComment("");
  Style.setValue("AddCommentTextarea", "");
}

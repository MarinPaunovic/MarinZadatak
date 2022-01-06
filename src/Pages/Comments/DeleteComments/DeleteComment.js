import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../../db/firebase";

export function deleteComment(id) {
  deleteDoc(doc(db, "Comments", id));
}

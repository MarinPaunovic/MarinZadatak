import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  collection,
  where,
  getDocs,
  query,
} from "firebase/firestore";
import { db } from "../db/firebase";
class DatabaseService {
  async getList() {
    onSnapshot(
      query(
        collection(db, "Crypto"),
        orderBy(!order ? "marketCap" : order, orderCounter % 2 ? "desc" : "asc")
      ),
      (doc) => {
        const list = doc.docs.map((item) => ({
          ...item.data(),
          id: item.id,
        }));
        runInAction(() => {
          this.list = list;
        });
      }
    );
  }

  setEdit(id, editComment) {
    updateDoc(doc(db, this.collection, id), {
      comment: editComment,
    });
  }
  setAdd(coll, content) {
    addDoc(collection(db, coll), {
      content,
    });
  }

  setDelete(id, double) {
    deleteDoc(doc(db, this.collection, id));
    if (double) {
      const collRef = collection(db, "Comments");
      const q = query(collRef, where("coinId", "==", id));
      getDocs(q).then((value) =>
        value.docs.map((item) => deleteDoc(doc(db, "Comments", item.id)))
      );
    }
  }
}

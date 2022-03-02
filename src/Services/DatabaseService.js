import {
  deleteDoc,
  doc,
  collection,
  where,
  addDoc,
  getDocs,
  query,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "../db/firebase";
class DatabaseService {
  constructor(props) {
    this.collection = props;
  }

  async getOne(id) {
    return await getDoc(doc(db, this.collection, id));
  }
  async getAll() {
    return await getDocs(collection(db, this.collection));
  }

  setEdit(id, data) {
    updateDoc(doc(db, this.collection, id), data);
  }
  setAdd(content) {
    addDoc(collection(db, this.collection), content);
  }

  async setDelete(id, doubleColl, ref) {
    deleteDoc(doc(db, this.collection, id));
    if (doubleColl) {
      const collRef = collection(db, doubleColl);
      const q = query(collRef, where(ref, "==", id));
      const value = await getDocs(q);
      value.docs.map((item) => deleteDoc(doc(db, doubleColl, item.id)));
    }
  }
}
export const coins = new DatabaseService("Crypto");
export const comments = new DatabaseService("Comments");

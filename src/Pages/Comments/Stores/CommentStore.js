import {
  query,
  getDocs,
  collection,
  where,
  onSnapshot,
} from "firebase/firestore";
import { makeAutoObservable, reaction, runInAction } from "mobx";
import { db } from "../../../db/firebase";

class CommentStore {
  comments = [];
  pageComments = [];
  coinName = "";
  coinNames = [];
  coinId = "";
  id = "";

  constructor(props) {
    makeAutoObservable(this);
    this.getCoinNames();
    reaction(
      //kada imam id, setaj komentare i ime
      () => this.id,
      () => {
        if (this.id.length !== 0) {
          this.getComments(this.id);
          this.getCoinName(this.id);
        }
      }
    );
    reaction(
      () => this.comments,
      (a, b) => {
        if (!props.page.pages.length) {
          //kada ima komentara, napravi paginaciju
          props.page.setIndex();
          props.page.getPages(this.comments.length);
        }
        if (a !== b && a.length === b.length) {
          //setaj novu listu nakon edita(edit refresh)
          this.setPageComments(props.page.indexTo, props.page.indexFrom);
        }
        if (a.length > b.length && b.length !== 0) {
          //kada je list item veci, dodajem item i setaj mi novu listu, nove pages , novu pageListu
          props.page.getPages(this.comments.length);
          this.getComments(this.id);
          this.setPageComments(props.page.indexTo, props.page.indexFrom);
        }
        if (a.length < b.length) {
          //kada se briše iz liste, setaj novu listu i page listu(refresh da ostane isto)
          props.page.getPages(this.comments.length);
          this.getComments(this.id);
          this.setPageComments(props.page.indexTo, props.page.indexFrom);
        }
      }
    );
    reaction(
      //promjena pageComments na promjenu stranice
      () => props.page.pageNumber,
      () => {
        this.setPageComments(props.page.indexTo, props.page.indexFrom);
      }
    );
    reaction(
      () => props.page.pages.length,
      (a, b) => {
        if (a < b) {
          if (
            //kada na zadnjoj stranici nakon brisanja treba maknuti stranicu
            props.page.pageNumber !== 1 &&
            props.page.pageNumber - 1 === props.page.pages.length
          ) {
            props.page.setPageNumber(props.page.pageNumber - 1);
          }
        }
      }
    );
  }

  setId(id) {
    runInAction(() => (this.id = id));
  }
  getComments(id) {
    if (id !== 0) {
      onSnapshot(
        query(collection(db, "Comments"), where("coinId", "==", id)),
        (doc) => {
          const comments = doc.docs.map((item) => ({
            ...item.data(),
            id: item.id,
          }));
          runInAction(() => {
            this.comments = comments;
            if (!this.pageComments.length) {
              this.setPageComments(5, 0);
            }
          });
        }
      );
    }
  }
  setEditAction() {
    this.editAction = false;
  }
  getCoinName(id) {
    getDocs(query(collection(db, "Crypto"))).then((value) => {
      const test = [];
      value.docs.map((item) => {
        if (item.id === id) {
          test.push(item.data().name);
        }
        return null;
      });
      runInAction(() => {
        this.coinName = test;
      });
    });
  }
  getCoinNames() {
    getDocs(query(collection(db, "Crypto"))).then((value) => {
      const test = value.docs.map((item) => ({
        name: item.data().name,
        id: item.id,
      }));
      runInAction(() => {
        this.coinNames = test;
      });
    });
  }
  setPageComments(iT, iF) {
    let indexTo = iT;
    let indexFrom = iF;
    const pageComments = [];
    if (indexTo > this.comments.length) {
      for (indexFrom; this.comments.length > indexFrom; indexFrom++) {
        pageComments.push(this.comments[indexFrom]);
      }
      this.pageComments = pageComments;
    } else {
      for (indexFrom; indexTo > indexFrom; indexFrom++) {
        pageComments.push(this.comments[indexFrom]);
      }
      this.pageComments = pageComments;
    }
    console.log(pageComments);
  }
}

export default CommentStore;

import { makeAutoObservable } from "mobx-react";

class User {
  userLogedIn = false;

  constructor() {
    makeAutoObservable(this);
  }

  setUserLogedIn(bool) {
    this.userLogedIn = bool;
  }
}

export default new User();

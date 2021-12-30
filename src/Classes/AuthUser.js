import { makeAutoObservable } from "mobx";
import { makePersistable, getPersistedStore } from "mobx-persist-store";

class AuthUser {
  userAuth = false;

  constructor() {
    makeAutoObservable(this);
    makePersistable(this, {
      name: "UserAuth",
      properties: ["userAuth"],
      storage: window.localStorage,
    });
  }

  async getStoredData() {
    return getPersistedStore(this);
  }

  setUserAuth(bool) {
    this.userAuth = bool;
  }
}

export default new AuthUser();

import { makeAutoObservable } from "mobx";

class Timer {
  timerId1 = "";
  timerId2 = "";
  timerId3 = "";
  timerId4 = "";

  constructor() {
    makeAutoObservable(this);
  }

  setTestId1(newId) {
    this.timerId1 = newId;
  }
  setTestId2(newId) {
    this.timerId2 = newId;
  }
  setTestId3(newId) {
    this.timerId3 = newId;
  }
  setTestId4(newId) {
    this.timerId4 = newId;
  }
}

export default Timer;

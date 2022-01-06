import { makeAutoObservable } from "mobx";

class Style {
  value;
  display;
  color;
  borderColor;

  constructor() {
    makeAutoObservable(this);
  }

  setValue(id, value) {
    this.value = document.getElementById(id).value = value;
  }

  setDisplay(id, display) {
    this.display = document.getElementById(id).style.display = display;
  }

  setColor(id, color) {
    this.color = document.getElementById(id).style.color = color;
  }

  setBorderColor(id, borderColor) {
    this.borderColor = document.getElementById(id).style.borderColor = borderColor;
  }
}

export default new Style();

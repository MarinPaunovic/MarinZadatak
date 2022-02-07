import { inject, observer } from "mobx-react";
import React from "react";
import EditStore from "./EditStore";

class Edit extends React.Component {
  render() {
    const edit = this.props.edit;
    return (
      <>
        {
          <div className="EditWrapper">
            <label>Name</label>
            <input
              value={edit.name}
              onChange={(e) => edit.setName(e.target.value)}
            ></input>
            <label>Tag</label>
            <input
              value={edit.tag}
              onChange={(e) => edit.setTag(e.target.value)}
            ></input>
            <label>Price</label>
            <input
              value={edit.price}
              onChange={(e) => edit.setPrice(e.target.value)}
            ></input>
            <label>Market Cap</label>
            <input
              value={edit.marketCap}
              onChange={(e) => edit.setMarketCap(e.target.value)}
            ></input>
            <button onClick={() => edit.setEdit(edit.id)}>Edit</button>
          </div>
        }
        <div className={edit.editCompleted ? "CoinEditCompleted" : "NoDisplay"}>
          Coin edited!
        </div>
        <div className={edit.editFailed ? "CoinEditFailed" : "NoDisplay"}>
          All fields must have corresponding values and cannot be empty!
        </div>
      </>
    );
  }
}
export default inject((a, { id }) => ({
  edit: new EditStore(id),
}))(observer(Edit));

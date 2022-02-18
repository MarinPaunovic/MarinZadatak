import React from "react";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import GetComments from "../List/GetComments/GetComments";
class ListItem extends React.Component {
  render() {
    const stores = this.props.stores;
    return (
      <>
        <div className="List" id="ListId">
          {!stores.search.item
            ? stores.crypto.pageList.map((item, i) => (
                <div key={i}>
                  <div className="OneItem">
                    <div>{item.name} </div>
                    <div>{item.tag} </div>
                    <div>{item.price} $</div>
                    <div>{item.marketCap} $ </div>

                    <>
                      {" "}
                      <Link to={`/edit/${item.id}`}>Edit</Link>
                      <button onClick={() => stores.crypto.setDelete(item.id)}>
                        Delete
                      </button>
                    </>
                  </div>
                  <GetComments id={item.id} store={stores.getComment} />
                </div>
              ))
            : stores.search.searchList.map((item, i) => (
                <div key={i}>
                  <div className="OneItem">
                    <div>{item.name} </div>
                    <div>{item.tag} </div>
                    <div>{item.price} $</div>
                    <div>{item.marketCap} $ </div>

                    <>
                      {" "}
                      <Link to={`/edit/${item.id}`}>Edit</Link>
                      <button onClick={() => stores.crypto.setDelete(item.id)}>
                        Delete
                      </button>
                    </>
                  </div>
                  <GetComments id={item.id} store={stores.getComment} />
                </div>
              ))}
        </div>
      </>
    );
  }
}
export default observer(ListItem);

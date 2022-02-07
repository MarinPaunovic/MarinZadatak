import React from "react";
import { observer, inject } from "mobx-react";
import { Link } from "react-router-dom";
import GetComments from "../List/GetComments/GetComments";
class ListItem extends React.Component {
  render() {
    return (
      <>
        <div className="List" id="ListId">
          {!this.props.stores.search.item
            ? this.props.stores.crypto.pageList.map((item, i) => (
                <div key={i}>
                  <div className="OneItem">
                    <div>{item.name} </div>
                    <div>{item.tag} </div>
                    <div>{item.price} $</div>
                    <div>{item.marketCap} $ </div>

                    <>
                      {" "}
                      <Link to={`/edit/${item.id}`}>Edit</Link>
                      <button
                        onClick={() =>
                          this.props.stores.crypto.setDelete(item.id)
                        }
                      >
                        Delete
                      </button>
                    </>
                  </div>
                  <GetComments
                    id={item.id}
                    store={this.props.stores.getComment}
                  />
                </div>
              ))
            : this.props.stores.search.searchList.map((item, i) => (
                <div key={i}>
                  <div className="OneItem">
                    <div>{item.name} </div>
                    <div>{item.tag} </div>
                    <div>{item.price} $</div>
                    <div>{item.marketCap} $ </div>

                    <>
                      {" "}
                      <Link to={`/edit/${item.id}`}>Edit</Link>
                      <button
                        onClick={() => this.state.crypto.setDelete(item.id)}
                      >
                        Delete
                      </button>
                    </>
                  </div>
                  <GetComments
                    id={item.id}
                    store={this.props.stores.getComment}
                  />
                </div>
              ))}
        </div>
      </>
    );
  }
}
export default inject(({ stores }) => ({
  stores,
}))(observer(ListItem));

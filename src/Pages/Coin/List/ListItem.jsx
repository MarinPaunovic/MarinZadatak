import React from "react";
import { observer, inject } from "mobx-react";
import { Link } from "react-router-dom";
import GetComments from "../List/GetComments/GetComments";
class ListItem extends React.Component {
  constructor(props) {
    super(props);
    props.stores.page.setIndex();
    props.stores.crypto.getList(
      props.stores.page.indexTo,
      props.stores.page.indexFrom
    );
  }
  componentDidUpdate(to) {
    if (to.list !== this.props.stores.crypto.list.length) {
      this.props.stores.page.setPageNumber(1);
    }
    if (to.counter !== this.props.stores.order.counter) {
      this.props.stores.crypto.getList(
        this.props.stores.page.indexTo,
        this.props.stores.page.indexFrom,
        this.props.stores.order.order,
        this.props.stores.order.counter
      );
    }
    if (
      to.indexFrom !== this.props.stores.page.indexFrom &&
      to.indexTo !== this.props.stores.page.indexTo
    ) {
      this.props.stores.crypto.setPageList(
        this.props.stores.page.indexTo,
        this.props.stores.page.indexFrom
      );
    }
  }

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

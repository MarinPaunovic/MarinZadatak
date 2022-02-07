import { inject, observer } from "mobx-react";
import React from "react";

class Pagination extends React.Component {
  componentDidUpdate(to) {
    if (to.length !== this.props.length) {
      this.props.stores.page.getPages(this.props.length);
    }
  }
  render() {
    const page = this.props.stores.page;
    return (
      <div className="Pagination">
        {page.pages.map((index, x) => {
          return (
            <button
              key={x}
              onClick={() => {
                page.setPageNumber(index);
              }}
              style={
                page.pageNumber == index
                  ? {
                      borderStyle: "solid",
                      borderWidth: "0.7px",
                      borderRadius: "3px",
                    }
                  : undefined
              }
            >
              {index}
            </button>
          );
        })}
      </div>
    );
  }
}
export default inject(({ stores }) => ({
  stores,
}))(observer(Pagination));

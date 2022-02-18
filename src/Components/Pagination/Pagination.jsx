import { observer } from "mobx-react";
import React from "react";
import Page from "./PaginationStore";
class Pagination extends React.Component {
  constructor(props) {
    super(props);
    this.page = new Page({
      method: this.props.onPageChange,
      length: this.props.length,
    });
  }
  componentWillUnmount() {
    this.page.setPageNumber(1);
  }
  render() {
    const page = this.page;
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
export default observer(Pagination);

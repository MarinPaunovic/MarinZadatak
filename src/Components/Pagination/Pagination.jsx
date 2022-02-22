import { observer } from "mobx-react";
import React from "react";
import Page from "./PaginationStore";
class Pagination extends React.Component {
  constructor(props) {
    super(props);
    this.page = new Page({
      onChange: this.props.onPageChange,
      index: this.props.index,
      length: this.props.length,
    });
  }
  componentDidUpdate(prev) {
    if (prev.length > this.props.length && this.props.length % 5 == 0) {
      if (this.page.pages.length == this.page.pageNumber) {
        this.page.getPages(this.props.length);
        this.page.setPageNumber(this.page.pageNumber - 1);
      } else {
        this.page.getPages(this.props.length);
      }
    }
    if (prev.length < this.props.length && this.props.length % 5 == 1) {
      this.page.getPages(this.props.length);
    }
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

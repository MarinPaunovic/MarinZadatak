import { observer } from "mobx-react";
import React from "react";

class Pagination extends React.Component {
  render() {
    const page = this.props.page;
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

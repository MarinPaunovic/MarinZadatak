import { SearchItem } from "../Pages/Coin/Search/SearchItem";
import React from "react";
import { ListItem } from "../Pages/Coin/List/ListItem";
import { Pagination } from "../Pages/Coin/Pagination/Pagination";
import { Description } from "../Pages/Coin/Description/Description";

const Homepage = () => {
  return (
    <div className="Homepage">
      <SearchItem />
      <Description />
      <ListItem />
      <Pagination />
    </div>
  );
};

export default Homepage;

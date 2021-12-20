import { SearchItem } from "../Components/SearchItem";
import React from "react";
import { EditItem } from "../Components/EditItem";
import { ListItem } from "../Components/ListItem";
import { Pagination } from "../Components/Pagination";
import { Description } from "../Components/Description";

const Homepage = () => {
  return (
    <div className="Homepage">
      <EditItem />
      <SearchItem />
      <Description/>
      <ListItem />
      <Pagination/>

    </div>
  );
};

export default Homepage;

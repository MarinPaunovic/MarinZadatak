import OrderBy from "./OrderBy";

export const Description = () => {
  const setOrderBy = (choice) => {
    OrderBy.setOrder(choice);
    OrderBy.setCounter(OrderBy.counter + 1);
  };
  return (
    <div className="Description">
      <button onClick={() => setOrderBy("name")}>Name</button>
      <button onClick={() => setOrderBy("tag")}>Tag</button>
      <button onClick={() => setOrderBy("price")}>Price</button>
      <button onClick={() => setOrderBy("marketCap")}>Market cap</button>
    </div>
  );
};

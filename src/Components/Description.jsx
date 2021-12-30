import OrderBy from "../Classes/OrderBy";

export const Description = () => {
  const setOrderBy = (choice) => {
    OrderBy.setOrder(choice);
    OrderBy.setCounter(OrderBy.Counter + 1);
  };
  return (
    <div className="Description">
      <button onClick={() => setOrderBy("Ime")}>Name</button>
      <button onClick={() => setOrderBy("Kratica")}>Tag</button>
      <button onClick={() => setOrderBy("Price")}>Price</button>
      <button onClick={() => setOrderBy("MarketCap")}>Market cap</button>
    </div>
  );
};

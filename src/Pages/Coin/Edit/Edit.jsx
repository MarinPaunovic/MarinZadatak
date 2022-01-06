import { useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../db/firebase";
import { useState, useEffect } from "react";

export const Edit = () => {
  const { editid } = useParams();
  const [name, setName] = useState("");
  const [tag, setTag] = useState("");
  const [price, setPrice] = useState("");
  const [marketCap, setMarketCap] = useState("");

  useEffect(() => {
    return getDoc(doc(db, "Crypto", editid)).then((value) => {
      setName(value.data().name);
      setTag(value.data().tag);
      setPrice(value.data().price);
      setMarketCap(value.data().marketCap);
    });
  }, []);

  const clickEdit = (e) => {
    e.preventDefault();
    updateDoc(doc(db, "Crypto", editid), {
      name: name,
      tag: tag,
      price: price,
      marketCap: marketCap,
    });
  };

  return (
    <div>
      <input defaultValue={name} onChange={(e) => setName(e.target.value)}></input>
      <input defaultValue={tag} onChange={(e) => setTag(e.target.value)}></input>
      <input defaultValue={price} onChange={(e) => setPrice(e.target.value)}></input>
      <input defaultValue={marketCap} onChange={(e) => setMarketCap(e.target.value)}></input>
      <button onClick={clickEdit}>Edit</button>
    </div>
  );
};

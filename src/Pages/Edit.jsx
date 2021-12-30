import { useParams } from "react-router-dom";
import { doc, getDoc, updateDoc} from "firebase/firestore";
import { db } from "../db/firebase";
import {useState, useEffect} from "react";


export const Edit = ()=>{

const {editid} = useParams();
const[ime,setIme]=useState("");
const[kratica,setKratica]=useState("");
const[price,setPrice]=useState("");
const[marketCap,setMarketCap]=useState("");


useEffect(()=>{
return getDoc(doc(db,"Crypto",editid)).then((value)=>{
    setIme(value.data().Ime)
    setKratica(value.data().Kratica)
    setPrice(value.data().Price)
    setMarketCap(value.data().MarketCap)
})})

const clickEdit = (e)=>{
    e.preventDefault();
    console.log(ime,kratica,price,marketCap,editid)
    updateDoc(doc(db,"Crypto",editid),{
        Ime:ime,
        Kratica:kratica,
        Price:price,
        MarketCap:marketCap,
    })
}


return<div>
      <input defaultValue={ime} onChange={(e)=>setIme(e.target.value)}></input>
      <input defaultValue={kratica} onChange={(e)=>setKratica(e.target.value)}></input>
      <input defaultValue={price} onChange={(e)=>setPrice(e.target.value)}></input>
      <input defaultValue={marketCap} onChange={(e)=>setMarketCap(e.target.value)}></input>
      <button onClick={clickEdit}>Edit</button>

        </div>;
}
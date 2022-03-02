import React from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { auth, db, provider } from "../firebase-config";

import { useEffect, useState } from "react";
import Header from "./Header";
import { addDoc, collection, getDoc, doc, updateDoc, arrayUnion } from "firebase/firestore";

export default function WatchListitem(props){
    console.log("lol")
    let navigate = useNavigate()
    const [img_url, updateUrl] = useState("");
  const [anime, updateAnime] = useState([]);
  useEffect(() => {
      console.log(props.id)
    fetch(`https://api.jikan.moe/v4/anime/${props.id}`)
      .then((res) => res.json())
      .then((data) => {
          console.log(data.data)
        updateAnime(data.data);
        const img_obj = data.data.images.jpg.image_url;
        updateUrl(img_obj);
      });
  }, []);

  function handleClick(){
    navigate(`/${props.id}`)
  }

  return(
    <div className="singleWatchitem">
    <div className="left">
      <img src={img_url} onClick={handleClick}></img>
    </div>
    <div className="right">
      <h1 onClick={handleClick}>{anime.title}</h1>
      <div className="details">
        <p>
          {anime.type} ({anime.ep} eps)
        </p>
        <p>Scored {anime.score}</p>
        <p>{anime.member} members</p>
      </div>
    </div>
  </div>
  )
}
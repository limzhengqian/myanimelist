import React from "react";
import { useParams } from "react-router-dom";
import { auth, db, provider } from "../firebase-config";

import { useEffect, useState } from "react";
import Header from "./Header";
import { addDoc, collection, getDoc, doc, updateDoc, arrayUnion } from "firebase/firestore";

export default function WatchListitem(props){
    console.log("lol")
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

  return(
      <div>
          <img src={img_url} alt="hehe"></img>
          <h1>{anime.title}</h1>
      </div>
  )
}
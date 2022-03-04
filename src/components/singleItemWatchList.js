import React from "react";
import {useNavigate } from "react-router-dom";
import { auth, db } from "../firebase-config";

import { useEffect, useState } from "react";
import {
  doc,
  updateDoc,
  arrayRemove,
} from "firebase/firestore";

export default function WatchListitem(props) {
  let navigate = useNavigate();
  const [img_url, updateUrl] = useState("");
  const [anime, updateAnime] = useState([]);
  useEffect(() => {
    console.log(props.id);
    fetch(`https://api.jikan.moe/v4/anime/${props.id}`)
      .then((res) => res.json())
      .then((data) => {
        updateAnime(data.data);
        const img_obj = data.data.images.jpg.image_url;
        updateUrl(img_obj);
      });
  }, [props]);

  function handleClick() {
    navigate(`/${props.id}`);
  }

  async function handleRemove() {
    if (auth.currentUser) {
      const docRef = doc(db, "USER", auth.currentUser.uid);
      await updateDoc(docRef,{
        watchList: arrayRemove(props.id)
      })
      props.updateRefresh(true);
    }
  }

  return (
    <div className="singleWatchitem">
      <div className="left">
        <img src={img_url} onClick={handleClick} alt="img"></img>
      </div>
      <div className="right">
        <h1 onClick={handleClick}>{anime.title}</h1>
        <h2 onClick={handleClick}>{anime.title_japanese}</h2>
        <div className="details">
          <p>
            {anime.type} ({anime.ep} eps)
          </p>
          <p>Scored {anime.score}</p>
          <p>{anime.members} members</p>
          <button onClick={handleRemove} className="removeList">❌</button>
        </div>
      </div>
    </div>
  );
}

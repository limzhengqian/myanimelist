import React from "react";
import { useParams } from "react-router-dom";
import { auth, db, provider } from "../firebase-config";

import { useEffect, useState } from "react";
import Header from "./Header";
import {
  addDoc,
  collection,
  getDoc,
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
export default function SingleCard() {
  const [img_url, updateUrl] = useState("");
  const [anime, updateAnime] = useState([]);
  const [isWatchList,updatestatewatchlist] = useState(false)
  const [disable, setDisable] = useState(false);
  let params = useParams();
  // if (auth.currentUser) {
  //   // console.log("yes")
  //   const docRef = doc(db, "USER", auth.currentUser.uid);
  //   async function getUserList() {
  //     const docSnap = await getDoc(docRef);
  //     const arrWatcList=docSnap.data().watchList
  //     // console.log(docSnap.data().watchList)
  //     for(let i=0;i<arrWatcList.length;i++){
  //       if(arrWatcList[i].toString() === params.id.toString()){
  //         console.log("Hello")
  //         updatestatewatchlist(true)
  //         console.log(isWatchList)

  //         break
  //       }
  //     }
  //   }
  //   getUserList();
  // }
  if (auth.currentUser) {
    const docRef = doc(db, "USER", auth.currentUser.uid);
    async function getUserList() {
      const docSnap = await getDoc(docRef);
      const arrWatcList=docSnap.data().watchList
      for(let i=0;i<arrWatcList.length;i++){
        if(arrWatcList[i].toString() === params.id.toString()){
          updatestatewatchlist(true)
          break
        }
      }
    }
    getUserList();
  }
  useEffect(() => {
console.log(isWatchList)
    

    fetch(`https://api.jikan.moe/v4/anime/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        updateAnime(data.data);
        const img_obj = data.data.images.jpg.image_url;
        updateUrl(img_obj);
      });
  }, [disable]);

  // const userDb = doc(db,"USER",anime.mal_id)
  const addToList = async () => {
    const currentDoc = doc(db, "USER", auth.currentUser.uid);
    await updateDoc(currentDoc, {
      watchList: arrayUnion(anime.mal_id),
    });
    setDisable(true)
  };

  return (
    <div className="singleContent">
      <div className="TitleDiv">
        <h1 className="titleAnime">{anime.title}</h1>
        <p className="subtitle">
          {anime.title_english} / ({anime.title_japanese})
        </p>
      </div>
      <div className="contentDiv">
        <div className="leftside">
          <img className="imgAnime" src={img_url} alt="ntg"></img>
        </div>
        <div className="rightside">
          <div className="ratingdetail">
            <div className="score">
              <p>Score</p>
              <h1>{anime.score}</h1>
              <p>{anime.scored_by} users</p>
            </div>
            <div className="vl"></div>
            <div className="rank">
              <h1>Ranked #{anime.rank}</h1>
            </div>
            <div className="popularity">
              <h1>Popularity #{anime.popularity}</h1>
            </div>
            <div className="member">
              <h1>Members {anime.members}</h1>
            </div>
          </div>
          <div className="syn">
            <h1>Synopsis</h1>
            <hr></hr>
            <p>{anime.synopsis}</p>
          </div>
          {auth.currentUser && !isWatchList && (
            <div className="watchlist">
              <button onClick={addToList} disabled={disable}>Add to watch list</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { auth, db } from "../firebase-config";
import Card from "./card";
import WatchListitem from "./singleItemWatchList";

export default function WatchList() {
  const location = useLocation();
  let locationElement;
  const [img_url, updateUrl] = useState("");
  const [anime, updateAnime] = useState([]);

  locationElement = location.state.watchList.map((item) => {
    console.log(item);
    return <WatchListitem id={item} />;
  });

  return <div className="watchlist">{locationElement}</div>;
}

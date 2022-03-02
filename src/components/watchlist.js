import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { auth, db } from "../firebase-config";
import Card from "./card";
import WatchListitem from "./singleItemWatchList";

export default function WatchList() {
  const location = useLocation();
  let watchListElement;
  const [img_url, updateUrl] = useState("");
  const [anime, updateAnime] = useState([]);
  const [watchList, updateWatchList] = useState([]);
  const [refresh,updateRefresh] = useState(false)
  useEffect(() => {
    if (auth.currentUser) {
      const docRef = doc(db, "USER", auth.currentUser.uid);
      async function getUserList() {
        const docSnap = await getDoc(docRef);
        updateWatchList(docSnap.data().watchList.reverse());
      }
      getUserList();
    }
  }, [auth.currentUser && refresh]);

  useEffect(()=>{
    if(refresh){
      updateRefresh(false)
      window.location.reload(true)
    }
  },[refresh])
  watchListElement = watchList.map((item) => {
    return <WatchListitem id={item} updateRefresh={updateRefresh} />;
  });

  return <div className="watchlist">{watchListElement}</div>;
}

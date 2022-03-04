import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState  } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase-config";
import WatchListitem from "./singleItemWatchList";

export default function WatchList() {
  let watchListElement;
  let navigate = useNavigate()
  // let history = useHistory();
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
      navigate("/watchList",{replace:true})
    }
  },[refresh])

  watchListElement = watchList.map((item) => {
    return <WatchListitem id={item} updateRefresh={updateRefresh} />;
  });

  return <div className="watchlist">{watchListElement}</div>;
}

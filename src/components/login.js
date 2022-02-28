import React, { useEffect, useState } from "react";
import { auth, db, provider } from "../firebase-config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { addDoc, collection, getDocs,setDoc, doc } from "firebase/firestore";
import { async } from "@firebase/util";

export default function Login({ setIsAuth }) {
  const [allUSer, importUser] = useState([]);
  const navigate = useNavigate();
  const userCollection = collection(db, "USER");

  useEffect(() => {
    async function getUser() {
      const data = await getDocs(userCollection);
      importUser(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }
    getUser();
  }, []);

  const createUser = async () => {
    await setDoc(doc(db,"USER",auth.currentUser.uid),{
        email:auth.currentUser.email,
        searchList:[],
        watchList:[]
    })
    // await addDoc(userCollection, {
    //   email: auth.currentUser.email,
    //   id: auth.currentUser.uid,
    //   watchlist: [],
    //   searchlist: [],
    // });
  };
  const signInWithGoogle = async () => {
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem("isAuth", true);
      localStorage.setItem("uid",auth.currentUser.uid)
      setIsAuth(true);
      console.log("UID: "+auth.currentUser.uid)
      if (allUSer.length == 0) {
        createUser();
      } else {
        let check = false;
        for (let i = 0; i < allUSer.length; i++) {
          if (allUSer[i].email === auth.currentUser.email) {
            check = true;
            break;
          }
        }
        if (!check) {
          createUser();
        }
      }
      navigate("/");
    });
  };
  return (
    <div className="login-page">
      <img src="/logo1.png" className="logo"></img>
      <div className="headdsc">
        <h1>Welcome to MyAnimeList</h1>
        <p>
          Sign in to store anime to your collection and get recommended anime of
          your own
        </p>
      </div>
      <div className="loginbtn">
        <button className="btnforl" onClick={signInWithGoogle}>
        <img className="glogo" src="https://img.icons8.com/color-glass/64/000000/google-logo.png"/>
          Sign in with Google</button>
      </div>
    </div>
  );
}

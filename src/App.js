import React from "react";
import { Routes, Route } from "react-router-dom";
import SingleCard from "./components/single-card";
import Result from "./components/searchResult";
import Content from "./components/Content";
import Login from "./components/login";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { auth, db } from "./firebase-config";
import WatchList from "./components/watchlist";
import { doc, getDoc } from "firebase/firestore";

export default function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [user, updateUser] = useState({
    name: "Guest",
    imgUrl:
      "https://pluspng.com/img-png/png-user-icon-circled-user-icon-2240.png",
  });
  let navigate = useNavigate();
  const [displayOption, chgDisplay] = useState(false);
  const signOutUser = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      signOut(auth).then(() => {
        localStorage.clear();
        setIsAuth(false);
      });
    }
  };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        updateUser({ name: user.displayName, imgUrl: user.photoURL });
      } else {
        updateUser({
          name: "Guest",
          imgUrl:
            "https://pluspng.com/img-png/png-user-icon-circled-user-icon-2240.png",
        });
      }
    });
  }, [auth]);

  function dropdown() {
    chgDisplay(!displayOption);
  }

  function signinGoogle() {
    navigate("/login");
  }

  function goWatchList() {
    const docRef = doc(db, "USER", auth.currentUser.uid);
    async function getUserList() {
      const docSnap = await getDoc(docRef);
      console.log(docSnap.data().watchList);
      navigate("/watchlist", {
        state: { watchList: docSnap.data().watchList },
      });
    }
    getUserList();
  }

  window.onclick = function (event) {
    if (!event.target.matches(".dropbtn") && displayOption) {
      chgDisplay(!displayOption);
    }
  };

  return (
    <div>
      <div id="navbar">
        <nav className="navbar-nav">
          <Link to="/" className="animelist-header">
            <h1 className="title">MyAnimeList</h1>
          </Link>
          <div className="user">
            <img
              src={user.imgUrl}
              alt="randomimg"
              className="userImg"
              referrerPolicy="no-referrer"
            ></img>
            <h1 className="username">
              {user.name}
              <div className="dropdown">
                <button className="dropbtn" onClick={dropdown}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-caret-down-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                  </svg>
                </button>
                {displayOption && (
                  <div id="myDropdown" className="dropdown-content">
                    {localStorage.getItem("isAuth") ? (
                      <a onClick={signOutUser}>Logout</a>
                    ) : (
                      <a onClick={signinGoogle}>Login</a>
                    )}
                    {localStorage.getItem("isAuth") && (
                      <a onClick={goWatchList}>WatchList</a>
                    )}
                  </div>
                )}
              </div>
            </h1>
          </div>
        </nav>
      </div>
      <Routes>
        <Route path="/" element={<Content />}></Route>
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />}></Route>
        <Route path="/:id" element={<SingleCard />} />
        <Route path="/search/:name" element={<Result />}></Route>
        <Route path="/watchlist" element={<WatchList />}></Route>
      </Routes>
    </div>
  );
}

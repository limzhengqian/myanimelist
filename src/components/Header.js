import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import { signOut } from "firebase/auth";
import { auth } from "../firebase-config";
export default function Header(props, {setIsAuth}) {
  let navigate = useNavigate();
  const location = useLocation();

  const [displayOption, chgDisplay] = useState(false);
  const signOutUser = () => {
    signOut(auth).then(() => {
      localStorage.clear()
      setIsAuth(false)
      console.log(props.isAuth)
    })
  };

  function dropdown() {
    chgDisplay(!displayOption);
  }

  function signinGoogle() {
    navigate("/login");
  }

  window.onclick = function (event) {
    if (!event.target.matches(".dropbtn") && displayOption) {
      chgDisplay(!displayOption);
    }
  };

  return (
    <div id="navbar">
      <nav className="navbar-nav">
        <Link to="/" className="animelist-header">
          <h1 className="title">MyAnimeList</h1>
        </Link>
        <div className="user">
          <img
            alt="randomimg"
            className="userImg"
            referrerPolicy="no-referrer"
          ></img>
          <h1 className="username">
            {auth.currentUser.displayName}
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
              <div id="myDropdown" className="dropdown-content">
                {props.isAuth ? (
                  <button onClick={signinGoogle}>Login</button>
                ) : (
                  <button onClick={signOutUser}>Logout</button>
                )}
              </div>
            </div>
          </h1>
        </div>
      </nav>
    </div>
  );
}

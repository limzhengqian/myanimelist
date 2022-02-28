import { useState } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import { useNavigate } from "react-router-dom";

export default function GoogleLoginComponent() {
  let navigate = useNavigate();
  const [loginUser, updateUser] = useState("");
  const handleFailure = (result) => {
    console.log(result);
    alert(result);
  };

  const handleLogin = (googleData) => {
    console.log(googleData);
    updateUser(googleData.Ju.tf);
    navigate("/", {
      state: {
        name: googleData.profileObj.name,
        id: googleData.profileObj.googleId,
        imgUrl: googleData.profileObj.imageUrl,
      },
    });
  };

  return (
    <div>
      <h1>React Google Login App</h1>
      {loginUser !== "" && <h1>Welcome {loginUser}</h1>}
      <div>
        <GoogleLogin
          clientId="781131934194-q761e4bfvet21mf22s7a9f85jgnas346.apps.googleusercontent.com"
          buttonText="Log in with Google"
          onSuccess={handleLogin}
          onFailure={handleFailure}
          cookiePolicy={"single_host_origin"}
          accessType="online"
        ></GoogleLogin>
      </div>
    </div>
  );
}

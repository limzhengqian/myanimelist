import { Link, Outlet, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
export default function SearchItem(params) {
  let navigate = useNavigate();
  function handleClick() {
    navigate(`/${params.id}`);
  }
  return (
    <div className="singleitem">
      <div className="left">
        <img src={params.imgUrl} onClick={handleClick}></img>
      </div>
      <div className="right">
        <h1 onClick={handleClick}>{params.title}</h1>
        <div className="details">
          <p>
            {params.type} ({params.ep} eps)
          </p>
          <p>Scored {params.score}</p>
          <p>{params.member} members</p>
        </div>
        <div className="detaildsc">
          <p>{params.desc}</p>
        </div>
      </div>
    </div>
  );
}

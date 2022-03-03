import {useNavigate } from "react-router-dom";
export default function SearchItem(params) {
  let navigate = useNavigate();
  function handleClick() {
    navigate(`/${params.id}`);
  }
  return (
    <div className="singleitem">
      <div className="left">
        <img src={params.imgUrl} onClick={handleClick} alt="img"></img>
      </div>
      <div className="right">
        <h1 onClick={handleClick}>{params.title}</h1>
        <h2>{params.jpTitle}</h2>
        <div className="details">
          <p>
            {params.type} ({params.ep>0?params.ep:0} eps)
          </p>
          <p>Scored {params.score}</p>
          <p>{params.member} members</p>
          <p>[{params.status}]</p>
        </div>
      </div>
    </div>
  );
}

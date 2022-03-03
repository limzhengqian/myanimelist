import { Link, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function Card(props){

  let navigate = useNavigate();
  function handleClick(){
    navigate(`/${props.id}`)
  }
    return(
        <div className="card">
        <img onClick={handleClick}  src={props.imgUrl} className="card--image" alt="Anime" />
        <div className="card--stats">
          <Link to={`/${props.id}`} key={props.id} className="Anime-title">{props.title}</Link>
          <span className="gray">{props.mal_id}</span>
        </div>
        <Outlet />
      </div>
    )
}
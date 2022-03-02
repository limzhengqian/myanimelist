import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import Card from "./card";
import Header from "./Header";
import SearchItem from "./searchItem";

export default function Result(){
    let params = useParams();
    const [searchResult, updateResult] = useState([]);
    useEffect(() => {
        fetch(`https://api.jikan.moe/v3/search/anime?q=${params.name}&limit=30`)
          .then((res) => res.json())
          .then((data) => 
          {
              
            updateResult(data.results)
          });
      },[]);

      const searchElement =  searchResult.map(datas => {
          console.table(datas)
          return(
              <SearchItem member={datas.members} ep={datas.episodes} title={datas.title} id={datas.mal_id} imgUrl={datas.image_url} desc={datas.synopsis} type={datas.type} score={datas.score}/>
          )
      })


    return (
        <div className="displayResult">
            <h1>Search Results of {params.name}</h1>
            <hr></hr>
            {searchElement}
        </div>
    )
}
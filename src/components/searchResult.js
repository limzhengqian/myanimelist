import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import SearchItem from "./searchItem";

export default function Result(){
    let params = useParams();
    const [searchResult, updateResult] = useState([]);
    useEffect(() => {
        fetch(`https://api.jikan.moe/v4/anime?q=${params.name}&sfw&order_by=popularity&min_score=1`)
          .then((res) => res.json())
          .then((data) => 
          {
            updateResult(data.data)
          });
      },[]);

      const searchElement =  searchResult.map(datas => {
          console.table(datas)
          return(
              <SearchItem member={datas.members} ep={datas.episodes} title={datas.title} id={datas.mal_id} imgUrl={datas.images.jpg.image_url} desc={datas.synopsis} type={datas.type} score={datas.score} status={datas.status} jpTitle={datas.title_japanese}/>
          )
      })


    return (
        <div className="displayResult">
            <h1 className="searchBigTitle">Search Results of {params.name}</h1>
            <hr></hr>
            {searchResult.length>0?searchElement:<h1 className="searchBigTitle">No Result Found</h1>}
        </div>
    )
}
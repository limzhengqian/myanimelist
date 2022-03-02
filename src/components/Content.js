import Card from "./card";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDataCurrentSeason, getTopAnimeData } from "./data";
import Header from "./Header";

export default function Content() {
  let navigate = useNavigate();
  const [allAnime, updateAnime] = useState([]);
  const [currentSeason, updateSeason] = useState("");
  const [currentYear, updateYear] = useState(0);
  const [searchName, updateName] = useState("");
  const [topAnime, updateTop] = useState([]);
  const handleSubmit = (event) => {
    navigate(`/search/${searchName}`);
  };

  function handleChange(event) {
    const { name, value } = event.target;
    updateName(value);
  }

  useEffect(() => {
    const d = new Date();
    let month = d.getMonth();
    updateYear(d.getFullYear());
    if (month >= 1 && month <= 3) updateSeason("Winter");
    else if (month >= 4 && month <= 6) updateSeason("Spring");
    else if (month >= 7 && month <= 9) updateSeason("Summer");
    else updateSeason("Fall");

    getDataCurrentSeason().then((data) => {
      updateAnime(data.data);
    });

    getTopAnimeData().then((data) => {
      updateTop(data.data);
    });
  }, []);

  const animeElement = allAnime.map((datas) => {
    // let arrCard = []
    // for( let i=0;i<datas.entry.length;i++){
    //    arrCard.push(<Card title={datas.entry[i].title} id={datas.entry[i].mal_id} imgUrl={datas.entry[i].images.jpg.image_url} />)
    // }
    // return arrCard;
    return (
      <Card
        title={datas.title}
        id={datas.mal_id}
        imgUrl={datas.images.jpg.image_url}
      />
    );
  });

  const topAnimeElement = topAnime.map((datas) => {
    return (
      <Card
        title={datas.title}
        id={datas.mal_id}
        imgUrl={datas.images.jpg.image_url}
      />
    );
  });

  return (
    <div>

      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Search.."
          onChange={handleChange}
          name="search-result"
          value={searchName}
        ></input>
        <button type="submit">🔍</button>
      </form>
      <div className="top-content">
        <header className="top-content-header">
          <h1>
            {currentSeason} {currentYear} Anime
          </h1>
        </header>
        <section className="top-anime-card-list">{animeElement}</section>
      </div>
      <div className="top-content">
        <header className="top-content-header">
          <h1>Top Anime</h1>
        </header>
        <section className="top-anime-card-list">{topAnimeElement}</section>
      </div>
    </div>
  );
}

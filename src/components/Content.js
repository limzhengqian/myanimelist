import Card from "./card";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDataCurrentSeason, getTopAnimeData } from "./data";
//localStorage.setItem("refreshCounter",0)
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

  const updateData = () => {
      getDataCurrentSeason().then((data) => {
        updateAnime(data.data);
      });
      getTopAnimeData().then((data) => {
        updateTop(data.data);
      });
     
    }
  

  useEffect(() => {
    const d = new Date();
    let month = d.getMonth()+1;
    updateYear(d.getFullYear());
    if (month >= 1 && month <= 3) updateSeason("Winter");
    else if (month >= 4 && month <= 6) updateSeason("Spring");
    else if (month >= 7 && month <= 9) updateSeason("Summer");
    else updateSeason("Fall");
    updateData();
    const intervalId = setInterval(updateData, 60000); // 60000 milliseconds = 1 minute

    // Cleanup the interval when the component unmounts to prevent memory leaks
    return () => clearInterval(intervalId);
  }, []);

  const animeElement = allAnime.map((datas) => {
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

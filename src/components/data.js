

export const getDataCurrentSeason = () => fetch("https://api.jikan.moe/v4/seasons/now")
.then(response => response.json())


export const getTopAnimeData = () => fetch("https://api.jikan.moe/v4/top/anime")
.then(response => response.json())


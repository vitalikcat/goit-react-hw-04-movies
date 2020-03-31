import axios from 'axios';

const KEY = 'e20119b92c04fa8f0a03b4993a47ca97';

export const getTrendingMovies = () => {
  const url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${KEY}`;
  return axios.get(url);
};

export const getMoviesWithQuery = query => {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${KEY}&language=en-US&query=${query}&page=1&include_adult=false`;
  return axios.get(url);
};

export const getMovieWithId = id => {
  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${KEY}&language=en-US`;
  return axios.get(url);
};

export const getCasts = id => {
  const url = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${KEY}`;
  return axios.get(url);
};

export const getReviews = id => {
  const url = `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${KEY}&language=en-US&page=1`;
  return axios.get(url);
};

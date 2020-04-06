export const movieMapper = movie => {
  const imgUrl = 'https://image.tmdb.org/t/p/w400';
  const {
    poster_path: image,
    title,
    popularity: userScore,
    overview,
    genres,
  } = movie;
  return {
    image: image ? imgUrl + image : image,
    title,
    userScore: Math.round(userScore),
    overview,
    genres: genres.map(({ name }) => name).join(' '),
  };
};

export const castMapper = items => {
  const imgUrl = 'https://image.tmdb.org/t/p/w400';
  return items.map(({ id, profile_path: image, name, character }) => ({
    id,
    image: image ? imgUrl + image : image,
    name,
    character,
  }));
};

export const trendingMapper = items => {
  return items.map(({ id, title }) => ({
    id,
    title,
  }));
};

export const reviewsMapper = items => {
  return items.map(({ id, author, content }) => ({
    id,
    author,
    content,
  }));
};

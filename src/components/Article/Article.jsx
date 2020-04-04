import React from 'react';
import PropTypes from 'prop-types';
import styles from '../Article/Article.module.css';

const Article = ({ movieData, onGoback }) => {
  const { title, image, userScore, overview, genres } = movieData;

  return (
    <div className={styles.ArticleWrapper}>
      <button type="button" className={styles.Button} onClick={onGoback}>
        Go back
      </button>
      <article className={styles.Article}>
        <img src={image} alt="" width="200px" />
        <div className={styles.Description}>
          <h2>{title}</h2>
          <span>User Score: {userScore}</span>
          <h3>Overview</h3>
          <p>{overview}</p>
          <h4>Genres</h4>
          <p>{genres}</p>
        </div>
      </article>

      <div className={styles.Addition}></div>
    </div>
  );
};

Article.propTypes = {
  movieData: PropTypes.object.isRequired,
  onGoback: PropTypes.func.isRequired,
};

export default Article;

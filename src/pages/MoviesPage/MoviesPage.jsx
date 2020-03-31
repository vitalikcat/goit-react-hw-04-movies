import React, { Component } from 'react';
import ArticlesList from '../../components/ArticlesList/ArticlesList';
import styles from './MoviesPage.module.css';
import queryString from 'query-string';
import * as moviesAPI from '../../services/movies-api';

const mapper = items => {
  return items.map(({ id, title }) => ({
    id,
    title,
  }));
};

export default class MoviesPage extends Component {
  state = {
    movies: null,
    query: '',
  };

  componentDidMount() {
    const { location } = this.props;

    if (location.search) {
      const params = queryString.parse(location.search).query;
      this.getMovies(params);
    }
  }

  componentWillUnmount() {
    this.setState({ movies: null });
  }

  getMovies = query => {
    const { history, location } = this.props;

    moviesAPI
      .getMoviesWithQuery(query)
      .then(({ data }) => this.setState({ movies: mapper(data.results) }))
      .catch(error => console.log(error));

    history.push({
      ...location,
      search: `query=${query}`,
    });
  };

  handleChange = event => {
    const { value } = event.target;

    this.setState({ query: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { query } = this.state;
    this.getMovies(query);
  };

  render() {
    const { query, movies } = this.state;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            onChange={this.handleChange}
            value={query}
            type="text"
            className={styles.Input}
          ></input>
          <button type="submit">Search</button>
        </form>

        {movies && <ArticlesList items={movies} />}
      </div>
    );
  }
}

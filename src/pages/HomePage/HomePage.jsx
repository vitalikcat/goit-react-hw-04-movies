import React, { Component } from 'react';
import ArticlesList from '../../components/ArticlesList/ArticlesList';
import * as API from '../../services/movies-api';

const mapper = items => {
  return items.map(({ id, title }) => ({
    id,
    title,
  }));
};

export default class HomePage extends Component {
  state = {
    articles: null,
  };

  componentDidMount() {
    this.getArticles();
  }
  componentWillUnmount() {
    this.setState({ articles: null });
  }

  getArticles = () => {
    API.getTrendingMovies()
      .then(({ data }) => this.setState({ articles: mapper(data.results) }))
      .catch(error => console.log(error));
  };

  render() {
    const { articles } = this.state;

    return (
      <div>
        <h1>Trending today</h1>
        {articles && <ArticlesList items={articles} />}
      </div>
    );
  }
}

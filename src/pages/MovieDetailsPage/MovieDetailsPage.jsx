import React, { Component, lazy, Suspense } from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import Article from '../../components/Article/Article';
import styles from '../MovieDetailsPage/MovieDetailsPage.module.css';
import * as API from '../../services/movies-api';

const mapper = movie => {
  const imgUrl = 'https://image.tmdb.org/t/p/w400';
  const {
    poster_path: image,
    title,
    popularity: userScore,
    overview,
    genres,
  } = movie;
  return {
    image: imgUrl + image,
    title,
    userScore: Math.round(userScore),
    overview,
    genres: genres.map(({ name }) => name).join(' '),
  };
};

const AsyncCast = lazy(() =>
  import('../../components/Cast/Cast' /* webpackChunkName: "cast" */),
);

const AsyncReviews = lazy(() =>
  import('../../components/Reviews/Reviews' /* webpackChunkName: "reviews" */),
);

export default class MovieDetailsPage extends Component {
  state = {
    movieData: {},
    locationFrom: null,
  };

  componentDidMount() {
    const { match, location } = this.props;
    const { movieId } = match.params;

    API.getMovieWithId(movieId)
      .then(({ data }) => this.setState({ movieData: mapper(data) }))
      .catch(error => {
        Error({
          text: error,
        });
      });

    if (location.state && location.state.from) {
      this.setState({
        locationFrom: location.state.from,
      });
    }
  }

  componentWillUnmount() {
    this.setState({ movieData: {} });
  }

  handleGoback = () => {
    const { history } = this.props;
    const { locationFrom } = this.state;

    if (locationFrom) {
      history.push({ ...locationFrom });
    } else {
      history.push('/movies');
    }
  };

  render() {
    const { movieData } = this.state;
    const { match } = this.props;
    const { movieId } = match.params;

    return (
      <div>
        {movieData && (
          <Article movieData={movieData} onGoback={this.handleGoback} />
        )}

        <div className={styles.Wrapper}>
          <h5 className={styles.H5}>Additional information</h5>
          <ul>
            <li>
              <NavLink to={`${match.url}/cast`} className={styles.Link}>
                Cast
              </NavLink>
            </li>
            <li>
              <NavLink to={`${match.url}/reviews`} className={styles.Link}>
                Reviews
              </NavLink>
            </li>
          </ul>
        </div>

        <Suspense fallback={<p>Loading...</p>}>
          <Switch>
            <Route
              path={`${match.url}/cast`}
              render={() => <AsyncCast id={movieId} />}
              id={movieId}
            />
            <Route
              path={`${match.url}/reviews`}
              render={() => <AsyncReviews id={movieId} />}
              id={movieId}
            />
          </Switch>
        </Suspense>
      </div>
    );
  }
}

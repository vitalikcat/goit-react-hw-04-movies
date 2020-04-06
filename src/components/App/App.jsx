import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';

const AsyncHome = lazy(() =>
  import('../../pages/HomePage/HomePage' /* webpackChunkName: "home-page" */),
);

const AsyncMovieDetailsPage = lazy(() =>
  import(
    '../../pages/MovieDetailsPage/MovieDetailsPage' /* webpackChunkName: "moviedetail-page" */
  ),
);

const AsyncMoviesPage = lazy(() =>
  import(
    '../../pages/MoviesPage/MoviesPage' /* webpackChunkName: "movies-page" */
  ),
);

const App = () => (
  <div>
    <Navigation />

    <Suspense fallback={<p>Loading...</p>}>
      <Switch>
        <Route path="/" exact component={AsyncHome} />
        <Route path="/movies/:movieId" component={AsyncMovieDetailsPage} />
        <Route path="/movies" component={AsyncMoviesPage} />
      </Switch>
    </Suspense>
  </div>
);

export default App;

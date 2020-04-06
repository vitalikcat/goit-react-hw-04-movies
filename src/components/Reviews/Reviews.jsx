import React, { Component } from 'react';
import styles from '../Reviews/Reviews.module.css';
import NotFound from '../../components/NotFound/NotFound';
import { reviewsMapper } from '../../functions/mappers';
import * as API from '../../services/movies-api';

export default class Reviews extends Component {
  state = {
    reviews: [],
  };

  componentDidMount() {
    const { id } = this.props;

    API.getReviews(id)
      .then(({ data }) =>
        this.setState({ reviews: reviewsMapper(data.results) }),
      )
      .catch(error => {
        Error({
          text: error,
        });
      });
  }
  componentWillUnmount() {
    this.setState({ reviews: [] });
  }

  render() {
    const { reviews } = this.state;

    return (
      <div>
        {!!reviews.length && (
          <ul className={styles.Ul}>
            {reviews.map(({ id, author, content }) => (
              <li key={id}>
                <p className={styles.p}>Author: {author}</p>
                <p>{content}</p>
              </li>
            ))}
          </ul>
        )}
        {reviews.length === 0 && <NotFound />}
      </div>
    );
  }
}

import React, { Component } from 'react';
import styles from '../Cast/Cast.module.css';
import * as API from '../../services/movies-api';

const mapper = items => {
  const imgUrl = 'https://image.tmdb.org/t/p/w400';
  return items.map(({ id, profile_path: image, name, character }) => ({
    id,
    image: image ? imgUrl + image : image,
    name,
    character,
  }));
};

export default class Cast extends Component {
  state = {
    cast: [],
  };

  componentDidMount() {
    const { id } = this.props;

    API.getCasts(id)
      .then(({ data }) =>
        this.setState({ cast: mapper(data.cast.slice(0, 6)) }),
      )
      .catch(error => {
        Error({
          text: error,
        });
      });
  }

  componentWillUnmount() {
    this.setState({ cast: [] });
  }

  render() {
    const { cast } = this.state;

    return (
      <div>
        <ul className={styles.Ul}>
          {!!cast.length &&
            cast.map(({ id, image, name, character }) => (
              <li key={id}>
                <img src={image} alt="" width="100" height="150" />
                <p>{name}</p>
                <p>{character}</p>
              </li>
            ))}
        </ul>
      </div>
    );
  }
}

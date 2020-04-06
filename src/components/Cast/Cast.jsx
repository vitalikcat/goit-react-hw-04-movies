import React, { Component } from 'react';
import styles from '../Cast/Cast.module.css';
import { castMapper } from '../../functions/mappers';
import * as API from '../../services/movies-api';

export default class Cast extends Component {
  state = {
    cast: [],
  };

  componentDidMount() {
    const { id } = this.props;

    API.getCasts(id)
      .then(({ data }) =>
        this.setState({ cast: castMapper(data.cast.slice(0, 6)) }),
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

import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './ArticlesList.module.css';

const ArticlesList = ({ items, location }) => (
  <div>
    <ul>
      {items.map(({ id, title }) => (
        <li key={id} className={styles.Li}>
          <Link
            to={{
              pathname: `/movies/${id}`,
              state: { from: location },
            }}
            className={styles.Link}
          >
            {title}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

ArticlesList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};
export default withRouter(ArticlesList);

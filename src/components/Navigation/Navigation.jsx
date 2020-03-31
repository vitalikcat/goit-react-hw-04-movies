import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';

const Navigation = () => (
  <div className={styles.Wrapper}>
    <ul className={styles.Ul}>
      <li className={styles.Li}>
        <NavLink
          to="/"
          exact
          activeClassName={styles.ActiveLink}
          className={styles.Link}
        >
          Home
        </NavLink>
      </li>
      <li className={styles.Li}>
        <NavLink
          to="/movies"
          activeClassName={styles.ActiveLink}
          className={styles.Link}
        >
          Movies
        </NavLink>
      </li>
    </ul>
  </div>
);

export default Navigation;

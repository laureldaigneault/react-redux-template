import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import settings from 'utils/settings';
import styles from './style.module.scss';

const EmptyLayout = ({ children, lightLogo, darkLogo }) => {
  return (
    <div className={styles.base}>
      <Link to={settings.DEFAULT_ROUTE}>
        {lightLogo && <img className={styles.logo} alt="website white logo" src={require('assets/logo-white.png')} />}
        {darkLogo  && <img className={styles.logo} alt="website black logo" src={require('assets/logo-black.png')} />}
      </Link>
      {children}
    </div>
  )
}

EmptyLayout.propTypes = {
  displayLogo: PropTypes.bool,
  isPrivate: PropTypes.bool
};


export default EmptyLayout;

import React from 'react';
import PropTypes from 'prop-types';
import Navigation from 'components/Navigation';
import styles from './style.module.scss';

const MainLayout = ({ children, noOffset }) => {
  return (
    <div className={styles.base}>
      <Navigation/>
      {children}
    </div>
  )
}

MainLayout.propTypes = {}

export default MainLayout;

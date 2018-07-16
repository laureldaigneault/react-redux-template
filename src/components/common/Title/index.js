import React from 'react';
import PropTypes from 'prop-types';
import styles from './style.module.scss';

const Title = ({ children, className, state, size }) => {
  const getClasses = () => {
    const classes = [styles.base];

    if (state && styles['state-' + state]) {
      classes.push(styles['state-' + state]);
    }

    if (className) {
      classes.push(className);
    }

    if (size && styles['size-'+size]) {
      classes.push(styles['size-'+size]);
    }

    return classes.join(' ');
  }
  return (
    <div className={getClasses()}>
      {children}
    </div>
  )
}

Title.propTypes = {
  size: PropTypes.string,
  state: PropTypes.string
};

export default Title;

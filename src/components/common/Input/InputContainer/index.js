import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './style.module.scss';

const InputContainer = ({ children, stretch, align }) => {
  const getClasses = () => {
    const classes = [styles.base];

    if (stretch) {
      classes.push(styles.stretch);
      if (align && styles[align]) {
        classes.push(styles[align]);
      }
    }

    return classes.join(' ');
  }
  return (
    <div className={getClasses()}>
      {children}
    </div>
  );
}

InputContainer.propTypes = {
  stretch: PropTypes.bool, //to make the container stretch in the parent
  align: PropTypes.string  //align children in a specific way (center or left)
}


export default InputContainer;

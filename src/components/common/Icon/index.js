import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Fa from 'react-fontawesome';
import styles from './style.module.scss';

const Icon = ({ className, name, size }) => {
  return (
    <Fa className={[styles.base, className].join(' ')} size={size?size:'1x'} name={name} />
  )
}

export default Icon;

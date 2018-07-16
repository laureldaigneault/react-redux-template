import React, { Component } from 'react';
import styles from './style.module.scss';

class Link extends Component {
  getClasses = () => {
    const classes = [styles.base];
    const { state } = this.props;

    if (state && styles['state-' + state]) {
      classes.push(styles['state-' + state]);
    }

    return classes.join(' ');
  }
  render() {
    const { onClick } = this.props;
    return (
      <a onClick={onClick} className={this.getClasses()}>{this.props.children}</a>
    )
  }
}

export default Link;

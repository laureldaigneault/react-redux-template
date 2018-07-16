import React, { Component } from 'react';
import styles from './style.module.scss';

class AppLoading extends Component {
  getClasses = () => {
    const classes = [styles.base];
    const { visible } = this.props;

    if (visible) {
      classes.push(styles.visible);
    }

    return classes.join(' ');
  }
  render() {
    return (
      <div className={this.getClasses()}>
        <p>Loading</p>
      </div>
    )
  }
}

export default AppLoading;

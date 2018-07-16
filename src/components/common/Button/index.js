import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './style.module.scss';

class Button extends Component {
  getButtonClasses = () => {
    const classes = [styles.base]
    const { state, flex, className, shadow } = this.props

    if (state && styles['state-' + state]) {
      classes.push(styles['state-' + state]);
    }

    if (className) {
      classes.push(className);
    }

    if (flex) {
      classes.push(styles.flex);
    }

    if (shadow) {
      classes.push(styles.shadow);
    }

    return classes.join(' ');
  }

  render() {
    return (
      <div className={this.getButtonClasses()} onClick={this.props.onClick}>
        {this.props.children}
      </div>
    )
  }
}

Button.defaultProps = {
  onClick: null,
  state: 'primary'
};

Button.propTypes = {
  onClick: PropTypes.func,
  shadow: PropTypes.bool,
  state: PropTypes.string,
  flex: PropTypes.bool
};

export default Button;

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/common/Icon';
import globalStyles from '../style.module.scss';
import styles from './style.module.scss';

class InputText extends Component {
  getContainerClasses = () => {
    const classes = [styles.container];
    const { flex, margin, className, icon, iconPosition } = this.props;

    if (flex) {
      classes.push(styles.flex);
    }

    return classes.join(' ');
  }
  getInputClasses = () => {
    const classes = [globalStyles.base, styles.base];
    const { flex, margin, className, icon, iconPosition, big, giant, shadow } = this.props;

    if (className) {
      classes.push(className);
    }
    if (margin && styles['margin-' + margin]) {
      classes.push(styles['margin-' + margin]);
    }
    if (icon && iconPosition && styles['iconPosition-' + iconPosition]) {
      classes.push(styles['iconPosition-' + iconPosition]);
    }

    if (big) {
      classes.push(globalStyles.big);
    }

    if (giant) {
      classes.push(globalStyles.giant);
    }

    if (shadow) {
      classes.push(styles.shadow);
    }

    return classes.join(' ');
  }
  getIconClasses = () => {
    const classes = [styles.icon];
    const { icon, iconPosition } = this.props;

    if (icon && iconPosition && styles['icon-' + iconPosition]) {
      classes.push(styles['icon-' + iconPosition]);
    }

    return classes.join(' ');
  }
  onChangeHandler = e => {
    const { id, onChange } = this.props;
    if (onChange) {
      onChange({
        id,
        value: e.target.value,
        event: e
      });
    }
  }
  focus = () => {
    const { id } = this.props;
    this.refs[id].focus();
  }

  render() {
    const { id, placeholder, icon, mask, value, maxLength, onKeyPress, disabled } = this.props;
    return (
      <div className={this.getContainerClasses()}>
        <input
          type={mask?'password':'text'}
          placeholder={placeholder}
          className={this.getInputClasses()}
          onChange={this.onChangeHandler}
          value={value || ''}
          maxLength={maxLength}
          onKeyPress={onKeyPress}
          disabled={disabled}
          ref={id}
        />
        {icon && (
          <Icon className={this.getIconClasses()} name={icon}/>
        )}
      </div>
    )
  }
}

InputText.propTypes = {
  mask: PropTypes.bool,
  big: PropTypes.bool,
  icon: PropTypes.string,
  iconPosition: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  flex: PropTypes.bool,    //to flex the input in its container
  margin: PropTypes.string //either left or right
}

export default InputText;

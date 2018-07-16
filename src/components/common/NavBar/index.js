import React, { Component } from 'react';
import PropTypes from 'prop-types';
import history from 'utils/history';
import { Link } from 'react-router-dom';
import styles from './style.module.scss';

class NavBar extends Component {
  getClasses = () => {
    const classes = [styles.base];
    const { sticky, align } = this.props;

    if (sticky) {
      classes.push(styles.sticky);
    }

    if (align && styles['align-' + align]) {
      classes.push(styles['align-' + align]);
    }

    return classes.join(' ');
  }
  render() {
    const { items, onSelect, selectedItem } = this.props;
    return (
      <div className={this.getClasses()}>
        <ul>
          {items.map(item => <NavBarItem key={item.path} item={item} isSelected={selectedItem===item.name} onClick={onSelect}/>)}
        </ul>
      </div>
    )
  }
}

const NavBarItem = ({ item, isSelected, onClick }) => {
  const onClickHandler = () => {
    if (onClick) {
      onClick(item.name);
    }
  }
  const tabActive = isSelected || history.location.pathname === item.path;
  const classes = [styles.tab, tabActive?styles.selectedTab:''].join(' ');
  return (
    <Link to={item.path} onClick={onClickHandler}>
      <li className={classes}>
        {item.name}
      </li>
    </Link>
  )
}

NavBar.propTypes = {
  sticky: PropTypes.bool,
  align: PropTypes.string
};

export default NavBar;

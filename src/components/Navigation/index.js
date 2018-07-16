import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { sessionSelectors, sessionOperations } from 'ducks/session';
import { Link } from 'react-router-dom';
import history from 'utils/history';
import settings from 'utils/settings';
import styles from './style.module.scss';
import Button from 'components/common/Button';

class Navigation extends Component {
  login = () => {
    history.push(`/login?redirect=${encodeURI(history.location.pathname)}`)
  }
  getNavClasses = () => {
    const classes = [styles.base];
    const { authenticated } = this.props;

    if (authenticated) {
      classes.push(styles.authenticated);
    }

    return classes.join(' ');
  }

  render() {
    const { authenticated, userData, hideContent } = this.props;
    const items = [
      {
        name: 'Home',
        path: `/home`
      },
      {
        name: 'Support',
        path: `/support`
      }
    ];
    return (
      <div className={this.getNavClasses()}>
        <Link to={settings.DEFAULT_ROUTE}>
          <img className={styles.logo} alt="logo" src={require('assets/logo-black.png')} />
        </Link>
        {!hideContent &&
          <div className={styles.navItemContainer}>
            <ul className={styles.menuList}>
              {items.map(item => <NavigationItem key={item.path} item={item}/>)}
            </ul>
          </div>
        }
        {!hideContent && <div className={styles.userActionsContainer}>
          {authenticated && <Button state={'secondary'} onClick={() => this.props.logout(settings.DEFAULT_ROUTE)}>Logout</Button>}
          {!authenticated && <Button state={'secondary'} onClick={this.login}>Login</Button>}
        </div>}
      </div>
    )
  }
}

const NavigationItem = ({ item }) => {
  const tabActive = history.location.pathname.split('/')[1] === item.path.split('/')[1];
  const classes = [styles.menuItem, tabActive?styles.menuItemSelected:''].join(' ');
  return (
    <Link to={item.path}>
      <li className={classes}>
        {item.name}
      </li>
    </Link>
  )
}

const mapStateToProps = state => {
  return {
    authenticated: sessionSelectors.isAuthenticated(state),
    userData: sessionSelectors.getUserData(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: (redirectBefore) => dispatch(sessionOperations.logout(redirectBefore))
  }
}

Navigation.propTypes = {
  hideContent: PropTypes.bool
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);

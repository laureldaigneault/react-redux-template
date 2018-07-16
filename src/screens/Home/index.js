import React, { Component } from 'react';
import { connect } from 'react-redux';
import MainLayout from 'components/layouts/MainLayout';
import styles from './style.module.scss';

class Home extends Component {
  state = {};

  render() {
    return (
      <MainLayout>
        <div className={styles.base}>
          <div className={styles.content}>
            Home
          </div>
        </div>
      </MainLayout>
    );
  }
}

export default Home;

import React, { Component } from 'react';
import { connect } from 'react-redux';
import MainLayout from 'components/layouts/MainLayout';
import styles from './style.module.scss';

class Support extends Component {
  state = {};

  render() {
    return (
      <MainLayout>
        <div className={styles.base}>
          <div className={styles.content}>
            Support
          </div>
        </div>
      </MainLayout>
    );
  }
}

export default Support;

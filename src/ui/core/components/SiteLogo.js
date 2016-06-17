import React, {Component} from 'react';
import styles from './SiteLogo.less';

export default class SiteLogo extends Component {
  render() {
    return (
      <div className={styles.siteLogo}>
        <h2>React - Redux</h2>
      </div>
    );
  }
}

import React, { Component } from 'react';
import Posts from '../post/Posts';

export default class Dashboard extends Component {
  render() {
    return (
      <div>
        <Posts limit={ 5 } />
      </div>
    );
  }
}

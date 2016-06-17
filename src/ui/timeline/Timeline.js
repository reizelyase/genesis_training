import React, { Component, PropTypes } from 'react';
import Posts from '../post/Posts';
import { connect } from 'react-redux';

@connect(
  state => ({ auth: state.auth })
)

export default class timeline extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      filter: {
        userId: true
      }
    };
  }

  render() {
    return (
      <div>
        <Posts filter={ this.state.filter } />
      </div>
    );
  }
}

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { signUpUser, forceLogin } from 'redux/modules/auth';
import SignUpForm from './SignUpForm';
import styles from '../core/Login.less';

@connect(
  state => ({auth: state.auth}),
  { signUpUser, forceLogin }
)

export default class SignUp extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    signUpUser: PropTypes.func.isRequired,
    forceLogin: PropTypes.func.isRequired,
  }

  handleSubmit(formData) {
    this.props.signUpUser(formData.firstName, formData.lastName, formData.email, formData.password);
  }

  render() {
    const { auth } = this.props;
    const errors = [];
    const successMessages = [];
    if (auth.get('isError')) {
      errors.push(
        <div
          key="error"
          className="alert alert-danger"
          role="alert">
          { auth.get('err') }
        </div>
      );
    }

    if (auth.get('isSignedUp')) {
      successMessages.push(
        <div
          key="success"
          className="alert alert-success"
          role="alert">
          Successfully signed up!
        </div>
      );
    }

    return (
      <div className={styles.loginContainer}>
        <div className={styles.loginModule}>
          <div id="{styles#signUpForm}">
            <h1>Sign Up</h1>
            { errors }
            { successMessages }
            <SignUpForm onSubmit={this.handleSubmit.bind(this)} />
          </div>
        </div>
      </div>
    );
  }
}

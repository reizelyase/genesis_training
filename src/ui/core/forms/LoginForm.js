import React, {Component, PropTypes} from 'react';
import { reduxForm } from 'redux-form';
import validate from 'validate.js';
import { Button } from 'react-bootstrap';
import RFBSInput from '../components/RFBSInput';

const constraints = {
  email: {
    presence: true,
    email: {
      message: 'must be a valid email address'
    }
  },
  password: {
    presence: true
  }
};

@reduxForm({
  form: 'login',
  fields: ['email', 'password'],
  validate: data => validate(data, constraints) || {}
})
export default class LoginForm extends Component {

  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired
  };

  render() {
    const {
      fields: {
        email,
        password
      },
      handleSubmit,
      invalid
    } = this.props;

    return (
      <div>
        <form>
          <RFBSInput type="text" label="Email Address" field={email} />
          <RFBSInput type="password" label="Password" field={password} />
          <div className="form-group inline">
            <Button type="submit" className="pull-left" bsStyle="primary" onClick={handleSubmit} disabled={invalid}>Log In</Button>
            <a href="/signup" className="btn btn-link pull-right">Sign Up</a>
          </div>
        </form>
      </div>
    );
  }
}

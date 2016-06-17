import React, {Component, PropTypes} from 'react';
import { reduxForm } from 'redux-form';
import validate from 'validate.js';
import { Button } from 'react-bootstrap';
import RFBSInput from '../core/components/RFBSInput';

const constraints = {
  firstName: {
    presence: true
  },
  lastName: {
    presence: true
  },
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
  form: 'signup',
  fields: ['firstName', 'lastName', 'email', 'password'],
  validate: data => validate(data, constraints) || {}
})
export default class SignUpForm extends Component {

  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired
  };

  render() {
    const {
      fields: {
        firstName,
        lastName,
        email,
        password
      },
      handleSubmit,
      invalid
    } = this.props;

    return (
      <div>
        <form>
          <RFBSInput type="text" label="Firstname" field={firstName} />
          <RFBSInput type="text" label="Lastname" field={lastName} />
          <RFBSInput type="text" label="Email Address" field={email} />
          <RFBSInput type="password" label="Password" field={password} />
          <div className="form-group inline">
            <Button type="submit" className="pull-left" bsStyle="primary" onClick={handleSubmit} disabled={invalid}>Sign Up</Button>
            <a href="/" className="btn btn-link pull-right">Already have an account? Log in here</a>
          </div>
        </form>
      </div>
    );
  }
}

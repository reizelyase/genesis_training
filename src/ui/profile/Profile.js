import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import styles from './profile.less';

@connect(
  state => ({ auth: state.auth })
)

export default class Posts extends Component {

  static propTypes = {
    auth: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      ...props.auth
    };
  }

  editProfile = () => {
    this.setState({ editMode: true });
  }

  viewProfile = () => {
    this.setState({ editMode: false });
  }

  handleChange = () => {
    if (!this.state.editMode) {
      this.setState({ editMode: true });
    }
  }

  render() {
    return (
      <div className={styles.profileContainer}>
        <h1>Profile</h1>
        <div className="row">
          <div className="col-md-4">
            <div className={ styles.profileInfo + ((this.state.editMode) ? ' hidden' : '') }>
              <table className="table">
                <tbody>
                  <tr>
                    <td>
                      <strong>Firstname</strong> { this.props.auth.get('user').get('firstName') }
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Lastname</strong> { this.props.auth.get('user').get('lastName') }
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Email Address</strong> { this.props.auth.get('user').get('email') }
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <form className={ (!this.state.editMode) ? 'hidden' : '' }>
              <div className="form-group">
                <label className="control-label">First Name</label>
                <input type="text" className="form-control" defaultValue={ this.props.auth.get('user').get('firstName') } />
              </div>
              <div className="form-group">
                <label className="control-label">Last Name</label>
                <input type="text" className="form-control" defaultValue={ this.props.auth.get('user').get('lastName') } />
              </div>
              <div className="form-group">
                <label className="control-label">Email Address</label>
                <input type="text" className="form-control" defaultValue={ this.props.auth.get('user').get('email') } />
              </div>
            </form>
            <div className={ styles.formButtons }>
              { (!this.state.editMode) ?
                <button type="button" className="btn btn-primary" onClick={ this.editProfile }><i className="fa fa-pencil"></i> Edit</button>
                :
                <button type="button" className="btn btn-primary" onClick={ this.editProfile }><i className="fa fa-save"></i> Update</button>
              }
              <button type="button" className="btn" onClick={ this.viewProfile }>Cancel</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

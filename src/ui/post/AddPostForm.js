import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import styles from './postForm.less';

@connect(
  state => ({ post: state.post })
)

export default class AddPostForm extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired,
    addPost: PropTypes.func.isRequired,
    editPost: PropTypes.func.isRequired,
    displayPosts: PropTypes.func,
    toggleForm: PropTypes.func.isRequired,
    editMode: PropTypes.bool,
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string
  }

  constructor(props) {
    super(props);
    this.state = {
      changed: false,
      title: props.title,
      description: props.description,
      image: props.image
    };
  }

  handleSubmit = () => {
    if (this.props.id) {
      this.props.editPost(this.refs.title.value, this.refs.description.value, this.props.id);
    } else {
      this.props.addPost(this.refs.title.value, this.refs.description.value, this.refs.imageFile.files[0]);
    }
  }

  handleChange = () => {
    this.setState({ changed: true });
    this.setState({ title: this.refs.title.value });
    this.setState({ description: this.refs.description.value });
  }

  handleFileUpload = () => {
    this.setState({ image: this.refs.imageFile.value });
  }

  toggleForm = () => {
    this.setState({ changed: false });
    this.setState({ title: this.props.title });
    this.setState({ description: this.props.description });
    this.props.toggleForm();
  }

  reloadPosts = () => {
    this.props.toggleForm();
    this.props.displayPosts(' ', true, 25, 0);
  }

  render() {
    const { post } = this.props;
    const errors = [];
    const successes = [];

    if (post.get('isError')) {
      errors.push(
        <div
          key="error"
          className="alert alert-danger"
          role="alert">
          { post.get('err') }
        </div>
      );
    }

    if (post.get('isUpdated')) {
      successes.push(
        <div
          key="success"
          className="alert alert-success"
          role="alert">
          Post successfully updated!
        </div>
      );
    }

    return (
      <form className="inline">
        { errors }
        { successes }
        <div className="form-group">
          <label className="control-label">Title</label>
          <input type="text" className="form-control" ref="title" value={ this.state.title } defaultValue={ this.state.title } onChange={ this.handleChange } />
        </div>
        <div className="form-group">
          <label className="control-label">Description</label>
          <textarea className="form-control" ref="description" value={ this.state.description } defaultValue={ this.state.description } onChange={ this.handleChange }></textarea>
        </div>
        { (!this.props.editMode) ?
        <div className="form-group">
          <label className="control-label">Image</label>
          <input type="file" ref="imageFile" defaultValue="Browse..." onChange={ this.handleFileUpload } />
        </div>
        : ''
        }
        <div className="form-group">
          <input type="button" className={ styles.formButton + ' btn btn-primary'} value="Submit Post" onClick={ this.handleSubmit } />
          { (post.get('isUpdated')) ?
          <button type="button" className={ styles.formButton + ' btn' } onClick={ this.reloadPosts }>Close</button>
          :
          <button type="button" className={ styles.formButton + ' btn' } onClick={ this.toggleForm }>Cancel</button>
          }
        </div>
      </form>
    );
  }
}

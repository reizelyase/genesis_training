import React, {Component, PropTypes} from 'react';
import AddPostForm from './AddPostForm';
import styles from './post.less';

export default class Post extends Component {

  static propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    addPost: PropTypes.func.isRequired,
    editPost: PropTypes.func.isRequired,
    removePost: PropTypes.func.isRequired,
    displayPosts: PropTypes.func.isRequired,
    likePost: PropTypes.func.isRequired,
    liked: PropTypes.bool.isRequired,
    userId: PropTypes.number.isRequired,
    authorId: PropTypes.number.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      liked: props.liked
    };
  }

  toggleForm = () => {
    this.setState({ editMode: !this.state.editMode });
  }

  toggleLikePost = () => {
    this.setState({ liked: !this.state.liked });
    this.props.likePost(this.props.id);
  }

  formatDate = (date) => {
    const dateArr = date.split('T');

    return dateArr[0];
  }

  removePost = () => {
    this.props.removePost(this.props.id);
  }

  render() {
    const editButtonPermits = (this.props.userId === this.props.authorId ) ? <button type="button" className="btn" onClick={ this.toggleForm }><i className="fa fa-pencil"></i> Edit</button> : '';
    const deleteButtonPermits = (this.props.userId === this.props.authorId ) ? <button type="button" className="btn" onClick={ this.removePost }><i className="fa fa-trash"></i> Delete</button> : '';
    return (
      <article className={ styles.post }>
        <div className="row">
          <div className="col-md-3">
            <div className={ styles.imgWrap }>
              <img alt={ this.props.title } src={ this.props.image } className="img-responsive" />
            </div>
          </div>
          <div className="col-md-8">
            <h3>{ this.props.title }</h3>
            <div className={ styles.info }>
              <span><i className="fa fa-calendar"></i>{ this.formatDate(this.props.date) }</span>
              <span><i className="fa fa-user"></i>{ this.props.author }</span>
            </div>
            <p>{ this.props.description }</p>
            <div className={ styles.options }>
              { editButtonPermits }
              { deleteButtonPermits }
              <button type="button" className="btn" onClick={ this.toggleLikePost }><i className="fa fa-thumbs-up"></i> { (this.state.liked) ? 'Liked' : 'Like' }</button>
            </div>
          </div>
        </div>
        <div className={ styles.editPost + ((this.state.editMode) ? '' : ' hidden')}>
          <div className={ styles.postWrap }>
            <div className={ styles.innerWrap }>
              <div className="row">
                <div className="col-md-8">
                  <AddPostForm editMode={ this.state.editMode } toggleForm={ this.toggleForm } {...this.props} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    );
  }
}

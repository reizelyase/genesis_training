import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getPosts, createPost, updatePost, deletePost, likePost } from 'redux/modules/post';
import AddPostForm from './AddPostForm';
import PostListFilter from './PostListFilter';
import PostList from './PostList';
import Pagination from '../core/components/Pagination';
import styles from './posts.less';

@connect(
  state => ({ post: state.post, auth: state.auth }),
  { getPosts, createPost, updatePost, deletePost, likePost }
)

export default class Posts extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
    getPosts: PropTypes.func.isRequired,
    createPost: PropTypes.func.isRequired,
    updatePost: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
    likePost: PropTypes.func.isRequired,
    filter: PropTypes.object,
    limit: PropTypes.number
  }

  constructor(props) {
    super(props);
    this.state = {
      showForm: false,
      search: ' ',
      ascOrder: true,
      limit: (props.limit) ? props.limit : 25,
      offset: 0,
      currentPage: 1
    };
  }

  componentDidMount() {
    this.displayPosts(this.state.ascOrder, this.state.limit, this.state.offset);
  }

  setSearch = (searchString) => {
    this.setState({ search: searchString });

    this.setCurrentPage(1);
  }

  getSearch = () => {
    return this.state.search;
  }

  setCurrentPage = (page) => {
    this.setState({ currentPage: page });
  }

  getCurrentPage = () => {
    return this.state.currentPage;
  }

  setOrder = (order) => {
    this.setState({ ascOrder: order });
  }

  getOrder = () => {
    return this.state.ascOrder;
  }

  setLimit = (limit) => {
    this.setState({ limit: limit });
  }

  getLimit = () => {
    return this.state.limit;
  }

  setOffset = (offset) => {
    this.setState({ offset: offset });
  }

  getOffset = () => {
    return this.state.offset;
  }

  updatePost = (title, description, id) => {
    this.props.updatePost(title, description, id);
  }

  displayPosts = (asc, limit, offset, search) => {
    if (search) {
      this.props.getPosts(asc, limit, offset, search);
    } else {
      this.props.getPosts(asc, limit, offset);
    }
  }

  deletePost = (id) => {
    this.props.deletePost(id);
  }

  likePost = (id) => {
    this.props.likePost(id);
  }

  toggleForm = () => {
    this.setState( { showForm: !this.state.showForm } );
  }

  submitPost = (title, description, imageFile) => {
    this.props.createPost(title, description, imageFile);
  }

  render() {
    const { post } = this.props;
    const posts = post.get('posts');
    const postCount = (posts.get('count')) ? posts.get('count') : 0;
    const postRows = (posts.get('rows')) ? posts.get('rows') : {};
    return (
      <div className={ styles.postContainer }>
        <div className={ styles.heading + ' clearfix' }>
          <h1 className="pull-left">Post!</h1>
          <button type="button" className={ (this.state.showForm) ? 'hidden ' : '' + 'btn btn-primary pull-right' } onClick={ this.toggleForm }>Add Post</button>
        </div>
        <div className={ styles.postForm + ((this.state.showForm) ? '' : ' hidden') }>
          <div className="row">
            <div className="col-md-4">
              <AddPostForm toggleForm={ this.toggleForm } addPost={ this.submitPost } editPost={ this.updatePost } />
            </div>
          </div>
        </div>
        <PostListFilter filterPosts={ this.displayPosts } displayPosts= { this.displayPosts } ascOrder={ this.state.ascOrder } limit={ this.state.limit } offset={ this.state.offset } setSearch= { this.setSearch } setOrder= { this.setOrder } setLimit= { this.setLimit } setOffset= { this.setOffset } { ...this.state } />
        { (post.get('isFetching')) ?
            <img className={ styles.loader } alt="Loading" src="http://i.imgur.com/seuaOqf.gif" />
          : <PostList auth={ this.props.auth } posts={ postRows } filter={ this.props.filter } displayPosts={ this.displayPosts } addPost={ this.submitPost } editPost={ this.updatePost } removePost={ this.deletePost } likePost= { this.likePost } />
        }
        { (!this.props.filter) ?
          <Pagination total={ postCount } displayPosts= { this.displayPosts } getSearch= { this.getSearch } getOrder= { this.getOrder } getLimit= { this.getLimit } getOffset= { this.getOffset } setOffset= { this.setOffset } setCurrentPage={ this.setCurrentPage } getCurrentPage= { this.getCurrentPage} />
          : ''
        }
      </div>
    );
  }
}

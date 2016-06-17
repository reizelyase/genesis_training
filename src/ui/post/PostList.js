import React, { Component, PropTypes } from 'react';
import Post from './Post';
import styles from './postList.less';

export default class PostList extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    posts: PropTypes.object.isRequired,
    displayPosts: PropTypes.func.isRequired,
    addPost: PropTypes.func.isRequired,
    editPost: PropTypes.func.isRequired,
    removePost: PropTypes.func.isRequired,
    likePost: PropTypes.func.isRequired,
    filter: PropTypes.object
  }

  render() {
    const user = this.props.auth.get('user');
    const userId = user.get('id');
    const { posts } = this.props;
    const { filter } = this.props;
    return (
      <div className={styles.postList}>
        <div className={ styles.list }>
          { posts.map((item, index) => {
            const User = item.get('User');
            const postLikes = item.get('PostLike');
            let liked = false;
            if (postLikes.count()) {
              postLikes.map((like) => {
                if (liked === false && (like.get('UserId') === userId)) {
                  liked = true;
                }
              });
            }
            if (filter === undefined || (filter !== undefined && filter.userId && userId === item.get('UserId'))) {
              return (
                <Post key={ index } id={item.get('id')} liked={ liked } addPost={this.props.addPost} editPost={ this.props.editPost } removePost={ this.props.removePost } displayPosts={ this.props.displayPosts } likePost={ this.props.likePost } title={item.get('title')} description={item.get('description')} image={item.get('imageUrl')} date={item.get('createdAt')} author={User.get('firstName') + ' ' + User.get('lastName')} authorId={item.get('UserId')} userId={userId} />
              );
            }
          }) }
        </div>
      </div>
    );
  }
}

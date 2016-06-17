import Immutable from 'immutable';

/**
* Private: Initial State
*/

const initialState = new Immutable.fromJS({
  posts: {},
  err: {},
  isError: {},
  isFetching: false
});

/**
* Public: Action Types
*/

export const actionTypes = {
  POST_LIST_REQUEST: 'POST_LIST_REQUEST',
  POST_LIST_COMPLETE: 'POST_LIST_COMPLETE',
  POST_LIST_ERROR: 'POST_LIST_ERROR',

  POST_CREATE_REQUEST: 'POST_CREATE_REQUEST',
  POST_CREATE_COMPLETE: 'POST_CREATE_COMPLETE',
  POST_CREATE_ERROR: 'POST_CREATE_ERROR',

  POST_UPDATE_REQUEST: 'POST_UPDATE_REQUEST',
  POST_UPDATE_COMPLETE: 'POST_UPDATE_COMPLETE',
  POST_UPDATE_ERROR: 'POST_UPDATE_ERROR',

  POST_DELETE_REQUEST: 'POST_DELETE_REQUEST',
  POST_DELETE_COMPLETE: 'POST_DELETE_COMPLETE',
  POST_DELETE_ERROR: 'POST_DELETE_ERROR',

  POST_LIKE_REQUEST: 'POST_LIKE_REQUEST',
  POST_LIKE_COMPLETE: 'POST_LIKE_COMPLETE',
  POST_LIKE_ERROR: 'POST_LIKE_ERROR',
};

/**
 * Public: Action Creators
 */
export function getPosts(asc, limit, offset, search) {
  return (dispatch) => {
    let params = {};
    if (search === '' || search === ' ') {
      params = { asc, limit, offset };
    } else {
      params = { search, asc, limit, offset };
    }
    return dispatch({
      types: [
        actionTypes.POST_LIST_REQUEST,
        actionTypes.POST_LIST_COMPLETE,
        actionTypes.POST_LIST_ERROR
      ],
      promise: (client) => client.get('/posts', {
        params: params
      })
    });
  };
}

export function createPost(title, description, imageFile) {
  return (dispatch, getState) => {
    const token = getState().auth.get('token');
    return dispatch({
      types: [
        actionTypes.POST_CREATE_REQUEST,
        actionTypes.POST_CREATE_COMPLETE,
        actionTypes.POST_CREATE_ERROR
      ],
      promise: (client) => client.post('/posts', {
        data: {
          title,
          description,
          imageFile
        },
        headers: {
          'Accept': 'application/json',
          'Authorization': token
        }
      })
    });
  };
}

export function updatePost(title, description, id) {
  return (dispatch, getState) => {
    const token = getState().auth.get('token');
    return dispatch({
      types: [
        actionTypes.POST_UPDATE_REQUEST,
        actionTypes.POST_UPDATE_COMPLETE,
        actionTypes.POST_UPDATE_ERROR
      ],
      promise: (client) => client.put('/posts/' + id, {
        data: {
          title,
          description
        },
        headers: {
          'Accept': 'application/json',
          'Authorization': token
        }
      })
    });
  };
}

export function deletePost(id) {
  return (dispatch, getState) => {
    const token = getState().auth.get('token');
    return dispatch({
      types: [
        actionTypes.POST_DELETE_REQUEST,
        actionTypes.POST_DELETE_COMPLETE,
        actionTypes.POST_DELETE_ERROR
      ],
      promise: (client) => client.del('/posts/' + id, {
        headers: {
          'Accept': 'application/json',
          'Authorization': token
        }
      }).then(() => {
        dispatch(getPosts(' ', true, 25, 0));
      })
    });
  };
}

export function likePost(id) {
  return (dispatch, getState) => {
    const token = getState().auth.get('token');
    return dispatch({
      types: [
        actionTypes.POST_LIKE_REQUEST,
        actionTypes.POST_LIKE_COMPLETE,
        actionTypes.POST_LIKE_ERROR
      ],
      promise: (client) => client.post('/posts/' + id + '/like', {
        headers: {
          'Accept': 'application/json',
          'Authorization': token
        }
      })
    });
  };
}

 /**
  * Public: Reducer
  */

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {

    case actionTypes.POST_LIST_REQUEST:
      return state.merge({
        posts: { count: 0, rows: [] },
        err: {},
        isError: false,
        isFetching: true
      });

    case actionTypes.POST_LIST_COMPLETE:
      const { result } = action;
      return state.merge({
        posts: result,
        err: {},
        isError: false,
        isFetching: false
      });

    case actionTypes.POST_LIST_ERROR:
      return state.merge({
        err: action.err,
        isError: true,
        isFetching: false
      });

    case actionTypes.POST_CREATE_COMPLETE:
      return state.merge({
        posts: action,
        err: {},
        isError: false,
      });

    case actionTypes.POST_CREATE_ERROR:
      return state.merge({
        post: {},
        err: action.err,
        isError: true,
      });

    case actionTypes.POST_UPDATE_REQUEST:
      return state.merge({
        isUpdated: false
      });

    case actionTypes.POST_UPDATE_COMPLETE:
      return state.merge({
        err: {},
        isError: false,
        isUpdated: true
      });

    case actionTypes.POST_UPDATE_ERROR:
      return state.merge({
        err: action.error.message,
        isError: true,
      });

    case actionTypes.POST_DELETE_COMPLETE:
      return state.merge({
        err: {},
        isError: false,
      });

    case actionTypes.POST_DELETE_ERROR:
      return state.merge({
        err: action.err,
        isError: true,
      });

    default:
      return state;
  }
}

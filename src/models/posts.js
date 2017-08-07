import * as jsonService from '../services/jsonholder';

export default {
  namespace: 'posts',
  state: {
    postsList: [],
    showProgress: true,
  },
  reducers: {
    save(state, { payload: { postsList, showProgress } }) {
      return { ...state, postsList, showProgress };
    },
    resetSpinner(state) {
      return { ...state, showProgress: true };
    },
  },
  effects: {
    *fetch({ payload: { query } }, { call, put }) {
      const { data } = yield call(jsonService.getPostsList);
      if (!data.data) return;
      yield put({ type: 'save', payload: { postsList: data.data, showProgress: false } });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/') {
          dispatch({ type: 'resetSpinner' });
          dispatch({ type: 'fetch', payload: query });
        }
      });
    },
  },
};
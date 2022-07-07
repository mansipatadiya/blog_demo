import { getApi } from "../actions/api";
import {
  FETCH_BLOG_LIST_REQUEST,
  FETCH_BLOG_LIST_SUCCESS,
  FETCH_BLOG_LIST_FAILURE,
} from "../types/blog";

export const fetchBlogListRequest = () => ({
  type: FETCH_BLOG_LIST_REQUEST,
});

export const fetchBlogListSuccess = (data) => ({
  type: FETCH_BLOG_LIST_SUCCESS,
  data,
});

export const fetchBlogListFailure = (error) => ({
  type: FETCH_BLOG_LIST_FAILURE,
  error,
});

export const fetchBlogList = () => (dispatch) => {
  dispatch(fetchBlogListRequest());
  return getApi("api/blog/")
    .then((data) => {
      dispatch(fetchBlogListSuccess(data));
      return data;
    })
    .catch((error) => {
      dispatch(fetchBlogListFailure(error));
    });
};

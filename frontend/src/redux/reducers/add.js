import {
  FETCH_ADD_BLOG_REQUEST,
  FETCH_ADD_BLOG_SUCCESS,
  FETCH_ADD_BLOG_FAILURE,
} from "../types/blog";

let initialState = {
  data: null,
  error: null,
  loading: false,
};

const addBlogReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ADD_BLOG_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_ADD_BLOG_SUCCESS:
      return {
        loading: false,
        data: action.data?.data,
        error: "",
      };
    case FETCH_ADD_BLOG_FAILURE:
      return {
        loading: false,
        data: [],
        error: action.data,
      };
    default:
      return state;
  }
};

export default addBlogReducer;

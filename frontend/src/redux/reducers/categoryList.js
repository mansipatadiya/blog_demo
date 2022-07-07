import {
  FETCH_CATEGORY_LIST_REQUEST,
  FETCH_CATEGORY_LIST_SUCCESS,
  FETCH_CATEGORY_LIST_FAILURE,
} from "../types/blog";



let initialState = {
  data: null,
  error: null,
  loading: false,
};

const categoryListReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CATEGORY_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_CATEGORY_LIST_SUCCESS:
      return {
        loading: false,
        data: action.data?.data,
        error: "",
      };
    case FETCH_CATEGORY_LIST_FAILURE:
      return {
        loading: false,
        data: [],
        error: action.data,
      };
    default:
      return state;
  }
};

export default categoryListReducer;

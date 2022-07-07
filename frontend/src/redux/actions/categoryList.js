import { getApi } from "./api";
import {
  FETCH_CATEGORY_LIST_REQUEST,
  FETCH_CATEGORY_LIST_SUCCESS,
  FETCH_CATEGORY_LIST_FAILURE,
} from "../types/blog";

export const fetchCategoryListRequest = () => ({
  type: FETCH_CATEGORY_LIST_REQUEST,
});

export const fetchCategoryListSuccess = (data) => ({
  type: FETCH_CATEGORY_LIST_SUCCESS,
  data,
});

export const fetchCategoryListFailure = (error) => ({
  type: FETCH_CATEGORY_LIST_FAILURE,
  error,
});

export const fetchCategoryList = () => (dispatch) => {
  dispatch(fetchCategoryListRequest());
  return getApi("api/blog/category-list")
    .then((data) => {
      dispatch(fetchCategoryListSuccess(data));
      return data;
    })
    .catch((error) => {
      dispatch(fetchCategoryListFailure(error));
    });
};

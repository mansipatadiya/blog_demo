import { postApi } from "../actions/api";
import { toast } from "react-toastify";
import {
  FETCH_ADD_BLOG_REQUEST,
  FETCH_ADD_BLOG_SUCCESS,
  FETCH_ADD_BLOG_FAILURE,
} from "../types/blog";

export const fetchAddBlogRequest = () => ({
  type: FETCH_ADD_BLOG_REQUEST,
});

export const fetchAddBlogSuccess = (data) => ({
  type: FETCH_ADD_BLOG_SUCCESS,
  data,
});

export const fetchAddBlogFailure = (error) => ({
  type: FETCH_ADD_BLOG_FAILURE,
  error,
});

export const fetchAddBlog = (formData) => (dispatch) => {
  dispatch(fetchAddBlogRequest());
  return postApi("api/blog/", formData)
    .then((data) => {
      toast.success(data?.data?.message);
      dispatch(fetchAddBlogSuccess(data));
      return data;
    })
    .catch((error) => {
      console.log("🚀 ~ file: add.js ~ line 32 ~ fetchAddBlog ~ error", error)
      toast.error(error?.response?.data?.message);
      dispatch(fetchAddBlogFailure(error));
    });
};

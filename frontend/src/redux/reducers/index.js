import { combineReducers } from "redux";
import addBlogReducer from "./add";
import categoryListReducer from "./categoryList";
import blogListReducer from "./list";

const rootReducer = combineReducers({
  addBlog: addBlogReducer,
  blogList: blogListReducer,
  categoryList:categoryListReducer
});

export default rootReducer;

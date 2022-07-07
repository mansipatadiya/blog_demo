import "./App.css";
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import reduxThunk from "redux-thunk";
import BlogList from "./components/BlogList";
import reducers from "./redux/reducers/index";
import { ToastContainer } from "react-toastify";

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);

const store = createStoreWithMiddleware(reducers);

function App() {
  return (
    <Provider store={store}>
      <BlogList />
      <ToastContainer />
    </Provider>
  );
}

export default App;

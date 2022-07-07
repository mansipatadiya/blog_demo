import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogList } from "../redux/actions/list";
import AddBlogModal from "./AddBlogModal";
import blog from "../utils/blogs.json";
import { isValidArray } from "../utils/utils";
import { Spinner } from "reactstrap";
import moment from "moment";

const BlogList = () => {
  const [isOpen, setISopen] = useState(false);
  const [blogData, setBlogData] = useState([]);
  const [startDate, setStartDate] = useState(null);

  const dispatch = useDispatch();

  const { blogList, loading } = useSelector((state) => ({
    blogList: state.blogList?.data?.data,
    loading: state.blogList.loading,
  }));

  // useEffect(() => {
  //   dispatch(fetchBlogList()).then((data) => {
  //     setBlogData(data?.data?.data);
  //   });
  // }, []);
  useEffect(() => getBlogList(), []);

  const getBlogList = () => {
    dispatch(fetchBlogList()).then((data) => {
      setBlogData(data?.data?.data);
    });
  };


  useEffect(() => {
    if (startDate) {
      const result =
        isValidArray(blogList) &&
        blogList.filter((d) => d?.createdDate === moment(startDate).format("DD/MM/YYYY"));
      setBlogData(result);
    } else setBlogData(blogList);
  }, [startDate]);

  const toggleModal = () => setISopen(!isOpen);

  return (
    <div className="p-5">
      <div className="mb-2 add-blog">
        <div className="d-flex align-items-center">
          <p className="filter-by font-bold">Filter by:-</p>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            isClearable
            placeholderText="Select a date"
          />
        </div>
        <button className="btn btn-primary" onClick={toggleModal}>
          Add Blog
        </button>
      </div>

      <div className="row mt-5">
        {loading && (
          <div className="text-center">
            <Spinner type="grow" color="primary" children={false} />
          </div>
        )}

        {isValidArray(blogData) &&
          !loading &&
          blogData.map((data, index) => (
            <div className="col-4 mb-2" key={index}>
              <div className="list-box">
                <h3>{data?.title}</h3>
                <p>{data?.body}</p>
                <div>
                  <span className="font-bold">Category:-</span>{" "}
                  <span>{data?.category_name}</span>
                </div>
                <p>
                  <span className="font-bold">Created on:-</span>{" "}
                  <span>{data?.createdDate}</span>
                </p>
              </div>
            </div>
          ))}

        {!isValidArray(blogData) && !loading && (
          <p className="empty-record-msg">No records available!!</p>
        )}
      </div>

      {isOpen && <AddBlogModal isOpen={isOpen} toggle={toggleModal} getBlogList={getBlogList}
      />}
    </div>
  );
};

export default BlogList;

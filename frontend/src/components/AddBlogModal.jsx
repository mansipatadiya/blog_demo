import LaddaButton from "@zumper/react-ladda";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { fetchAddBlog } from "../redux/actions/add";
import { fetchCategoryList } from "../redux/actions/categoryList";
import { fetchBlogList } from "../redux/actions/list";
import { blogValidation, displayFormErrors } from "../utils/validation";

const AddBlogModal = ({ isOpen, toggle, getBlogList }) => {

  const dispatch = useDispatch();
  const [categoryList, setCategoryList] = useState([]);

  const categoryOption = categoryList?.map((d) => {
    return {
      key: d?.v_name,
      value: d?.id
    };
  })

  const { loading } = useSelector((state) => ({
    loading: state.addBlog.loading,
    categoryList: state.categoryList?.data?.data,
    categoryListLoading: state.categoryList.loading,
  }));

  useEffect(() => {
    dispatch(fetchCategoryList()).then((data) => {
      setCategoryList(data?.data?.data);
    });
  }, []);

  const handleSubmit = (values) => {
    dispatch(fetchAddBlog(values)).then((data) => {
      if (data?.status === 200)
        getBlogList();
      toggle();
    });
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Add Blog</ModalHeader>
      <Formik
        initialValues={{
          title: "",
          body: "",
          category_id: "",
        }}
        validationSchema={blogValidation}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          submitCount,
          setFieldValue,
        }) => {
          const showError = (key) =>
            displayFormErrors(key, errors, touched, submitCount);

          return (
            <>
              <ModalBody>
                <div className="register-page">
                  <form onSubmit={handleSubmit}>
                    <div className="form-group mb-2">
                      <label>Title</label>
                      <input
                        type="text"
                        className="form-control"
                        name="title"
                        placeholder="Enter title"
                        value={values?.title}
                        onChange={handleChange}
                      />
                    </div>
                    {showError("title")}
                    <div className="form-group mb-2">
                      <label>Description</label>
                      <textarea
                        type="text"
                        className="form-control"
                        name="body"
                        placeholder="Enter description"
                        value={values?.body}
                        onChange={handleChange}
                      />
                    </div>
                    {showError("body")}
                    <div className="form-group mb-2">
                      <label>Select Category</label>
                      <select
                        className="form-control"
                        name="category_id"
                        value={values?.category_id}
                        onChange={handleChange}
                      >
                        <option value="">Choose an option</option>
                        {categoryOption.map((data, index) => (
                          <option key={index} value={data?.value}>
                            {data?.key}
                          </option>
                        ))}
                      </select>
                    </div>
                    {showError("category_id")}
                  </form>
                </div>
              </ModalBody>
              <ModalFooter>
                <LaddaButton
                  loading={loading}
                  onClick={handleSubmit}
                  spinnerSize={30}
                  spinnerColor="#ddd"
                  spinnerLines={12}
                  type="submit"
                  className="btn btn-primary"
                >
                  Add Blog
                </LaddaButton>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={toggle}
                >
                  Cancel
                </button>
              </ModalFooter>
            </>
          );
        }}
      </Formik>
    </Modal>
  );
};

export default AddBlogModal;

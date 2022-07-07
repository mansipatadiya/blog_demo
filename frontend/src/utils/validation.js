import React from "react";
import * as Yup from "yup";

export const displayFormErrors = (
  key = "",
  errors = {},
  touched = {},
  submitCount = 1,
  fieldName = ""
) => {
  if (errors[key] !== undefined && errors[key] && submitCount) {
    return (
      <div className="text-danger input-feedback font12">{errors[key]}</div>
    );
  }
  return null;
};

export const blogValidation = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  body: Yup.string().required("Description is required"),
  category_id: Yup.string().required("Category is required"),
});

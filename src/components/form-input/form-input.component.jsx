import React from "react";

import "./form-input.styles.scss";

const FormInput = ({ handleChange, isSearchInput, ...otherProps }) => (
  <input
    className={`form-input ${isSearchInput ? "search-input" : null}`}
    onChange={handleChange}
    {...otherProps}
  />
);

export default FormInput;

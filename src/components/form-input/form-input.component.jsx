import React from "react";

import "./form-input.styles.scss";

const FormInput = ({ handleChange, ...otherProps }) => (
  <input className="form-input" onChange={handleChange} {...otherProps} />
);

export default FormInput;

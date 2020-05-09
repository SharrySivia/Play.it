import React from "react";

import "./custom-button.styles.scss";

export const CustomButton = ({ children, ...props }) => (
  <button className="custom-button" {...props}>
    {children}
  </button>
);

export default CustomButton;

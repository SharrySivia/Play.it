import React from "react";
import Slider from "@material-ui/core/Slider";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const primaryColor = "#0d0c12";
const theme = createMuiTheme({
  overrides: {
    MuiSlider: {
      thumb: {
        color: primaryColor,
      },
      track: {
        color: primaryColor,
      },
      rail: {
        color: "black",
      },
    },
  },
});

const RangeSlider = ({ handleChange, ...otherProps }) => {
  return (
    <MuiThemeProvider theme={theme}>
      <Slider onChange={handleChange} {...otherProps} />
    </MuiThemeProvider>
  );
};

export default React.memo(RangeSlider);

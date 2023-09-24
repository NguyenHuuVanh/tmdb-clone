import React from "react";
import Tippy from "@tippyjs/react/headless"; // different import path!
import "tippy.js/dist/svg-arrow.css";

const HeadlessTippy = ({link, content, ...props}) => (
  <Tippy
    {...props}
    arrow={"true"}
    render={(attrs) => (
      <div className="box" tabIndex="-1" {...attrs}>
        {content}
      </div>
    )}
  >
    {link}
  </Tippy>
);

export default HeadlessTippy;

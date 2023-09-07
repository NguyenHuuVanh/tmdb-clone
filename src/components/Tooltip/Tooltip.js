import React from "react";
import Tippy from "@tippyjs/react/headless"; // different import path!

const HeadlessTippy = ({link, content, ...props}) => (
  <Tippy
    {...props}
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

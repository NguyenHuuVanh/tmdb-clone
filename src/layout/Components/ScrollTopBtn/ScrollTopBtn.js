import classNames from "classnames/bind";
import React, {useEffect, useState} from "react";
import {BiUpArrowAlt} from "react-icons/bi";
import styles from "./ScrollTopBtn.module.scss";
import {useLocation} from "react-router-dom";

const cx = classNames.bind(styles);

const ScrollTopBtn = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const [activeScrollTopBtn, setActiveScrollTopBtn] = useState(false);

  useEffect(() => {
    const activeScrollTopBtn = () => {
      const scrollOffset = document.documentElement.scrollTop;
      if (scrollOffset > 1000) {
        setActiveScrollTopBtn(true);
      } else {
        setActiveScrollTopBtn(false);
      }
    };

    window.addEventListener("scroll", activeScrollTopBtn);

    return () => window.removeEventListener("scroll", activeScrollTopBtn);
  }, []);

  return (
    <button onClick={scrollToTop} className={cx("scrollBtn", !activeScrollTopBtn && "active")}>
      <BiUpArrowAlt size={35} color="white" className="" />
    </button>
  );
};

export default ScrollTopBtn;

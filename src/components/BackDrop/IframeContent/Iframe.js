import {useEffect, useState} from "react";
import classNames from "classnames/bind";
import styles from "./Iframe.module.scss";
import {MdClose} from "react-icons/md";

const cx = classNames.bind(styles);

const Iframe = ({embedId, onClick, name}) => {
  return (
    <>
      <div className={cx("overlay")}></div>
      <div className={cx("container")}>
        <div className={cx("titleBar")}>
          <span className={cx("title")}>{name}</span>
          <div className={cx("actions")}>
            <a className={cx("button")} onClick={onClick}>
              <span className={cx("icon_close")}>
                <MdClose />
              </span>
            </a>
          </div>
        </div>
        <div className={cx("video")}>
          <iframe
            type="text/html"
            width={609}
            height={342}
            src={`https://www.youtube.com/embed/${embedId}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            frameBorder="0"
            allowFullScreen
            title="Embedded youtube"
          ></iframe>
        </div>
      </div>
    </>
  );
};

export default Iframe;

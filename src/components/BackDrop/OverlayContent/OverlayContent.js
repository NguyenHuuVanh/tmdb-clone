import {useEffect, useState} from "react";
import classNames from "classnames/bind";
import styles from "./Overlay.module.scss";

import {AiFillCaretDown} from "react-icons/ai";
import ApiLinks from "~/services/api/Apis";
import http from "~/services/axios/axios";

const cx = classNames.bind(styles);

const OverlayContent = ({onClick, id, type, images}) => {
  console.log("🚀 ~ OverlayContent ~ dataImages:", images);
  const [dataImages, setDataImages] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);

  // const fetchDataImages = () => {
  //   http
  //     .get(ApiLinks.apiImagesMovie(id, type))
  //     .then((res) => setDataImages(res.data.backdrops))
  //     .catch((error) => console.log(error));
  // };

  const imagesList = images.images.posters.map((image) => {
    return image.file_path;
  });

  const imageHeight = images.images.posters.map((image) => {
    return image.height;
  });

  const imageWidth = images.images.posters.map((image) => {
    return image.width;
  });

  const changeSlice = {
    nextImage: () => {
      setCurrentImage((prevIndex) => (prevIndex + 1) % imagesList.length);
    },
    prevImage: () => {
      setCurrentImage((prevIndex) => (prevIndex - 1 + imagesList.length) % imagesList.length);
    },
  };

  useEffect(() => {}, []);

  return (
    <>
      <div className={cx("overlay")}></div>
      <div className={cx("container", "not-blur")}>
        <div className={cx("lightbox_window")}>
          <section className={cx("content")}>
            <div className={cx("images", "poster")}>
              <a className={cx("wrapper", "next_id")} href="">
                <img
                  className={cx("img")}
                  loading="lazy"
                  width="394"
                  height="591"
                  src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${imagesList[currentImage]}`}
                  alt=""
                  srcSet={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${imagesList[currentImage]} 1x,https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${imagesList[currentImage]} 2x`}
                />
              </a>
              <div className={cx("info", "poster")}>
                <h3>
                  <a className={cx("close", "right")} href="#">
                    <span className={cx("glyphicons_v2", "menu-close")} onClick={onClick}></span>
                  </a>
                </h3>
                <div className={cx("meta")} data-role="tooltip">
                  <h3>
                    Info
                    <span>
                      <span className={cx("glyphicons_v2", "locked", "locked_status")}></span>
                    </span>
                  </h3>

                  <form className={cx("k-form")}>
                    <label className={cx("flex")}>
                      Primary?
                      <span className={cx("glyphicons_v2", "circle-remove", "rimary_status")}></span>
                    </label>

                    <label className={cx("k-form-field")}>Added By</label>
                    <p>
                      <a href="/u/aboorvaa?language=en">someone</a>
                    </p>

                    <label className={cx("k-form-field")}>Size</label>
                    <p className={cx("flex")}>
                      <a
                        href={`https://www.themoviedb.org/t/p/original/${imagesList[currentImage]}`}
                        title="View Original"
                        alt="View Original"
                        target="_blank"
                        rel="noreferrer"
                      >
                        {imageHeight[currentImage]}x{imageWidth[currentImage]}
                      </a>{" "}
                      <span className={cx("glyphicons_v2", "check-sign", "x1", "ratio")}></span>
                    </p>

                    <label className={cx("k-form-field")}>
                      <span className={cx("flex")}>Language</span>
                      <span
                        className={cx("k-widget", "k-dropdown")}
                        unselectable="on"
                        role="listbox"
                        aria-expanded="false"
                        aria-owns="zoomed_image_language_6464e97c9f37b0015cc39f0b_listbox"
                        aria-labelledby="zoomed_image_language_6464e97c9f37b0015cc39f0b_label"
                        aria-live="polite"
                        aria-disabled="true"
                        aria-readonly="false"
                        aria-busy="false"
                        aria-activedescendant="r3441a09-7b9f-4e4d-950d-fdaff6fbfe4c"
                        style={{width: "100%"}}
                        tabIndex={0}
                      >
                        <span unselectable="on" className={cx("k-dropdown-wrap", "k-state-disabled")}>
                          <span
                            id="r3441a09-7b9f-4e4d-950d-fdaff6fbfe4c"
                            unselectable="on"
                            role="option"
                            aria-selected="true"
                            className={cx("k-input")}
                          >
                            English
                          </span>
                          <span unselectable="on" className={cx("k-select")} aria-label="select">
                            <span className={cx("k-icon k-i-arrow-60-down")}>
                              <AiFillCaretDown />
                            </span>
                          </span>
                        </span>
                        <input
                          id="zoomed_image_language_6464e97c9f37b0015cc39f0b"
                          value="en"
                          style={{width: "100%", display: "none"}}
                          data-role="dropdownlist"
                          disabled="disabled"
                        />
                      </span>
                    </label>
                  </form>

                  <div className={cx("tagged_people_wrapper")}>
                    <h3>
                      Tagged People
                      <a className={cx("tag_person")} href="#">
                        <span className={cx("glyphicons_v2", "plus")}></span>
                      </a>
                    </h3>

                    <ul className={cx("tagged_people")}>
                      <li className={cx("no_records")}>No records have been added.</li>
                    </ul>

                    <div className={cx("person_search_wrapper", "hide")}>
                      <input style={{width: "100%"}} />
                    </div>
                  </div>

                  <div className={cx("paging")}>
                    <a className={cx("left", "previous_id-btn")} href="#" onClick={changeSlice.prevImage}>
                      <span className={cx("glyphicons_v2", "arrow-thin-left")}></span>
                    </a>
                    <a className={cx("right", "next_id-btn")} href="#" onClick={changeSlice.nextImage}>
                      <span className={cx("glyphicons_v2", "arrow-thin-right")}></span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default OverlayContent;

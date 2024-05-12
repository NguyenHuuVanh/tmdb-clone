import classNames from "classnames/bind";
import styles from "./PopperLaguage.module.scss";
import {AiFillCaretDown} from "react-icons/ai";

const cx = classNames.bind(styles);

const PopperLaguage = () => {
  return (
    <div className={cx("container")}>
      <div className={cx("tooltip")}>
        <div className={cx("content")}>
          <section className={cx("content")}>
            <div className={cx("tooltip_popup")}>
              <div className={cx("content")}>
                <form className={cx("edit")}>
                  <fieldset>
                    <h2>Language Preferences</h2>
                    <label className={cx("form_field")}>
                      <span>
                        Default Language<span className={cx("right", "reset")}>Reset</span>
                      </span>
                      <span className={cx("dropdown")}>
                        <span unselectable="on" className={cx("dropdown-wrap")}>
                          <span unselectable="on" role="option" aria-selected="true" className={cx("input")}>
                            English (en-US)
                            <span className={cx("k-icon", "k-i-arrow-60-down")}>
                              <AiFillCaretDown />
                            </span>
                          </span>
                        </span>
                      </span>
                      <input
                        style={{width: "100%", display: "none"}}
                        name="default_language_popup"
                        // value="en-US"
                        data-role="dropdownlist"
                        className={cx("input")}
                      ></input>
                    </label>
                    <label className={cx("form_field")}>
                      <span>Fallback Language</span>
                      <span className={cx("dropdown")}>
                        <span unselectable="on" className={cx("dropdown-wrap")}>
                          <span unselectable="on" role="option" aria-selected="true" className={cx("input")}>
                            None (Don't Fallback)
                            <span className={cx("k-icon", "k-i-arrow-60-down")}>
                              <AiFillCaretDown />
                            </span>
                          </span>
                        </span>
                      </span>
                      <input
                        style={{width: "100%", display: "none"}}
                        className={cx("input")}
                        name="default_language_popup"
                        data-role="dropdownlist"
                      ></input>
                      {/* value={"en-US"} */}
                    </label>
                    <p className={cx("refresh")}>
                      <a className={cx("no_click", " button", "rounded", "upcase")} href="#">
                        <span className={cx("glyphicons_v2", "refresh", " invert", " svg")}></span> Reload Page
                      </a>
                    </p>
                  </fieldset>
                </form>
              </div>
            </div>
          </section>
        </div>
        <div className={cx("tooltip_button", "hide")}></div>
        <div className={cx("tooltip_container")}></div>
        <div className={cx("tooltip_container")}></div>
      </div>
    </div>
  );
};

export default PopperLaguage;

import classNames from "classnames/bind";
import styles from "./Option.module.scss";
import useComponentVisible from "~/hooks/useComponentVisible";

const cx = classNames.bind(styles);

const Option = ({translateX, translateY, props}) => {
  const {ref, isComponentVisible, setIsComponentVisible} = useComponentVisible(true);

  const style = {
    transform: `translate(${translateX}%, ${translateY}%)`,
    ...props,
  };
  return (
    <>
      {isComponentVisible && (
        <div className={cx("container")} ref={ref} style={style}>
          <div className={cx("content")}>
            <div className={cx("settings_content")}>
              <div className={cx("wrapper", "no_pad")}>
                <p className={cx("no_hover")}>Want to rate or add this item to a list?</p>
                <p className={cx("hover")}>
                  <a href="/login?language=en">
                    Đăng nhập <span className={cx("glyphicons_v2", "chevron-right", "blue", "pad_left")}></span>
                  </a>
                </p>
              </div>
              <div className={cx("wrapper")}>
                <p className={cx("no_hover")}>Not a member?</p>
                <p className={cx("hover")}>
                  <a href="/signup?language=en">
                    Sign up and join the community{" "}
                    <span className={cx("glyphicons_v2", "chevron-right", "blue", "pad_left")}></span>
                  </a>
                </p>
              </div>
            </div>
          </div>
          <div className={cx("k-tooltip-button", "hide")}>
            <a href="#" className={cx("k-icon", "k-i-close")} title="Close"></a>
          </div>
        </div>
      )}
    </>
  );
};

export default Option;

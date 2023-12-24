import classNames from "classnames/bind";
import styles from "./CardTVShow.module.scss";
import useComponentVisible from "../../../hooks/useComponentVisible";
import Option from "../../Option/Option";
import {NavLink} from "react-router-dom";

const cx = classNames.bind(styles);

const CardTVShow = ({image, title, description, onMouseEnter, onMouseLeave}) => {
  const {ref, isComponentVisible, setIsComponentVisible} = useComponentVisible(false);

  const handleShowOption = () => {
    setIsComponentVisible(true);
  };

  window.addEventListener("scroll", () => {
    setIsComponentVisible(false);
  });

  return (
    <>
      <div className={cx("card", "video", "style_2")}>
        <div className={cx("image")} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
          <div className={cx("wrapper")}>
            <a className={cx("play_traler", "img")} href="#">
              <img className={cx("poster", "backdrop")} src={image} alt={title} />
              <div className={cx("play")}>
                <span className="glyphicons_v2 play invert svg"></span>
              </div>
            </a>
          </div>
          <div className={cx("options")}>
            <NavLink className={cx("no_click")} href="#" onClick={handleShowOption}>
              {!isComponentVisible && <div className="glyphicons_v2 circle-more white"></div>}
            </NavLink>
          </div>
        </div>
        <div className={cx("content")}>
          <h2>
            <a href="/tv/1433?language=vi" title="American Dad!">
              {title}
            </a>
          </h2>
          <h3>{description}</h3>
        </div>
        {isComponentVisible && <div ref={ref}>{<Option translateX={-55} translateY={70} />}</div>}
      </div>
    </>
  );
};

export default CardTVShow;

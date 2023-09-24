import classNames from "classnames/bind";
import styles from "./CardTVShow.module.scss";

const cx = classNames.bind(styles);

const CardTVShow = ({image, title, description}) => {
  return (
    <div className={cx("card", "video", "style_2")}>
      <div className={cx("image")}>
        <div className={cx("wrapper")}>
          <a className={cx("play_traler", "img")} href="#">
            <img className={cx("poster", "backdrop")} src={image} alt={title} />
            <div className={cx("play")}>
              <span className="glyphicons_v2 play invert svg"></span>
            </div>
          </a>
        </div>
        <div className={cx("options")}>
          <a className={cx("no_click")} href="#">
            <div className="glyphicons_v2 circle-more white"></div>
          </a>
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
    </div>
  );
};

export default CardTVShow;

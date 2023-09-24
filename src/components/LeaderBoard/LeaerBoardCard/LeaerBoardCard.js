import classNames from "classnames/bind";
import styles from "./LeaerBoardCard.module.scss";

const cx = classNames.bind(styles);

const LeaerBoardCard = ({src, userName, ...props}) => {
  return (
    <li className={cx("leaderboard_items")}>
      <span className={cx("avatar")}>
        <a href="#">
          {!src ? (
            <span className={cx("round", "initials ", "background_color", "yellow")}>R</span>
          ) : (
            <img className={cx("avatar")} src={src} alt="" />
          )}
        </a>
      </span>
      <div className={cx("data")}>
        <h3>
          <a href="/u/RuiZafon?language=en">{userName}</a>
        </h3>
        <div className={cx("meter", "all")}>
          <div className={cx("gauge")}></div>
          <h4>991512</h4>
        </div>
        <div className={cx("meter", "this_week")}>
          <div className={cx("gauge")}></div>
          <h4>29171</h4>
        </div>
      </div>
    </li>
  );
};

export default LeaerBoardCard;

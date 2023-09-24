import classNames from "classnames/bind";
import styles from "./Card.module.scss";

const cx = classNames.bind(styles);

const Card = ({
  key,
  backgroundImage,
  name,
  original_title,
  first_air_date,
  release_date,
  vote_average,
  vote_count,
  ...props
}) => {
  const rateting = (vote_average, vote_count) => {
    const maxRating = 10;
    const weightedRating =
      vote_average * (vote_average / (vote_average + 1000)) + maxRating * (1000 / (vote_count + 1000));
    const rateting = Math.floor(weightedRating.toFixed(2)) * 10;
    return rateting;
  };

  return (
    <div className={cx("card", "style_1", "mheight")}>
      <div className={cx("image")}>
        <div className={cx("wrapper")}>
          <a className={cx("img")} href="#">
            <img
              className={cx("poster")}
              src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${backgroundImage}`}
              alt={name || original_title}
            />
          </a>
        </div>
        <div className={cx("options")}>
          <a href="#">
            <div className={cx("glyphicons_v2", "circle-more_white")}></div>
          </a>
        </div>
      </div>
      <div className={cx("content")}>
        <div className={cx("evaluation", "tight")}>
          <div className={cx("outer_ring")}>
            <div className={cx("user_score_chart")}>
              <div className={cx("percent")}>
                <span className={cx("icon")}>{`${rateting(vote_average, vote_count)}%`}</span>
              </div>
              <canvas height="42" width="42" style={{height: "34px", width: "34px"}}></canvas>
            </div>
          </div>
        </div>
        <h2>
          <a href="/tv/232125?language=vi" title="I Am Groot">
            {name || original_title}
          </a>
        </h2>
        <p>{first_air_date || release_date}</p>
      </div>
      <div className={cx("hover")}></div>
    </div>
  );
};

export default Card;

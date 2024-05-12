import {NavLink} from "react-router-dom";
import styles from "./Card.module.scss";
import classNames from "classnames/bind";
import Option from "../../Option/Option";
import useComponentVisible from "~/hooks/useComponentVisible";
import {CircularProgressbar, buildStyles} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const cx = classNames.bind(styles);

const Card = ({
  key,
  backgroundImage,
  name,
  id,
  original_title,
  title,
  first_air_date,
  release_date,
  vote_average,
  vote_count,
  media_type,
  original_language,
  ...props
}) => {
  const {ref, isComponentVisible, setIsComponentVisible} = useComponentVisible(false);
  // const dateString = release_date || first_air_date.split("-");

  const formatterDate = () => {
    if (first_air_date !== "") {
      const dString = first_air_date || release_date;
      const dateString = dString.split("-");
      const year = parseInt(dateString[0]);
      const month = parseInt(dateString[1]);
      const day = parseInt(dateString[2]);

      const date = new Date(year, month - 1, day);

      // Tạo đối tượng Intl.DateTimeFormat để định dạng ngày
      const formatter = new Intl.DateTimeFormat("en-US", {month: "short", day: "numeric", year: "numeric"});

      // Định dạng lại theo định dạng mong muốn
      const newDate = formatter.format(date);
      return newDate;
    }
    return release_date || first_air_date;
  };

  const convertString = (inputString) => {
    // Chuyển thành chữ thường
    let lowercaseString = inputString.toLowerCase();

    // Thay thế tất cả các ký tự không phải là chữ cái hoặc số bằng dấu gạch ngang
    let replacedString = lowercaseString.replace(/[^a-z0-9]+/g, "-");

    // Loại bỏ dấu gạch ngang ở đầu và cuối chuỗi nếu có
    let finalString = replacedString.replace(/^-+|-+$/g, "");

    return finalString;
  };

  const originalUrl = `${media_type}/${id}-${convertString(original_title ?? name ?? title)}?language=en`;

  const handleShowOption = () => {
    setIsComponentVisible(true);
  };

  window.addEventListener("scroll", () => {
    setIsComponentVisible(false);
  });

  const rateting = (vote_average) => {
    const rateting = Math.round(vote_average * 10);
    return rateting;
  };

  return (
    <>
      <div className={cx("card", "style_1", "mheight")}>
        <div className={cx("image")}>
          <div className={cx("wrapper")}>
            <NavLink className={cx("img")} to={originalUrl}>
              <img
                className={cx("poster")}
                src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${backgroundImage}`}
                alt={name || original_title}
              />
            </NavLink>
          </div>
          <div className={cx("options")}>
            <NavLink href="#" onClick={handleShowOption}>
              {!isComponentVisible && <div className={cx("glyphicons_v2", "circle-more_white")}></div>}
            </NavLink>
          </div>
        </div>
        <div className={cx("content")}>
          <div className={cx("evaluation", "tight")}>
            {rateting(vote_average) <= 70 ? (
              <CircularProgressbar
                value={rateting(vote_average)}
                text={`${rateting(vote_average)}%`}
                styles={buildStyles({
                  // Rotation of path and trail, in number of turns (0-1)
                  rotation: 0,

                  // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                  strokeLinecap: "round",

                  // Text size
                  textSize: "3.2rem",

                  // How long animation takes to go from one percentage to another, in seconds
                  pathTransitionDuration: 0.5,

                  // Can specify path transition in more detail, or remove it entirely
                  // pathTransition: 'none',

                  // Colors

                  pathColor: `#d2d531`,
                  textColor: "#fff",
                  trailColor: "#423d0f",
                })}
              />
            ) : (
              <CircularProgressbar
                value={rateting(vote_average)}
                text={`${rateting(vote_average)}%`}
                styles={buildStyles({
                  // Rotation of path and trail, in number of turns (0-1)
                  rotation: 0,

                  // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                  strokeLinecap: "round",

                  // Text size
                  textSize: "3.2rem",

                  // How long animation takes to go from one percentage to another, in seconds
                  pathTransitionDuration: 0.5,

                  // Can specify path transition in more detail, or remove it entirely
                  // pathTransition: 'none',

                  // Colors

                  pathColor: `#21d07a`,
                  textColor: "#fff",
                  trailColor: "#204529",
                })}
              />
            )}{" "}
          </div>
          <h2>
            <a href="/tv/232125?language=vi" title="I Am Groot">
              {name || original_title}
            </a>
          </h2>
          <p>{formatterDate()}</p>
        </div>
        <div className={cx("hover", `${id}`, isComponentVisible && "on")}></div>
      </div>
      {isComponentVisible && <div ref={ref}>{<Option translateX={-7} translateY={32} />}</div>}
    </>
  );
};

export default Card;

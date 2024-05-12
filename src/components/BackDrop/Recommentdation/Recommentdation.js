import classNames from "classnames/bind";
import styles from "./Recommentdation.module.scss";

const cx = classNames.bind(styles);

const Recommentdation = ({type, id, image, time, name, recent, index}) => {
  const convertString = (inputString) => {
    // Chuyển thành chữ thường
    let lowercaseString = inputString.toLowerCase();

    // Thay thế tất cả các ký tự không phải là chữ cái hoặc số bằng dấu gạch ngang
    let replacedString = lowercaseString.replace(/[^a-z0-9]+/g, "-");

    // Loại bỏ dấu gạch ngang ở đầu và cuối chuỗi nếu có
    let finalString = replacedString.replace(/^-+|-+$/g, "");

    return finalString;
  };

  const originalUrl = `${id}-${convertString(name)}?language=en`;
  return (
    <div key={index} className={cx("recommendation_scroller")}>
      <div className={cx("scroller")}>
        <div className={cx("item", "mini", "backdrop", "mini_card")}>
          <div className={cx("image_content", "glyphicons_v2", "picture", "grey", "backdrop", "no_image", "no_border")}>
            <a href={originalUrl} title={name} alt={name} previewlistener="true">
              <img
                loading="lazy"
                src={`https://media.themoviedb.org/t/p/w250_and_h141_face/${image}`}
                srcSet={`https://media.themoviedb.org/t/p/w250_and_h141_face/${image} 1x https://media.themoviedb.org/t/p/w250_and_h141_face/${image} 2x`}
                alt={name}
              />

              <div className={cx("meta")}>
                <span className={cx("release_date")}>
                  <span className={cx("glyphicons_v2", "calendar")}></span> {time}
                </span>
                <span>
                  <span className={cx("glyphicons_v2", "star", "right", "rating")}></span>
                  <span className={cx("glyphicons_v2", "heart", "favourite", "list_action")}></span>
                  <span className={cx("glyphicons_v2", "bookmark", "watchlist", "list_action")}></span>
                </span>
              </div>
            </a>
          </div>
          <p className={cx("tv", "flex")}>
            <a href="/tv/64552?language=en" title={name} alt={name} previewlistener="true">
              <bdi>{name}</bdi>
            </a>
            <span className={cx("vote_average")}>{Math.round(recent * 10)}%</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Recommentdation;

import classNames from "classnames/bind";
import styles from "./Community.module.scss";
import {NavLink} from "react-router-dom";

const cx = classNames.bind(styles);

const Community = () => {
  return (
    <section className={cx("inner_content", "bg_image", "community")}>
      <div className={cx("wrapper")}>
        <div className={cx("content", "wrap")}>
          <div className={cx("column")}>
            <div className={cx("header")}>
              <h2>Join Today</h2>
            </div>
            <div className={cx("content", "flex")}>
              <div className={cx("column")}>
                <p>
                  Get access to maintain your own <em>custom personal lists</em>, <em>track what you've seen</em> and
                  search and filter for <em>what to watch next</em>—regardless if it's in theatres, on TV or available
                  on popular streaming services like .
                </p>
                <p className={cx("button")}>
                  <NavLink className={cx("rounded", "background_color", "border_color", "purple")} to="/signup">
                    Sign Up
                  </NavLink>
                </p>
              </div>
              <div className={cx("column")}>
                <ul>
                  <li>Enjoy TMDB ad free</li>
                  <li>Maintain a personal watchlist</li>
                  <li>Filter by your subscribed streaming services and find something to watch</li>
                  <li>Log the movies and TV shows you've seen</li>
                  <li>Build custom lists</li>
                  <li>Contribute to and improve our database</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Community;

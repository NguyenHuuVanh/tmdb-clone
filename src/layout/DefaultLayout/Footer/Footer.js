import {NavLink} from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./Footer.module.scss";

import icon from "~/assets/svgs/icon_footer.svg";

const cx = classNames.bind(styles);

const Footer = () => {
  return (
    <footer className={cx("single_column")}>
      <nav>
        <div className={cx("join")}>
          <img src={icon} alt="The Movie Database (TMDB)" width="130" height="94" />
          <NavLink to="/signup" className={cx("rounded", "logged_in")} href="">
            Join the Community
          </NavLink>
        </div>
        <div>
          <h3>The Basics</h3>
          <ul>
            <li>
              <a href="/about?language=vi">Giới thiệu về TMDB</a>
            </li>
            <li>
              <a href="/about/staying-in-touch?language=vi">Contact Us</a>
            </li>
            <li>
              <a href="/talk?language=vi">Support Forums</a>
            </li>
            <li>
              <a href="https://developer.themoviedb.org/docs" target="_blank">
                API
              </a>
            </li>
            <li>
              <a href="https://status.themoviedb.org/" target="_blank" rel="noopener">
                System Status
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3>Get Involved</h3>
          <ul>
            <li>
              <a href="/bible?language=en">
                <span className={("glyphicons", " glyphicons-asterisk")}></span> Contribution Bible
              </a>
            </li>
            <li>
              <a href="/movie/new?language=en">Add New Movie</a>
            </li>
            <li>
              <a href="/tv/new?language=en">Add New TV Show</a>
            </li>
          </ul>
        </div>
        <div>
          <h3>Community</h3>
          <ul>
            <li>
              <a href="/documentation/community/guidelines?language=en">Guidelines</a>
            </li>
            <li>
              <a href="/discuss?language=en">Discussions</a>
            </li>
            <li>
              <a href="/leaderboard?language=en">Leaderboard</a>
            </li>
            <li>
              <a href="https://twitter.com/themoviedb" target="_blank" rel="noopener">
                Twitter
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3>Legal</h3>
          <ul>
            <li>
              <a href="/documentation/website/terms-of-use?language=en">Terms of Use</a>
            </li>
            <li>
              <a href="/documentation/api/terms-of-use?language=en">API Terms of Use</a>
            </li>
            <li>
              <a href="/privacy-policy?language=en">Privacy Policy</a>
            </li>
            <li>
              <a href="/dmca-takedown?language=en">DMCA Policy</a>
            </li>
          </ul>
        </div>
      </nav>
      <section>Build edaccde (5763)</section>
    </footer>
  );
};

export default Footer;

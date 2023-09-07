import HeadlessTippy from "../Tooltip/Tooltip";
import Tippy from "@tippyjs/react/headless";
import classNames from "classnames/bind";
import styles from "./Header.module.scss";

const cx = classNames.bind(styles);

const Header = () => {
  return (
    <header className={cx("navbar")}>
      <div className={cx("content")}>
        <div className={cx("sub_media")}>
          <div className={cx("nav_wrapper")}>
            <a className={cx("logo")} href="">
              <img
                src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
                alt="The Movie Database (TMDB)"
                width="154"
                height="20"
              />
            </a>
            <ul className={cx("dropdown_menu")} data-role="menu" tabIndex={0} role="menubar">
              <HeadlessTippy
                placement={"top-start"}
                interactive={true}
                link={
                  <li className={cx("dropdown_item")}>
                    <a className={cx("dropdonw_link")} href="">
                      Movies
                    </a>
                  </li>
                }
                content={
                  <ul className={cx("sub_dropdown")}>
                    <li className={cx("sub_dropdown-item")}>
                      <a className={cx("sub_dropdown-link")} href="">
                        Popular
                      </a>
                    </li>
                    <li className={cx("sub_dropdown-item")}>
                      <a className={cx("sub_dropdown-link")} href="">
                        Now Playing
                      </a>
                    </li>
                    <li className={cx("sub_dropdown-item")}>
                      <a className={cx("sub_dropdown-link")} href="">
                        Upcoming
                      </a>
                    </li>
                    <li className={cx("sub_dropdown-item")}>
                      <a className={cx("sub_dropdown-link")} href="">
                        Top Rated
                      </a>
                    </li>
                  </ul>
                }
              />
              <HeadlessTippy
                placement={"top-start"}
                interactive={true}
                link={
                  <li className={cx("dropdown_item")}>
                    <a className={cx("dropdonw_link")} href="">
                      TV Shows
                    </a>
                  </li>
                }
                content={
                  <ul className={cx("sub_dropdown")}>
                    <li className={cx("sub_dropdown-item")}>
                      <a className={cx("sub_dropdown-link")} href="">
                        Popular
                      </a>
                    </li>
                    <li className={cx("sub_dropdown-item")}>
                      <a className={cx("sub_dropdown-link")} href="">
                        Airing Today
                      </a>
                    </li>
                    <li className={cx("sub_dropdown-item")}>
                      <a className={cx("sub_dropdown-link")} href="">
                        On TV
                      </a>
                    </li>
                    <li className={cx("sub_dropdown-item")}>
                      <a className={cx("sub_dropdown-link")} href="">
                        Top Rated{" "}
                      </a>
                    </li>
                  </ul>
                }
              />
              <HeadlessTippy
                placement={"top-start"}
                interactive={true}
                link={
                  <li className={cx("dropdown_item")}>
                    <a className={cx("dropdonw_link")} href="">
                      People
                    </a>
                  </li>
                }
                content={
                  <ul className={cx("sub_dropdown")}>
                    <li className={cx("sub_dropdown-item")}>
                      <a className={cx("sub_dropdown-link")} href="">
                        Popular People
                      </a>
                    </li>
                  </ul>
                }
              />
              <HeadlessTippy
                placement={"top-start"}
                interactive={true}
                link={
                  <li className={cx("dropdown_item")}>
                    <a className={cx("dropdonw_link")} href="">
                      More
                    </a>
                  </li>
                }
                content={
                  <ul className={cx("sub_dropdown")}>
                    <li className={cx("sub_dropdown-item")}>
                      <a className={cx("sub_dropdown-link")} href="">
                        Discussions
                      </a>
                    </li>
                    <li className={cx("sub_dropdown-item")}>
                      <a className={cx("sub_dropdown-link")} href="">
                        Leaderboard
                      </a>
                    </li>
                    <li className={cx("sub_dropdown-item")}>
                      <a className={cx("sub_dropdown-link")} href="">
                        Support
                      </a>
                    </li>
                    <li className={cx("sub_dropdown-item")}>
                      <a className={cx("sub_dropdown-link")} href="">
                        API
                      </a>
                    </li>
                  </ul>
                }
              />
            </ul>
          </div>
          <div className={cx("flex")}>
            <ul className={cx("primary")}>
              <li className={cx("new_buttons")}>
                <a className={cx("new_icon")} href="">
                  <span className={cx("glyphyicon")}></span>
                </a>
              </li>
              <li className={cx("translate")}>
                <div>VI</div>
              </li>
              <li>
                <a href="">Đăng nhập</a>
              </li>
              <li>
                <a href="/signup?language=vi">Tham gia TMDB</a>
              </li>
              <li className={cx("search_button")}>
                <a className={cx("search")} href="">
                  <span className={cx("searchIcon")}></span>
                </a>
                <a className={cx("close_button")} href="/search">
                  <span className={cx("glyphyicon")}></span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

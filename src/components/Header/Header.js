import {useEffect, useRef, useState} from "react";
import HeadlessTippy from "../Tooltip/Tooltip";
import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import SearchBar from "./SearchBar/SearchBar";
import "../../../node_modules/tippy.js/dist/svg-arrow.css";
import useScrollDirection from "../Hooks/useScrollDirection";
import {NavLink} from "react-router-dom";
import logo_home from "../assets/svgs/logo_home.svg";
import PopperLaguage from "./PopperLaguage/PopperLaguage";
import useComponentVisible from "../Hooks/useComponentVisible";

const cx = classNames.bind(styles);

const Header = () => {
  const [clicked, setClicked] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const scrollDirection = useScrollDirection();

  const handleSearch = (e) => {
    e.preventDefault();
    setClicked(!clicked);
  };

  return (
    <header className={cx("navbar", scrollDirection === "down" ? {hidden: true} : {appear: true})}>
      <div className={cx("content")}>
        <div className={cx("sub_media")}>
          <div className={cx("nav_wrapper")}>
            <a className={cx("logo")} href="/">
              <img src={logo_home} alt="The Movie Database (TMDB)" width="154" height="20" />
            </a>
            <ul className={cx("dropdown_menu")} data-role="menu" tabIndex={0} role="menubar">
              <HeadlessTippy
                placement={"top-start"}
                interactive={true}
                link={
                  <li className={cx("dropdown_item")}>
                    <NavLink className={cx("dropdonw_link", "no_click")} to="/movie">
                      Movies
                    </NavLink>
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
                    <NavLink className={cx("dropdonw_link", "no_click")} to="/tv">
                      TV Shows
                    </NavLink>
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
                    <NavLink className={cx("dropdonw_link", "no_click")} to="/person">
                      People
                    </NavLink>
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
                    <NavLink className={cx("dropdonw_link", "no_click")} to="/more">
                      More
                    </NavLink>
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
              {!isLogged ? (
                <>
                  <HeadlessTippy
                    arrow={true}
                    hideOnClick={true}
                    trigger={"click"}
                    placement={"top"}
                    interactive={true}
                    link={
                      <li className={cx("new_buttons")}>
                        <a className={cx("new_icon")} href="#">
                          <span className={cx("glyphyicon")}></span>
                        </a>
                      </li>
                    }
                    content={
                      <div className={cx("tooltip-content")}>
                        <div className={cx("settings_content")}>
                          <p>Can't find a movie or TV show? Login to create it.</p>
                        </div>
                      </div>
                    }
                  />

                  <li className={cx("translate")}>
                    <HeadlessTippy
                      arrow={true}
                      hideOnClick={true}
                      trigger={"click"}
                      placement={"bottom"}
                      interactive={true}
                      link={<div className={cx("language")}>EN</div>}
                      content={<PopperLaguage />}
                    ></HeadlessTippy>
                  </li>
                  <li>
                    <NavLink to="/login">Đăng nhập</NavLink>
                  </li>
                  <li>
                    <NavLink to="/signup">Tham gia TMDB</NavLink>
                  </li>
                  <li className={cx("search_button")}>
                    {clicked && clicked ? (
                      <a className={cx("close_button")} href="/search" onClick={handleSearch}>
                        <span className={cx("closeIcon")}></span>
                      </a>
                    ) : (
                      <a className={cx("search")} href="/search" onClick={handleSearch}>
                        <span className={cx("searchIcon")}></span>
                      </a>
                    )}
                  </li>
                </>
              ) : (
                <>
                  <HeadlessTippy
                    arrow={true}
                    hideOnClick={true}
                    trigger={"click"}
                    placement={"top"}
                    interactive={true}
                    link={
                      <li className={cx("new_buttons")}>
                        <a className={cx("new_icon")} href="#">
                          <span className={cx("glyphyicon")}></span>
                        </a>
                      </li>
                    }
                    content={
                      <div className={cx("tooltip-content")}>
                        <div className={cx("settings_content", "no_pad")}>
                          <div className={cx("group", "no_pad")}>
                            <p>
                              <a href="/movie/new?language=en">Add New Movie</a>
                            </p>
                            <p>
                              <a href="/tv/new?language=en">Add New TV Show</a>
                            </p>
                          </div>
                        </div>
                      </div>
                    }
                  />

                  <li className={cx("translate")}>
                    <HeadlessTippy
                      arrow={true}
                      hideOnClick={true}
                      trigger={"click"}
                      placement={"bottom"}
                      interactive={true}
                      link={<div className={cx("language")}>EN</div>}
                      content={<PopperLaguage />}
                    ></HeadlessTippy>
                  </li>
                  <li className={cx("glyph", "notifications")} data-role="tooltip">
                    <a className={cx("no_click")} href="/settings/notifications">
                      <span className={cx("glyphicons_v2", "bell", "svg", "invert", "on")}></span>
                    </a>
                    <div className={cx("badge")}>
                      <div className={cx("count")}>1</div>
                    </div>
                  </li>
                  <li className={cx("user")}>
                    <a
                      className={cx("no_click", "tooltip_hover")}
                      title="Hồ sơ và cài đặt"
                      href="/u/vietanhnguyen"
                      data-role="tooltip"
                    >
                      <span className={cx("avatar", "background_color", "green")}>v</span>
                    </a>
                  </li>
                  <li className={cx("search_button")}>
                    {clicked && clicked ? (
                      <a className={cx("close_button")} href="/search" onClick={handleSearch}>
                        <span className={cx("closeIcon")}></span>
                      </a>
                    ) : (
                      <a className={cx("search")} href="/search" onClick={handleSearch}>
                        <span className={cx("searchIcon")}></span>
                      </a>
                    )}
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
        {clicked && <SearchBar />}
      </div>
    </header>
  );
};

export default Header;

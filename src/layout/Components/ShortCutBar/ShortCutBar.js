import {AiFillCaretDown} from "react-icons/ai";
import classNames from "classnames/bind";
import styles from "./ShortCutBar.module.scss";
import HeadlessTippy from "~/components/Tooltip/Tooltip";

const cx = classNames.bind(styles);

const ShortCutBar = () => {
  return (
    <div className={cx("shortcut_bar")}>
      <ul className={cx("dropdown_menu")}>
        <HeadlessTippy
          placement={"top-start"}
          offset={[0, -40]}
          interactive={true}
          link={
            <li className={cx("menu_item", "active")}>
              <span className={cx("item")}>
                Overview
                <span className={cx("icon", "k-icon")}>
                  <AiFillCaretDown />
                </span>
              </span>
            </li>
          }
          content={
            <ul className={cx("sub_dropdown")}>
              <li className={cx("sub_dropdown-item")}>
                <a className={cx("sub_dropdown-link")} href="">
                  Main
                </a>
              </li>
              <li className={cx("sub_dropdown-item")}>
                <a className={cx("sub_dropdown-link")} href="">
                  Alternative Titles
                </a>
              </li>
              <li className={cx("sub_dropdown-item")}>
                <a className={cx("sub_dropdown-link")} href="">
                  Cast & Crew
                </a>
              </li>
              <li className={cx("sub_dropdown-item")}>
                <a className={cx("sub_dropdown-link")} href="">
                  Release Dates
                </a>
              </li>
              <li className={cx("sub_dropdown-item")}>
                <a className={cx("sub_dropdown-link")} href="">
                  Translations
                </a>
              </li>
              <li className={cx("sub_dropdown-item")}>
                <a className={cx("sub_dropdown-link")} href="">
                  Changes
                </a>
              </li>
            </ul>
          }
        />
        <HeadlessTippy
          placement={"top-start"}
          offset={[0, -40]}
          interactive={true}
          link={
            <li className={cx("menu_item")}>
              <span className={cx("item")}>
                Media
                <span className={cx("icon", "k-icon")}>
                  <AiFillCaretDown />
                </span>
              </span>
            </li>
          }
          content={
            <ul className={cx("sub_dropdown")}>
              <li className={cx("sub_dropdown-item")}>
                <a className={cx("sub_dropdown-link")} href="">
                  Backdrops
                </a>
              </li>
              <li className={cx("sub_dropdown-item")}>
                <a className={cx("sub_dropdown-link")} href="">
                  Logos
                </a>
              </li>
              <li className={cx("sub_dropdown-item")}>
                <a className={cx("sub_dropdown-link")} href="">
                  Posters
                </a>
              </li>
              <li className={cx("sub_dropdown-item")}>
                <a className={cx("sub_dropdown-link")} href="">
                  Videos
                </a>
              </li>
            </ul>
          }
        />
        <HeadlessTippy
          placement={"top-start"}
          offset={[0, -40]}
          interactive={true}
          link={
            <li className={cx("menu_item")}>
              <span className={cx("item")}>
                Fandom
                <span className={cx("icon", "k-icon")}>
                  <AiFillCaretDown />
                </span>
              </span>
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
                  Reviews
                </a>
              </li>
            </ul>
          }
        />
        <HeadlessTippy
          placement={"top-start"}
          offset={[0, -40]}
          interactive={true}
          link={
            <li className={cx("menu_item")}>
              <span className={cx("item")}>
                Share
                <span className={cx("icon", "k-icon")}>
                  <AiFillCaretDown />
                </span>
              </span>
            </li>
          }
          content={
            <ul className={cx("sub_dropdown")}>
              <li className={cx("sub_dropdown-item")}>
                <a className={cx("sub_dropdown-link")} href="">
                  Share Link
                </a>
              </li>
              <li className={cx("sub_dropdown-item")}>
                <a className={cx("sub_dropdown-link")} href="">
                  Facebook
                </a>
              </li>
              <li className={cx("sub_dropdown-item")}>
                <a className={cx("sub_dropdown-link")} href="">
                  Tweet
                </a>
              </li>
            </ul>
          }
        />
      </ul>
    </div>
  );
};

export default ShortCutBar;

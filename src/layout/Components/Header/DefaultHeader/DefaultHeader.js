import classNames from "classnames/bind";
import styles from "./DefaultHeader.module.scss";

const cx = classNames.bind(styles);

const DefaultHeader = () => {
  return <header className={cx("header")}></header>;
};

export default DefaultHeader;

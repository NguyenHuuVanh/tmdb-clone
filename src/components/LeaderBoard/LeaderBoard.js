import React from "react";
import classNames from "classnames/bind";
import styles from "./LeaderBoard.module.scss";
import user_1 from "../assets/images/users/user-1.jpg";
import user_2 from "../assets/images/users/user-2.jpg";
import LeaerBoardCard from "./LeaerBoardCard/LeaerBoardCard";

const cx = classNames.bind(styles);

const LeaderBoard = () => {
  return (
    <section className={cx("inner_content", "leaderboard", "m_auto")}>
      <div className={cx("wrapper")}>
        <div className={cx("content", "wrap")}>
          <div className={cx("column")}>
            <div className={cx("header")}>
              <h2>Leaderboard</h2>
              <div>
                <p>
                  <span className={("dot", " all")}></span> All Time Edits
                </p>
                <p>
                  <span className={("dot", " this_week")}></span> Edits This Week
                </p>
              </div>
            </div>
            <div className={cx("column_content")}>
              <ol className={cx("leaderboard")}>
                <LeaerBoardCard userName={"RuiZafon"} />
                <LeaerBoardCard userName={"RuiZafon"} src={user_1} />
                <LeaerBoardCard userName={"RuiZafon"} />
                <LeaerBoardCard userName={"RuiZafon"} />
                <LeaerBoardCard userName={"RuiZafon"} src={user_2} />
                <LeaerBoardCard userName={"RuiZafon"} />
                <LeaerBoardCard userName={"RuiZafon"} />
                <LeaerBoardCard userName={"RuiZafon"} />
                <LeaerBoardCard userName={"RuiZafon"} />
                <LeaerBoardCard userName={"RuiZafon"} />
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeaderBoard;

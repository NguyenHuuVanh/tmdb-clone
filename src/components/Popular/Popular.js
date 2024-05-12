import React, {useEffect, useLayoutEffect, useRef, useState} from "react";
import classNames from "classnames/bind";
import styles from "./Popular.module.scss";
import Card from "../Trending/Card/Card";
import ApiLinks from "~/services/api/Apis";
import {NavLink} from "react-router-dom";
import http from "~/services/axios/axios";

const cx = classNames.bind(styles);

const Popular = () => {
  const [dataTVPopular, setDataPopular] = useState([]);
  const [dataInTheaters, setDataInTheaters] = useState([]);

  const [isSelected, setIsSelected] = useState(false);
  const [todaywidth, setTodayWidth] = useState(0);
  const [thisWeekywidth, setThisweekWidth] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const h3OneRef = useRef(0);
  const h3SecondRef = useRef(0);
  const bgRef = useRef();
  const scrollRef = useRef();

  useLayoutEffect(() => {
    setTodayWidth(h3OneRef.current.offsetWidth);
    setThisweekWidth(h3SecondRef.current.offsetWidth);
  });

  const handleChangeButton = {
    tunrRight: () => {
      setIsSelected(true);
      bgRef.current.style.width = `${thisWeekywidth}px`;
      bgRef.current.style.left = `${todaywidth}px`;
    },
    turnLeft: () => {
      setIsSelected(false);
      bgRef.current.style.width = `${todaywidth}px`;
      bgRef.current.style.left = "0px";
    },
  };

  const movieTVPopular = () => {
    http
      .get(ApiLinks.apiTVPopular)
      .then((res) => setDataPopular(res.data.results))
      .catch((error) => console.log(error));
  };

  const movieInTheaters = () => {
    http
      .get(ApiLinks.apiUpcomingMovie)
      .then((res) => setDataInTheaters(res.data.results))
      .catch((error) => console.log(error));
  };

  const handleScroll = () => {
    if (scrollRef.current.scrollLeft >= 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    movieTVPopular();
    movieInTheaters();
  }, []);
  return (
    <section className={cx("inner_content", "no_pad", "m_auto")}>
      <div className={cx("wrapper")}>
        <div className={cx("content", "no_bottom_pad", "wrap")}>
          <div className={cx("column")}>
            <div className={cx("header")}>
              <h2>What's Popular</h2>
              <div className={cx("selector_wrap")}>
                <div className={cx("selector")}>
                  <div className={cx("anchor", "hide")}>
                    <h3>
                      <a className={cx("no_click")} href="#">
                        Streaming
                        <span className={cx("glyphicons_v2", "chevron-down")}></span>
                      </a>
                    </h3>
                    <div className={cx("background")}></div>
                  </div>
                  <div
                    className={cx("anchor", isSelected == false && {selected: true})}
                    onClick={handleChangeButton.turnLeft}
                  >
                    <h3 ref={h3OneRef}>
                      <NavLink>
                        On TV<span className={cx("glyphicons_v2", " chevron-down")}></span>
                      </NavLink>
                    </h3>
                    <div className={cx("background")} ref={bgRef}></div>
                  </div>
                  <div className={cx("anchor", "hide")}>
                    <h3>
                      <NavLink className={cx("no_click")}>
                        For Rent
                        <span className={cx("glyphicons_v2", "chevron-down")}></span>
                      </NavLink>
                    </h3>
                    <div className={cx("background")}></div>
                  </div>
                  <div className={cx("anchor", isSelected && {selected: true})} onClick={handleChangeButton.tunrRight}>
                    <h3 ref={h3SecondRef}>
                      <NavLink>
                        In Theaters
                        <span className={cx("glyphicons_v2", " chevron-down")}></span>
                      </NavLink>
                    </h3>
                  </div>
                </div>
              </div>
            </div>
            <div className={cx("media", "trending_scroller", "discover", "scroller_wrap")}>
              <div
                className={cx("content", "flex", "scroller", "loaded", isScrolled ? "is_hidden" : "is_fading")}
                ref={scrollRef}
                onScroll={handleScroll}
              >
                {isSelected
                  ? dataInTheaters.map((tv) => {
                      return (
                        <div className={cx("card_wrapper")} key={tv.id}>
                          <Card
                            backgroundImage={tv.poster_path}
                            name={tv.name}
                            first_air_date={tv.release_date}
                            original_title={tv.original_title}
                            vote_average={tv.vote_average}
                            vote_count={tv.vote_count}
                          />
                        </div>
                      );
                    })
                  : dataTVPopular.map((tv) => {
                      return (
                        <div className={cx("card_wrapper")} key={tv.id}>
                          <Card
                            backgroundImage={tv.poster_path}
                            name={tv.name}
                            first_air_date={tv.first_air_date}
                            original_title={tv.original_title}
                            vote_average={tv.vote_average}
                            vote_count={tv.vote_count}
                          />
                        </div>
                      );
                    })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Popular;

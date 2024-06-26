import {useEffect, useLayoutEffect, useRef, useState} from "react";
import {NavLink} from "react-router-dom";
import classNames from "classnames/bind";

import styles from "./Trending.module.scss";
import Card from "./Card/Card";
import ApiLinks from "~/services/api/Apis";
import http from "~/services/axios/axios";

const cx = classNames.bind(styles);

const Trending = () => {
  const [dataMovieTrendingToday, setDataMovieTrendingToday] = useState([]);
  const [dataMovieTrendingWeek, setDataMovieTrendingWeek] = useState([]);

  const [isSelected, setIsSelected] = useState(false);
  const [todaywidth, setTodayWidth] = useState(0);
  const [thisWeekywidth, setThisweekWidth] = useState(0);
  const h3OneRef = useRef(0);
  const h3SecondRef = useRef(0);
  const [isScrolled, setIsScrolled] = useState(false);
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

  const movieTredingToday = () => {
    http
      .get(ApiLinks.apiTrendingToday)
      .then((res) => setDataMovieTrendingToday(res.data.results))
      .catch((error) => console.log(error));
  };

  const movieTredingWeek = () => {
    http
      .get(ApiLinks.apiTrendingWeek)
      .then((res) => setDataMovieTrendingWeek(res.data.results))
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
    movieTredingToday();
    movieTredingWeek();
  }, []);

  return (
    <div className={cx("container")}>
      <section className={cx("inner_content", "trending", "media", "discover")}>
        <div className={cx("wrapper")}>
          <div className={cx("content")}>
            <div className={cx("column")}>
              <div className={cx("header")}>
                <h2>Trending</h2>
                <div className={cx("selector_wrap")}>
                  <div className={cx("selector")}>
                    <div
                      className={cx("anchor", isSelected == false && {selected: true})}
                      onClick={handleChangeButton.turnLeft}
                    >
                      <h3 ref={h3OneRef}>
                        <NavLink to="/">
                          Today <span className={cx("glyphicons_v2", "chevron-down")}></span>
                        </NavLink>
                      </h3>
                      <div className={cx("background")} ref={bgRef}></div>
                    </div>
                    <div
                      className={cx("anchor", isSelected && {selected: true})}
                      onClick={handleChangeButton.tunrRight}
                    >
                      <h3 ref={h3SecondRef}>
                        <NavLink to="/">
                          This Week <span className={cx("glyphicons_v2", " chevron-down")}></span>
                        </NavLink>
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
              <div className={cx("trending_scroller")}>
                <div
                  className={cx("column_content", "flex", "scroller", "loaded", isScrolled ? "is_hidden" : "is_fading")}
                  ref={scrollRef}
                  onScroll={handleScroll}
                >
                  {isSelected == false
                    ? dataMovieTrendingToday.map((movie) => {
                        return (
                          <div className={cx("card_wrapper")} key={movie.id}>
                            <Card
                              backgroundImage={movie.poster_path}
                              name={movie.name}
                              first_air_date={movie.first_air_date}
                              vote_average={movie.vote_average}
                              vote_count={movie.vote_count}
                              original_title={movie.title}
                              release_date={movie.release_date}
                              id={movie.id}
                              media_type={movie.media_type}
                              original_language={movie.original_language}
                            />
                          </div>
                        );
                      })
                    : dataMovieTrendingWeek.map((movie) => {
                        return (
                          <div className={cx("card_wrapper")} key={movie.id}>
                            <Card
                              backgroundImage={movie.poster_path}
                              name={movie.name}
                              first_air_date={movie.first_air_date}
                              vote_average={movie.vote_average}
                              vote_count={movie.vote_count}
                              original_title={movie.original_title}
                              release_date={movie.release_date}
                              id={movie.id}
                              media_type={movie.media_type}
                              original_language={movie.original_language}
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
    </div>
  );
};

export default Trending;

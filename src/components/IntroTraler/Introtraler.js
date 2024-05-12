import {useEffect, useLayoutEffect, useRef, useState} from "react";
import classNames from "classnames/bind";
import styles from "./IntroTraler.module.scss";
import CardTVShow from "./CardTVShow/CardTVShow";
import ApiLinks from "../../services/api/Apis";
import {NavLink} from "react-router-dom";
import http from "~/services/axios/axios";

const cx = classNames.bind(styles);

const Introtraler = () => {
  const [tvShow, setTVShow] = useState([]);
  const [backgroundImage, setBackgroundImage] = useState("");
  const [isSelected, setIsSelected] = useState(false);
  const [todaywidth, setTodayWidth] = useState(0);
  const [thisWeekywidth, setThisweekWidth] = useState(0);
  const h3OneRef = useRef(0);
  const h3SecondRef = useRef(0);
  const bgRef = useRef();

  const fetchData = {
    dataTvShow: () => {
      http.get(ApiLinks.apiUpcomingMovie).then((res) => {
        setTVShow(res.data.results);
      });
    },
    dataPopularMovie: () => {
      http.get(ApiLinks.apiPopular).then((res) => {
        setTVShow(res.data.results);
      });
    },
  };

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

  const handleItemHover = (imageUrl) => {
    setBackgroundImage(imageUrl);
  };

  useLayoutEffect(() => {
    setTodayWidth(h3OneRef.current.offsetWidth);
    setThisweekWidth(h3SecondRef.current.offsetWidth);
  });

  useEffect(() => {
    isSelected ? fetchData.dataTvShow() : fetchData.dataPopularMovie();
  }, [isSelected]);

  return (
    <section
      className={cx("inner_content", "bg_image", "bg_center", "video", "no_pad")}
      style={{backgroundImage: `url(${backgroundImage})`}}
    >
      <div className={cx("column_wrapper")}>
        <div className={cx("traler_content", "media", "discover ", "scroller_wrap")}>
          <div className={cx("traler_content_wrapper", "no_bottom_pad")}>
            <div className={cx("column")}>
              <div className={cx("header")}>
                <h2>Latest Trailers</h2>
                <div className={cx("selector_wrap")}>
                  <div className={cx("selector")}>
                    <div
                      className={cx("anchor", isSelected == false && {selected: true})}
                      onClick={handleChangeButton.turnLeft}
                    >
                      <h3 ref={h3OneRef}>
                        <NavLink className={cx("title")}>
                          On TV<span className={cx("glyphicons_v2", " chevron-down")}></span>
                        </NavLink>
                      </h3>
                      <div className={cx("background")} ref={bgRef}></div>
                    </div>
                    <div
                      className={cx("anchor", isSelected && {selected: true})}
                      onClick={handleChangeButton.tunrRight}
                    >
                      <h3 ref={h3SecondRef}>
                        <NavLink>
                          In Theaters<span className={cx("glyphicons_v2", " chevron-down")}></span>
                        </NavLink>
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
              <div className={cx("content", "scroller", "flex", "loaded")}>
                {tvShow.map((tv, index) => {
                  return (
                    <CardTVShow
                      key={tv.id}
                      onMouseEnter={() =>
                        handleItemHover(
                          `https://www.themoviedb.org/t/p/w1920_and_h427_multi_faces/${
                            tv.poster_path ?? tv.poster_path
                          }`
                        )
                      }
                      // onMouseLeave={() => setBackgroundImage("")}
                      image={`https://www.themoviedb.org/t/p/w355_and_h200_multi_faces/${
                        tv.backdrop_path ?? tv.poster_path
                      }`}
                      title={tv.title}
                      description={tv.original_title}
                    />
                  );
                })}
                <div className={cx("card", "video", "style_2", "spacer")}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Introtraler;

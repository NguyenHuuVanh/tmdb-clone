import {useEffect, useLayoutEffect, useRef, useState} from "react";
import classNames from "classnames/bind";
import styles from "./IntroTraler.module.scss";
import poster from "../assets/images/bg-intro-traler/img1.jpg";
import CardTVShow from "./CardTVShow/CardTVShow";
import ApiLinks from "../api/Apis";
import {NavLink} from "react-router-dom";

const cx = classNames.bind(styles);

const Introtraler = () => {
  const [tvShow, setTVShow] = useState([]);
  const [isSelected, setIsSelected] = useState(false);
  const [todaywidth, setTodayWidth] = useState(0);
  const [thisWeekywidth, setThisweekWidth] = useState(0);
  const h3OneRef = useRef(0);
  const h3SecondRef = useRef(0);
  const bgRef = useRef();

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

  const TVShow = async () => {
    const responsive = await fetch(ApiLinks.apiDiscoverTv);
    const data = responsive.json();
    return data;
  };

  useEffect(() => {
    TVShow()
      .then((tv) => {
        setTVShow(tv.results);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  return (
    <section className={cx("inner_content", "bg_image", "bg_center", "video", "no_pad")}>
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
                {isSelected ? (
                  tvShow.map((tv) => {
                    return (
                      <CardTVShow
                        image={`https://www.themoviedb.org/t/p/w355_and_h200_multi_faces/${tv.backdrop_path}`}
                        title={tv.name}
                        description={tv.name}
                      />
                    );
                  })
                ) : (
                  <div className={cx("card", "video", "style_2")}>
                    <div className={cx("image")}>
                      <div className={cx("wrapper")}>
                        <a className={cx("play_traler", "img")} href="#">
                          <img className={cx("poster", "backdrop")} src={poster} alt="" />
                          <div className={cx("play")}>
                            <span className="glyphicons_v2 play invert svg"></span>
                          </div>
                        </a>
                      </div>
                      <div className={cx("options")}>
                        <a className={cx("no_click")} href="#">
                          <div className="glyphicons_v2 circle-more white"></div>
                        </a>
                      </div>
                    </div>
                    <div className={cx("content")}>
                      <h2>
                        <a href="/tv/1433?language=vi" title="American Dad!">
                          American Dad!
                        </a>
                      </h2>
                      <h3>American Dad: Theatrical Trailer | TBS</h3>
                    </div>
                  </div>
                )}

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

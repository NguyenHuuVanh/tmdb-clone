import React, {useEffect, useState} from "react";
import {CircularProgressbar, buildStyles} from "react-circular-progressbar";
import {v4 as uuidv4} from "uuid";
import Tippy from "@tippyjs/react";
import {Link, NavLink, useLocation, useParams} from "react-router-dom";
import ApiLinks from "~/services/api/Apis";
import http from "~/services/axios/axios";
import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import Iframe from "../IframeContent/Iframe";
import OverlayContent from "../OverlayContent/OverlayContent";
import getYear from "~/services/utils/GetTimeUtils";
import formattedDate from "~/services/utils/FormattedDateUtils";
import runtime from "~/services/utils/CalulateRunTime";

const cx = classNames.bind(styles);

const Header = ({id, resultType, movieId, dataMovie, dataCrew, dataActor}) => {
  const [isShowOverlay, setIsShowOverlay] = useState(false);
  const [dataCertificationTv, setDataCertificationTv] = useState([]);
  const [dataCertificationMovie, setDataCertificationMovie] = useState([]);
  const [dataGenres, setDataGenres] = useState([]);
  const [isShowIframe, setIsShowIframe] = useState(false);
  const [dataUrlTraler, setDataUrlTraler] = useState([]);

  const getDatas = {
    dataCertification: () => {
      if (resultType === "tv") {
        http
          .get(ApiLinks.apiCertificationTv(id))
          .then((res) => {
            setDataCertificationTv(res.data.results);
          })
          .catch((error) => console.log(error));
      } else {
        http
          .get(ApiLinks.apiCertificationMovie(id))
          .then((res) => {
            setDataCertificationMovie(res.data.results);
          })
          .catch((error) => console.log(error));
      }
    },
    dataImfomationUrlTraler: () => {
      http
        .get(ApiLinks.apiUrlTraler(id, resultType))
        .then((res) => {
          setDataUrlTraler(res.data.results);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    dataInfomationGenres: () => {
      http
        .get(ApiLinks.apiGenres(resultType))
        .then((res) => {
          setDataGenres(res.data.genres);
        })
        .catch((error) => console.log(error));
    },
  };

  const showOverlay = {
    handleShowOverlay: () => {
      setIsShowOverlay(true);
    },
    handleHideOverlay: () => {
      setIsShowOverlay(false);
    },
  };

  const certification = () => {
    if (resultType === "tv") {
      return dataCertificationTv;
    } else return dataCertificationMovie;
  };

  const matchedCertification = () => {
    if (resultType === "tv") {
      return certification()
        .filter((certification) => {
          return certification.iso_3166_1 === "US";
        })
        .map((cer) => {
          return cer.rating;
        });
    } else {
      return certification()
        .filter((certification) => {
          return certification.iso_3166_1 === "US";
        })
        .map((certification) => {
          return (
            certification.release_dates.map((cer) => {
              return cer.certification;
            })[0] ||
            certification.release_dates.map((cer) => {
              return cer.certification;
            })[1] ||
            certification.release_dates.map((cer) => {
              return cer.certification;
            })[2] ||
            certification.release_dates.map((cer) => {
              return cer.certification;
            })[3]
          );
        });
    }
  };

  const matchedGenreNames = () => {
    const data =
      dataMovie &&
      dataMovie.genres &&
      dataMovie.genres.map((genre) => {
        return genre.id;
      });
    return dataGenres && data && dataGenres.filter((genre) => data.includes(genre.id)).map((genre) => genre.name);
  };

  const rateting = () => {
    const rateting = Math.round(dataMovie.vote_average * 10);
    return rateting;
  };

  const playTrailer = () => {
    setIsShowIframe(true);
  };

  const handleHideIframe = () => {
    setIsShowIframe(true);
    setIsShowIframe(false);
  };

  const finalTtraler = dataUrlTraler.find((url) => url.name === "Official Trailer" || url.type === "Trailer");

  useEffect(() => {
    getDatas.dataImfomationUrlTraler();
    getDatas.dataCertification();
    getDatas.dataInfomationGenres();
  }, []);

  return (
    <>
      {dataMovie && (
        <div
          className={cx("header", "large", "border", "first")}
          style={{
            backgroundImage: `url("https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${dataMovie.backdrop_path}")`,
          }}
        >
          <div className={cx("keyboard_s", "custom_bg")}>
            <div className={cx("single_column")}>
              <section className={cx("images", "inner")}>
                <div className={cx("poster_wrapper")}>
                  <div className={cx("poster")} onClick={showOverlay.handleShowOverlay}>
                    <div className={cx("image_content", "backdrop")}>
                      <img
                        className={cx("poster")}
                        src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${dataMovie.poster_path}`}
                        alt={dataMovie.backdrop_path}
                        srcSet={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${dataMovie.poster_path} 1x, https://www.themoviedb.org/t/p/w600_and_h900_bestv2${dataMovie.poster_path} 2x`}
                      />
                    </div>
                    <div className={cx("zoom")}>
                      <a className={cx("no_click")}>
                        <span className={cx("glyphicons_v2", "fullscreen", "white")}></span>Expand
                      </a>
                    </div>
                  </div>
                </div>
                <div className={cx("header_poster_wrapper")}>
                  <section className={cx("header", "poster")}>
                    <div className={cx("title", "ott_false")}>
                      <h2 className={cx("10")}>
                        <a>{dataMovie.title ?? dataMovie.name}</a>
                        <span className={cx("tag", "release_date")}>{getYear(dataMovie, resultType)}</span>
                      </h2>
                      <div className={cx("facts")}>
                        {resultType === "movie" ? (
                          <>
                            <span className={cx("certification")}>{matchedCertification()}</span>
                            <span className={cx("release")}>{formattedDate(dataMovie)} (US)</span>
                            <span className={cx("genres")}>
                              {matchedGenreNames() &&
                                matchedGenreNames().map((name, index) => {
                                  return (
                                    <a key={index} href="#">
                                      {name},{" "}
                                    </a>
                                  );
                                })}
                            </span>
                            <span className={cx("runtime")}>{runtime(Number(dataMovie.runtime))}</span>
                          </>
                        ) : (
                          <>
                            <span className={cx("certification")}>{matchedCertification()}</span>
                            <span
                              className={cx("genres", "no_content")}
                              style={{
                                paddingLeft: "0",
                              }}
                            >
                              {matchedGenreNames() &&
                                matchedGenreNames().map((name, index) => {
                                  return (
                                    // eslint-disable-next-line jsx-a11y/anchor-is-valid
                                    <a key={index} href="#">
                                      {name},{" "}
                                    </a>
                                  );
                                })}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                    <ul className={cx("auto", "action")}>
                      <li className={cx("chart")}>
                        <div className={cx("consensus", "details")}>
                          <div className={cx("outer_ring")}>
                            {rateting(dataMovie.vote_average) <= 70 ? (
                              <CircularProgressbar
                                value={rateting(dataMovie.vote_average)}
                                text={`${rateting(dataMovie.vote_average)}%`}
                                styles={buildStyles({
                                  rotation: 0,
                                  strokeLinecap: "round",
                                  textSize: "3.2rem",
                                  pathTransitionDuration: 0.5,
                                  pathColor: `#d2d531`,
                                  textColor: "#fff",
                                  trailColor: "#423d0f",
                                })}
                              />
                            ) : (
                              <CircularProgressbar
                                value={rateting(dataMovie.vote_average)}
                                text={`${rateting(dataMovie.vote_average)}%`}
                                styles={buildStyles({
                                  rotation: 0,
                                  strokeLinecap: "round",
                                  textSize: "3.2rem",
                                  pathTransitionDuration: 0.5,
                                  pathColor: `#21d07a`,
                                  textColor: "#fff",
                                  trailColor: "#204529",
                                })}
                              />
                            )}{" "}
                          </div>
                        </div>
                        <div className={cx("text")}>
                          User
                          <br />
                          Score
                        </div>
                      </li>
                      <li className={cx("tooltip", "use_tooltip list", "tooltip_hover")} title="" data-role="tooltip">
                        <Tippy
                          className={cx("tooltip-lib-ver_1")}
                          content={<span>Login to create and edit custom lists</span>}
                          placement="bottom"
                          interactive={true}
                          arrow={false}
                        >
                          <a className={cx("no_click")} href="#">
                            <span className={cx("glyphicons_v2", "thumbnails-list", "white")}></span>
                          </a>
                        </Tippy>
                      </li>
                      <li className={cx("tooltip", "use_tooltip list", "tooltip_hover")} title="" data-role="tooltip">
                        <Tippy
                          className={cx("tooltip-lib-ver_1")}
                          content={<span>Login to add this movie to your favorite list</span>}
                          placement="bottom"
                          interactive={true}
                          arrow={false}
                        >
                          <a className={cx("no_click")} href="#">
                            <span className={cx("glyphicons_v2", "heart ", "white")}></span>
                          </a>
                        </Tippy>
                      </li>
                      <li className={cx("tooltip", "use_tooltip list", "tooltip_hover")} title="" data-role="tooltip">
                        <Tippy
                          className={cx("tooltip-lib-ver_1")}
                          content={<span>Login to add this movie to your watchlist</span>}
                          placement="bottom"
                          interactive={true}
                          arrow={false}
                        >
                          <a className={cx("no_click")} href="#">
                            <span className={cx("glyphicons_v2", "bookmark", "white")}></span>
                          </a>
                        </Tippy>
                      </li>
                      <li className={cx("tooltip", "use_tooltip list", "tooltip_hover")} title="" data-role="tooltip">
                        <Tippy
                          className={cx("tooltip-lib-ver_1")}
                          content={<span>Login to rate this movie</span>}
                          placement="bottom"
                          interactive={true}
                          arrow={false}
                        >
                          <a className={cx("no_click")} href="#">
                            <span className={cx("glyphicons_v2", "star", "white")}></span>
                          </a>
                        </Tippy>
                      </li>
                      <li className={cx("video", "none")} onClick={playTrailer}>
                        <NavLink
                          className={cx("no_click", "play_trailer")}
                          data-site="YouTube"
                          data-title="Play Trailer"
                        >
                          <span className={cx("glyphicons_v2", "play")}></span> Play Trailer
                        </NavLink>
                      </li>
                    </ul>
                    <div className={cx("header_info")}>
                      <h3 className={cx("tagline")} dir="auto">
                        {dataMovie.tagline}
                      </h3>
                      <h3 dir="auto">Overview</h3>
                      <div className={cx("overview")} dir="auto">
                        <p>{dataMovie.overview}</p>
                      </div>
                      <ol className={cx("people", "no_image")}>
                        {dataCrew.slice(0, 6).map((crew, index) => {
                          return (
                            <li key={index} className={cx("profile")}>
                              <p>
                                <a href={`/person/${crew.id}-${crew.name}?language=en`}>{crew.name}</a>
                              </p>
                              <p className={cx("character")}>{crew.known_for_department}</p>
                            </li>
                          );
                        })}
                      </ol>
                    </div>
                  </section>
                </div>
              </section>
            </div>
          </div>
        </div>
      )}
      {isShowIframe && (
        <Iframe embedId={finalTtraler.key} onClick={handleHideIframe} name={dataMovie.title || dataMovie.name} />
      )}
      {isShowOverlay && (
        <OverlayContent
          id={movieId}
          type={resultType}
          onClick={showOverlay.handleHideOverlay}
          backdrop_path={dataMovie.poster_path}
          poster_path={dataMovie.poster_path}
          images={dataMovie}
        />
      )}
    </>
  );
};

export default Header;

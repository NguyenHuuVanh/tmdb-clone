import {useEffect, useRef, useState} from "react";
import {Link, NavLink, useLocation, useParams} from "react-router-dom";

import classNames from "classnames/bind";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional
import ApiLinks from "~/api/Apis";
import styles from "./BackDrop.module.scss";
import ShortCutBar from "~/layout/Components/ShortCutBar/ShortCutBar";
import OverlayContent from "./OverlayContent/OverlayContent";
import Iframe from "./IframeContent/Iframe";
import {CircularProgressbar, buildStyles} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const cx = classNames.bind(styles);
const BackDrop = () => {
  const {movieId} = useParams();
  const {pathname} = useLocation();
  const [id] = movieId.split("-");
  const matchResult = pathname.match(/^\s*\/(\w+)/);
  const resultType = matchResult ? matchResult[1] : null;
  const [visibleCards, setVisibleCards] = useState(9);

  const [isShowOverlay, setIsShowOverlay] = useState(false);
  const [isShowIframe, setIsShowIframe] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [dataMovie, setDataMovie] = useState([]);
  console.log("🚀 ~ file: BackDrop.js:28 ~ BackDrop ~ dataMovie:", dataMovie);
  const [dataMovieTrendingWeek, setDataMovieTrendingWeek] = useState([]);
  const [dataActors, setDataActors] = useState([]);
  const [dataCrew, setDataCrew] = useState([]);
  console.log("🚀 ~ file: BackDrop.js:32 ~ BackDrop ~ dataCrew:", dataCrew);
  const [dataUrlTraler, setDataUrlTraler] = useState([]);
  const [dataImages, setDataImages] = useState([]);
  const [dataGenres, setDataGenres] = useState([]);
  const [dataSocial, setDataSocial] = useState([]);
  const [dataCertificationTv, setDataCertificationTv] = useState([]);
  const [dataCertificationMovie, setDataCertificationMovie] = useState([]);
  const [dataKeywords, setDataKeywords] = useState([]);
  const [logoNetwork, setLogoNetwork] = useState([]);

  const scrollerRefOne = useRef();
  const scrollerRefSecond = useRef();

  // dùng promise.all để fetch nhiều api
  const fetchData = async () => {
    try {
      const [
        apiMovieInfomation,
        apiTrendingWeek,
        apiActors,
        apiUrlTraler,
        apiImagesMovie,
        apiGenres,
        apiSocial,
        apiCertificationTv,
        apiCertificationMovie,
        apiKeyWords,
      ] = await Promise.all([
        fetch(ApiLinks.apiMovieInfomation(id, resultType)),
        fetch(ApiLinks.apiTrendingWeek),
        fetch(ApiLinks.apiActors(id, resultType)),
        fetch(ApiLinks.apiUrlTraler(id, resultType)),
        fetch(ApiLinks.apiImagesMovie(id, resultType)),
        fetch(ApiLinks.apiGenres(resultType)),
        fetch(ApiLinks.apiMovieSocial(id, resultType)),
        fetch(ApiLinks.apiCertificationTv(id)),
        fetch(ApiLinks.apiCertificationMovie(id)),
        fetch(ApiLinks.apiKeywordsRecommendation(id, resultType)),
      ]);
      const dataMovieInfomation = await apiMovieInfomation.json();
      const dataTrendingWeek = await apiTrendingWeek.json();
      const dataActors = await apiActors.json();
      const dataUrlTrailer = await apiUrlTraler.json();
      const dataImagesMovie = await apiImagesMovie.json();
      const dataGenres = await apiGenres.json();
      const dataSocial = await apiSocial.json();
      const dataCertificationTv = await apiCertificationTv.json();
      const dataCertificationMovie = await apiCertificationMovie.json();
      const dataKeywords = await apiKeyWords.json();

      setDataMovie(dataMovieInfomation);
      setDataMovieTrendingWeek(dataTrendingWeek);
      setDataActors(dataActors.cast);
      setDataCrew(dataActors.crew);
      setDataUrlTraler(dataUrlTrailer.results);
      setDataImages(dataImagesMovie.backdrops);
      setDataGenres(dataGenres.genres);
      setDataSocial(dataSocial);
      setDataCertificationTv(dataCertificationTv.results);
      setDataCertificationMovie(dataCertificationMovie.results);
      setDataKeywords(dataKeywords.results ?? dataKeywords.keywords);

      // console.log(dataCertificationTv);
    } catch (error) {
      console.log("🚀 ~ file: BackDrop.js:45 ~ fetchData ~ error:", error);
    }
  };

  const formattedDate = () => {
    const originalDate = new Date(dataMovie.release_date || dataMovie.first_air_date);
    const day = originalDate.getDate().toString().padStart(2, "0");
    const month = (originalDate.getMonth() + 1).toString().padStart(2, "0");
    const year = originalDate.getFullYear();
    const formattedDateString = `${day}/${month}/${year}`;
    return formattedDateString;
  };

  const getYear = () => {
    if (resultType === "movie") {
      const year = new Date(dataMovie.release_date).getFullYear().toString();
      return `(${year})`;
    }
    const year = new Date(dataMovie.first_air_date).getFullYear().toString();
    return `(${year})`;
  };

  const playTrailer = () => {
    setIsShowIframe(true);
  };
  const finalTtraler = dataUrlTraler.find((url) => url.name === "Official Trailer" || url.type === "Trailer");

  const imagesList = dataImages.map((image) => {
    return image.file_path;
  });

  const expense = (money) => {
    const formattedBudget = money.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
    const result = money === 0 ? "-" : formattedBudget;
    return result;
  };

  const runtime = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const formattedTime = `${hours}h ${minutes}m`;
    return formattedTime;
  };

  const genreId = () => {
    return dataMovie.genres.map((genre) => {
      return genre.id;
    });
  };
  const matchedGenreNames = dataGenres.filter((genre) => genreId().includes(genre.id)).map((genre) => genre.name);

  const handleShowOverlay = () => {
    setIsShowOverlay(true);
  };

  const handleHideOverlay = () => {
    setIsShowOverlay(false);
  };

  const handleHideIframe = () => {
    setIsShowIframe(true);
    setIsShowIframe(false);
  };

  const handleScroll = () => {
    if (scrollerRefOne.current.scrollLeft >= 50 || scrollerRefSecond.current.scrollLeft >= 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  const rateting = () => {
    const rateting = Math.round(dataMovie.vote_average * 10);
    return rateting;
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

  const networkCompanies = async () => {
    try {
      const data = await dataMovie.networks;
      // const logo = data.map((compani) => compani.logo_path);
      const logo = data[0].logo_path;
      setLogoNetwork(logo);
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  if (resultType === "tv") {
    networkCompanies();
  }

  useEffect(() => {
    document.documentElement.style.setProperty("--maxPrimaryPageWidth", "1400px");
    fetchData();
    window.scrollTo(0, 0);
  }, [pathname]);

  window.onload = () => {
    window.scrollTo(0, 0);
  };

  return (
    <section className={cx("container", "movie_content", "backdrop", "poster")}>
      <ShortCutBar />
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
                  <div className={cx("poster")} onClick={handleShowOverlay}>
                    <div className={cx("image_content", "backdrop")}>
                      <img
                        className={cx("poster")}
                        src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${dataMovie.poster_path}`}
                        alt={dataMovie.backdrop_path}
                        data-src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${dataMovie.poster_path}`}
                        data-srcset={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${dataMovie.poster_path} 1x, https://www.themoviedb.org/t/p/w600_and_h900_bestv2${dataMovie.poster_path} 2x`}
                        srcSet={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${dataMovie.poster_path} 1x, https://www.themoviedb.org/t/p/w300_and_h450_bestv2${dataMovie.poster_path} 2x`}
                        data-loaded="true"
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
                        <span className={cx("tag", "release_date")}>{getYear()}</span>
                      </h2>
                      <div className={cx("facts")}>
                        {resultType === "movie" ? (
                          <>
                            <span className={cx("certification")}>{matchedCertification()}</span>
                            <span className={cx("release")}>{formattedDate()} (US)</span>
                            <span className={cx("genres")}>
                              {matchedGenreNames.map((name) => {
                                return (
                                  <a key={name} href="#">
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
                              {matchedGenreNames.map((name) => {
                                return (
                                  // eslint-disable-next-line jsx-a11y/anchor-is-valid
                                  <a key={name} href="#">
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
                                  // Rotation of path and trail, in number of turns (0-1)
                                  rotation: 0,

                                  // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                  strokeLinecap: "round",

                                  // Text size
                                  textSize: "3.2rem",

                                  // How long animation takes to go from one percentage to another, in seconds
                                  pathTransitionDuration: 0.5,

                                  // Can specify path transition in more detail, or remove it entirely
                                  // pathTransition: 'none',

                                  // Colors

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
                                  // Rotation of path and trail, in number of turns (0-1)
                                  rotation: 0,

                                  // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                  strokeLinecap: "round",

                                  // Text size
                                  textSize: "3.2rem",

                                  // How long animation takes to go from one percentage to another, in seconds
                                  pathTransitionDuration: 0.5,

                                  // Can specify path transition in more detail, or remove it entirely
                                  // pathTransition: 'none',

                                  // Colors

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
                        {dataCrew.slice(0, 6).map((crew) => {
                          return (
                            <li key={crew.id} className={cx("profile")}>
                              <p>
                                <a href={`/person/${crew.id}-${crew.name}?language=en`}>{crew.name}</a>
                              </p>
                              <p className={cx("character")}>{crew.department}</p>
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
      <div className={cx("media", "movie_v4", "header_large")}>
        <div className={cx("column_wrapper")}>
          <div className={cx("content_wrapper")}>
            <div>
              <div className={cx("white_column")}>
                <section className={cx("panel", "top_billed", "scroller")}>
                  <h3 dir="auto">Top Billed Cast</h3>
                  <div className={cx("scroller_wrap", "should_fade", isScrolled ? "is_hidden" : "is_fading")}>
                    <ol className={cx("people", "scroller")} ref={scrollerRefOne} onScroll={handleScroll}>
                      {dataActors ? (
                        dataActors.slice(0, visibleCards).map((actor) => {
                          return (
                            <li className={cx("card")} key={actor.id}>
                              <a href={`/person/${actor.id}-${actor.name}?language=en`}>
                                <img
                                  loading="lazy"
                                  className={cx("profile")}
                                  src={`https://www.themoviedb.org/t/p/w138_and_h175_face/${actor.profile_path}`}
                                  alt={actor.name}
                                />
                              </a>

                              <p>
                                <a href={`/person/${actor.id}-${actor.name}?language=en`}>{actor.name}</a>
                              </p>
                              <p className={cx("character")}>{actor.character}</p>
                            </li>
                          );
                        })
                      ) : (
                        <div>No actor data available</div>
                      )}
                      <li className={cx("filler", "view_more")}>
                        <p>
                          <Link to={`/cast?language=en`}>
                            View More <span className={cx("glyphicons_v2", "arrow-thin-right")}></span>
                          </Link>
                        </p>
                      </li>
                    </ol>
                    <div className={cx("style_wrapper")}></div>
                  </div>
                  <p className={cx("new_button")}>
                    <a href="/movie/968051-the-nun-ii/cast?language=en">Full Cast &amp; Crew</a>
                  </p>
                </section>
                <section className={cx("panel", "media_panel", "social_panel")}>
                  <section className={cx("review")}>
                    <div className={cx("menu")}>
                      <h3 dir="auto">Social</h3>
                      <ul>
                        <li dir="auto">
                          <a id="reviews" className={cx("media_panel")} href="#">
                            Reviews <span>0</span>
                          </a>
                        </li>
                        <li className={cx("active")} dir="auto">
                          <a id="discussions" className={cx("media_panel")} href="#">
                            Discussions <span>1</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className={cx("content")}>
                      <div className={cx("original_content")}>
                        <div className={cx("discussion_container")}>
                          <table className={cx("new", "space")}>
                            <thead>
                              <tr>
                                <th>Subject</th>
                                <th>Status</th>
                                <th>Replies</th>
                                <th>Last Reply</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className={cx("open")}>
                                <td className={cx("subject")}>
                                  <div className={cx("post_info")}>
                                    <div className={cx("flex_wrapper")}>
                                      <div className={cx("avatar_wrapper")}>
                                        <span className={cx("avatar", "thirty-two")}>
                                          <a
                                            href="/u/wonder2wonder?language=en"
                                            alt="Discussion started by wonder2wonder"
                                          >
                                            <span className={cx("background_color", "pink")}>w</span>
                                          </a>
                                        </span>
                                      </div>

                                      <div className={cx("link_wrapper")}>
                                        <a className={cx("topic")} href="#">
                                          "I saw a nun"
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <p className={cx("status")}>Open</p>
                                </td>
                                <td>
                                  <p>0</p>
                                </td>
                                <td>
                                  <p>
                                    Sep 15, 2023 at 6:19 AM
                                    <br />
                                    by wonder2wonder
                                  </p>
                                </td>
                              </tr>
                            </tbody>
                          </table>

                          <p className={cx("new_button")}>
                            <a href="/movie/968051-the-nun-ii/discuss?language=en">Go to Discussions</a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </section>
                </section>
                <section className={cx("panel", "media_panel", "media", "scroller")}>
                  <div className={cx("menu")}>
                    <h3 dir="auto">Media</h3>
                    <ul>
                      <li className={cx("active")} dir="auto">
                        <a id="popular" className={cx("media_panel")} href="#">
                          Most Popular
                        </a>
                      </li>
                      <li dir="auto">
                        <a id="videos" className={cx("media_panel")} href="#">
                          Videos <span>8</span>
                        </a>
                      </li>
                      <li dir="auto">
                        <a id="backdrops" className={cx("media_panel")} href="#">
                          Backdrops <span>17</span>
                        </a>
                      </li>
                      <li dir="auto">
                        <a id="posters" className={cx("media_panel")} href="#">
                          Posters <span>109</span>
                        </a>
                      </li>
                      <li className={cx("view_all")}></li>
                    </ul>
                  </div>
                  <div className={cx("scroller_wrap", "should_fade", isScrolled ? "is_hidden" : "is_fading")}>
                    <div
                      className={cx("h_scroller", "content scroller")}
                      ref={scrollerRefSecond}
                      onScroll={handleScroll}
                    >
                      <div className={cx("video", "card", "no_border")}>
                        <div
                          className={cx("wrapper")}
                          style={{
                            backgroundImage: `url("https://image.tmdb.org/t/p/w533_and_h300_bestv2/${imagesList[0]}")`,
                          }}
                        >
                          <NavLink
                            className={cx("no_click", "play_trailer")}
                            href="#"
                            data-site="YouTube"
                            data-id="QF-oyCwaArU"
                            data-title="Official Trailer"
                            onClick={playTrailer}
                          >
                            <div className={cx("play_background")}>
                              <span className={cx("glyphicons_v2", "play", "invert", "svg")}></span>
                            </div>
                          </NavLink>
                        </div>
                      </div>
                      <div className={cx("backdrop")}>
                        <img
                          loading="lazy"
                          className={cx("backdrop")}
                          src={`https://www.themoviedb.org/t/p/w533_and_h300_bestv2/${imagesList[1]}`}
                          alt="The Nun II"
                        />
                      </div>
                      <div className={cx("poster")}>
                        <img
                          className={cx("poster")}
                          src={`https://www.themoviedb.org/t/p/w533_and_h300_bestv2/${imagesList[2]}`}
                          alt="The Nun II"
                        />
                      </div>
                    </div>
                  </div>
                </section>
                <section className={cx("panel", "collection")}>
                  <div className={cx("collection")}>
                    <div
                      className={cx("header", "collection")}
                      style={{
                        backgroundImage: `linear-gradient(to right, rgba(3,37,65, 1) 0%, rgba(3,37,65, 0.6) 100%), url(https://www.themoviedb.org/t/p/w1440_and_h320_multi_faces/${dataMovie.poster_path})`,
                      }}
                    >
                      <div>
                        <h2>Part of the The Nun Collection</h2>
                        <p>Includes The Nun and The Nun II</p>
                      </div>

                      <p className={cx("new_button", "rounded")}>
                        <a href="/collection/968052-the-nun-collection?language=en">View the Collection</a>
                      </p>
                    </div>
                  </div>
                </section>
                <section className={cx("panel", "recommendations", "scroller")}>
                  <div className={cx("recommendation_waypoint")}>
                    <h3 dir="auto">Recommendations</h3>
                    <p className={cx("no_margin")} dir="auto">
                      We don't have enough data to suggest any movies based on The Nun II. You can help by rating movies
                      you've seen.
                    </p>
                  </div>
                </section>
              </div>
            </div>
            <div className={cx("gray_column")}>
              <div>
                <section className={cx("split_column")}>
                  <div>
                    <div className={cx("column", "no_bottom_pad")}>
                      <section className={cx("facts", "left_column")}>
                        <div className={cx("social_links")}>
                          {
                            <>
                              {dataSocial.facebook_id ? (
                                <div>
                                  <Tippy
                                    className={cx("tooltip-lib-ver_2")}
                                    content={<span>Visit Facebook</span>}
                                    placement="top"
                                    interactive={true}
                                    arrow={false}
                                  >
                                    <a
                                      className={cx("social_link")}
                                      title="Visit Facebook"
                                      href={`https://www.facebook.com/${dataSocial.facebook_id}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      data-role="tooltip"
                                    >
                                      <span className={cx("glyphicons_v2", "facebook")}></span>
                                    </a>
                                  </Tippy>
                                </div>
                              ) : null}
                              {dataSocial.twitter_id ? (
                                <div>
                                  <Tippy
                                    className={cx("tooltip-lib-ver_2")}
                                    content={<span>Visit Twitter</span>}
                                    placement="top"
                                    interactive={true}
                                    arrow={false}
                                  >
                                    <a
                                      className={cx("social_link")}
                                      title="Visit Twitter"
                                      href={`https://twitter.com/${dataSocial.twitter_id}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      data-role="tooltip"
                                    >
                                      <span className={cx("glyphicons_v2", "twitter")}></span>
                                    </a>
                                  </Tippy>
                                </div>
                              ) : null}
                              {dataSocial.instagram_id ? (
                                <div>
                                  <Tippy
                                    className={cx("tooltip-lib-ver_2")}
                                    content={<span>Visit Instagram</span>}
                                    placement="top"
                                    interactive={true}
                                    arrow={false}
                                  >
                                    <a
                                      className={cx("social_link")}
                                      title="Visit Instagram"
                                      href={`https://instagram.com/${dataSocial.instagram_id}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      data-role="tooltip"
                                    >
                                      <span className={cx("glyphicons_v2", "instagram")}></span>
                                    </a>
                                  </Tippy>
                                </div>
                              ) : null}
                            </>
                          }

                          <div className={cx("homepage")}>
                            <Tippy
                              className={cx("tooltip-lib-ver_2")}
                              content={<span>Visit Homepage</span>}
                              placement="top"
                              interactive={true}
                              arrow={false}
                            >
                              <a
                                className={cx("social_link")}
                                title="Visit Homepage"
                                href={dataMovie.homepage}
                                target="_blank"
                                rel="noopener noreferrer"
                                data-role="tooltip"
                              >
                                <span className={cx("glyphicons_v2", "link")}></span>
                              </a>
                            </Tippy>
                          </div>
                        </div>
                        {resultType === "tv" ? (
                          <>
                            <h4>
                              <bdi>Facts</bdi>
                            </h4>
                            <p>
                              <strong>
                                <bdi>Status</bdi>
                              </strong>{" "}
                              {dataMovie.status}
                            </p>
                            <p className={cx("no_bottom_pad")}>
                              <strong>
                                <bdi>Network</bdi>
                              </strong>
                            </p>
                            <ul className={cx("networks")}>
                              <li>
                                <a href="/network/1024?language=en">
                                  <img
                                    loading="lazy"
                                    alt="See more TV shows from Prime Video..."
                                    src={`https://www.themoviedb.org/t/p/h30/${logoNetwork}`}
                                    srcSet={`https://www.themoviedb.org/t/p/h30/${logoNetwork} 1x, https://www.themoviedb.org/t/p/h30/${logoNetwork} 2x`}
                                  />
                                </a>
                              </li>
                            </ul>
                            <p>
                              <strong>
                                <bdi>Type</bdi>
                              </strong>{" "}
                              Scripted
                            </p>
                            <p>
                              <strong>
                                <bdi>Original Language</bdi>
                              </strong>{" "}
                              {dataMovie.original_language}
                            </p>
                          </>
                        ) : (
                          <>
                            <p>
                              <strong>
                                <bdi>Status</bdi>
                              </strong>{" "}
                              {dataMovie.status}
                            </p>

                            <p>
                              <strong>
                                <bdi>Original Language</bdi>
                              </strong>{" "}
                              {dataMovie.original_language}
                            </p>
                            <p>
                              <strong>
                                <bdi>Budget</bdi>
                              </strong>{" "}
                              {expense(Number(dataMovie.budget))}
                            </p>
                            <p>
                              <strong>
                                <bdi>Revenue</bdi>
                              </strong>{" "}
                              {expense(Number(dataMovie.revenue))}
                            </p>
                          </>
                        )}
                      </section>
                      <section className={cx("keywords", "right_column")}>
                        <h4>
                          <bdi>Keywords</bdi>
                        </h4>
                        <ul>
                          {resultType === "movie"
                            ? dataKeywords.map((keyword) => {
                                return (
                                  <li key={keyword}>
                                    <a href="#">{keyword.name}</a>
                                  </li>
                                );
                              })
                            : dataKeywords.map((keyWord) => {
                                return (
                                  <li key={keyWord}>
                                    <a href="#">{keyWord.name}</a>
                                  </li>
                                );
                              })}
                        </ul>
                      </section>
                    </div>
                  </div>
                  <div>
                    <section className={cx("content_score")} data-role="tooltip">
                      <h4 className={cx("flex")} dir="auto">
                        Content Score&nbsp;
                        <span
                          className={cx("glyphicons_v2", "circle-question", "hide")}
                          data-element="content_score"
                        ></span>
                      </h4>

                      <div className={cx("content_score_wrapper")}>
                        <div className={cx("content_score")}>
                          <div className={cx("false")}>
                            <p>100</p>
                          </div>
                        </div>
                        <p dir="auto">Yes! Looking good!</p>
                      </div>

                      <div className={cx("content_score_helper", "hide")}>
                        <p>
                          Looks like we're missing the following data in <strong>en-US</strong> or
                          <strong>en-US</strong>...
                        </p>

                        <ul className={cx("content_score")}></ul>
                      </div>
                    </section>
                    <section className={cx("leaderboard")}>
                      <h4>Top Contributors</h4>
                      <div className={cx("leaders")}>
                        <div className={cx("edit_leader")}>
                          <div className={cx("avatar")}>
                            <a href="/u/raze464?language=en">
                              <img
                                loading="lazy"
                                className={cx("avatar")}
                                src="https://www.themoviedb.org/t/p/w45_and_h45_face/yYG7Rhn9HfFpssIMeNiDynvxC14.jpg"
                                alt="raze464"
                              />
                            </a>
                          </div>
                          <div className={cx("info")}>
                            <p className={cx("edit_count")}>
                              116
                              <br />
                              <a href="/u/raze464?language=en">raze464</a>
                            </p>
                          </div>
                        </div>
                        <div className={cx("edit_leader")}>
                          <div className={cx("avatar")}>
                            <a href="/u/Fougasse?language=en">
                              <img
                                loading="lazy"
                                className={cx("avatar")}
                                src="https://www.themoviedb.org/t/p/w45_and_h45_face/qZW7TazXYrGysGBgO6ygeAaC4WO.jpg"
                                alt="Fougasse"
                              />
                            </a>
                          </div>
                          <div className={cx("info")}>
                            <p className={cx("edit_count")}>
                              111
                              <br />
                              <a href="/u/Fougasse?language=en">Fougasse</a>
                            </p>
                          </div>
                        </div>
                        <div className={cx("edit_leader")}>
                          <div className={cx("avatar")}>
                            <a href="/u/vgfu34?language=en">
                              <span className={cx("round", "initials", "background_color", "pink")}>v</span>
                            </a>
                          </div>
                          <div className={cx("info")}>
                            <p className={cx("edit_count")}>
                              55
                              <br />
                              <a href="/u/vgfu34?language=en">vgfu34</a>
                            </p>
                          </div>
                        </div>
                        <div className={cx("edit_leader")}>
                          <div className={cx("avatar")}>
                            <a href="/u/Ed_Wood2018?language=en">
                              <img
                                loading="lazy"
                                className={cx("avatar")}
                                src="https://secure.gravatar.com/avatar/57d0a9beadb95c4ee2467281304d7c94.jpg?s=45"
                                srcSet="https://secure.gravatar.com/avatar/57d0a9beadb95c4ee2467281304d7c94.jpg?s=45 1x, https://secure.gravatar.com/avatar/57d0a9beadb95c4ee2467281304d7c94.jpg?s=90 2x"
                                alt="Ed_Wood2018"
                              />
                            </a>
                          </div>
                          <div className={cx("info")}>
                            <p className={cx("edit_count")}>
                              32
                              <br />
                              <a href="/u/Ed_Wood2018?language=en">Ed_Wood2018</a>
                            </p>
                          </div>
                        </div>

                        <p>
                          <a href="/movie/968051-the-nun-ii/changes?language=en">
                            <span className={cx("glyphicons", "glyphicons-chevron-right", "x1")}></span> View Edit
                            History
                          </a>
                        </p>
                      </div>
                    </section>
                    <section className={cx("popularity_trend")}>
                      <h4 dir="auto">Popularity Trend</h4>
                      <div className={cx("popularity")}>
                        <div data-role="sparkline" className={cx("k-sparkline")} style={{position: "relative"}}>
                          <span data-role="surface" style={{width: "203px", height: "50px"}}>
                            <svg
                              style={{
                                width: "100%",
                                height: "100%",
                                overflow: "hidden",
                                left: "0px",
                                top: "-0.600006px",
                              }}
                              xmlns="http://www.w3.org/2000/svg"
                              xmlnsXlink="http://www.w3.org/1999/xlink"
                              version="1.1"
                            >
                              <defs></defs>
                              <g>
                                <path d="M0 0 L 203 0 203 50 0 50Z" stroke="none" fill="none"></path>
                                <path d="M2 3 L 200 3 200 48 2 48Z" stroke="none" fill="#fff" fillOpacity="0"></path>
                                <g>
                                  <g></g>
                                  <g></g>
                                  <g>
                                    <path
                                      style={{display: "none"}}
                                      d="M2 3 L 2 48"
                                      stroke="#8e8e8e"
                                      strokeWidth="2"
                                      fill="none"
                                    ></path>
                                  </g>
                                  <g></g>
                                  <g>
                                    <g>
                                      <path
                                        d="M16.143 40.5 L 44.429 40.5 72.714 40.5 101 33 129.286 25.5 157.571 10.5 185.857 10.5"
                                        stroke="#200b0b"
                                        strokeWidth="2"
                                        fill="none"
                                      ></path>
                                    </g>
                                  </g>
                                </g>
                                <g></g>
                              </g>
                            </svg>
                          </span>
                        </div>
                      </div>
                    </section>
                  </div>
                  <div>
                    <p className={cx("rounded", "new_button", "pad")}>
                      <a href="/login?language=en">
                        <span className={cx("glyphicons_v2", "lock")}></span> Login to edit
                      </a>
                    </p>
                  </div>
                  <div className={cx("keyboard_shortcut_text")}>
                    <p>
                      <a className={cx("no_click")} href="#">
                        <span className={cx("glyphicons_v2", "keyboard")}></span> Keyboard Shortcuts
                      </a>
                    </p>
                  </div>
                  <div className={cx("report_issue")}>
                    <p className={cx("report_issue")}>
                      <span className={cx("glyphicons_v2", "speech-bubble-alert")}></span> Login to report an issue
                    </p>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isShowIframe && <Iframe embedId={finalTtraler.key} onClick={handleHideIframe} name={dataMovie.title} />}
      {isShowOverlay && (
        <OverlayContent
          id={movieId}
          type={resultType}
          onClick={handleHideOverlay}
          backdrop_path={dataMovie.poster_path}
          poster_path={dataMovie.poster_path}
        />
      )}
    </section>
  );
};

export default BackDrop;

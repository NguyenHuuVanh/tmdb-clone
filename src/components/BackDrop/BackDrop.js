import {useEffect, useRef, useState} from "react";
import {Link, NavLink, useLocation, useParams} from "react-router-dom";

import classNames from "classnames/bind";
import http from "~/services/axios/axios";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional
import "react-circular-progressbar/dist/styles.css";
import {v4 as uuidv4} from "uuid";
import ApiLinks from "~/services/api/Apis";
import styles from "./BackDrop.module.scss";
import ShortCutBar from "~/layout/Components/ShortCutBar/ShortCutBar";
import OverlayContent from "./OverlayContent/OverlayContent";
import Iframe from "./IframeContent/Iframe";
import defaultImage from "~/assets/images/default-img/defaultImg.jpg";
import Header from "./Header/Header";
import Reviews from "../Reviews/Reviews";
import {Box, LinearProgress, Skeleton} from "@mui/material";
import expense from "~/services/utils/ChangeMoneyUtils";
import Recommentdation from "./Recommentdation/Recommentdation";

const cx = classNames.bind(styles);

const BackDrop = () => {
  const {movieId} = useParams();
  const {pathname} = useLocation();
  const [id] = movieId.split("-");
  const matchResult = pathname.match(/^\s*\/(\w+)/);
  const resultType = matchResult ? matchResult[1] : null;

  const [isShowOverlay, setIsShowOverlay] = useState(false);
  const [isShowIframe, setIsShowIframe] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [dataMovie, setDataMovie] = useState([]);
  const [dataActors, setDataActors] = useState([]);
  const [dataCrew, setDataCrew] = useState([]);
  const [dataUrlTraler, setDataUrlTraler] = useState([]);
  const [dataImages, setDataImages] = useState([]);
  const [dataSocial, setDataSocial] = useState([]);
  const [dataKeywords, setDataKeywords] = useState([]);
  const [dataReview, setDataReview] = useState([]);
  const [dataRecommentdation, setDataRecommentdation] = useState([]);
  console.log("🚀 ~ BackDrop ~ dataRecommentdation:", dataRecommentdation);
  const [activeTab, setActiveTab] = useState("first");
  const [activeTabMedia, setActiveTabMedia] = useState("popular");
  const [isLoading, setIsLoading] = useState(true);
  console.log(dataMovie);

  const scrollerRefOne = useRef();
  const scrollerRefSecond = useRef();
  const scrollerRefTheree = useRef();

  const [loading, setLoading] = useState(false);
  const [dataVideos, setDataVideos] = useState([]);

  const randomID = uuidv4();

  const fetchDataVideos = async () => {
    try {
      setLoading(true);
      const response = await http.get(ApiLinks.apiUrlTraler(id, resultType));
      setDataVideos(response.data.results);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const getDatas = {
    dataMovieInfomation: () => {
      setLoading(true);
      http
        .get(ApiLinks.apiMovieInfomation(id, resultType))
        .then((response) => {
          setDataMovie(response.data);
          setTimeout(() => {
            setLoading(false);
          }, 2000);
        })
        .catch((error) => {
          console.log(error);
        });
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
    dataImagesMovie: () => {
      http
        .get(ApiLinks.apiImagesMovie(id, resultType))
        .then((res) => {
          setDataImages(res.data.backdrops);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    dataInfomationSocial: () => {
      http
        .get(ApiLinks.apiMovieSocial(id, resultType))
        .then((res) => {
          setDataSocial(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    dataInfomationActors: () => {
      http
        .get(ApiLinks.apiActors(id, resultType))
        .then((res) => {
          setDataActors(res.data.crew);
          setDataCrew(res.data.cast);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    dataInfomationKeywords: () => {
      http
        .get(ApiLinks.apiKeywordsRecommendation(id, resultType))
        .then((res) => {
          setDataKeywords(res.data.results ?? res.data.keywords);
        })
        .catch((error) => console.log(error));
    },
    dataPostReview: () => {
      http
        .get(ApiLinks.apiPostReview(id, resultType))
        .then((res) => {
          setDataReview(res.data.results);
        })
        .catch((error) => console.log(error));
    },
    dataRecommentdation: () => {
      http
        .get(ApiLinks.apiRecommendations(id, resultType))
        .then((response) => {
          setDataRecommentdation(response.data.results);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  };

  const playTrailer = () => {
    setIsShowIframe(true);
  };

  const finalTtraler = dataUrlTraler.find(
    (url) => url.name === "Official Trailer" || url.type === "Trailer" || url.site === "YouTube"
  );

  const imagesList = dataImages.map((image) => {
    return image.file_path;
  });

  const showOverlay = {
    handleShowOverlay: () => {
      setIsShowOverlay(true);
    },
    handleHideOverlay: () => {
      setIsShowOverlay(false);
    },
  };

  const handleHideIframe = () => {
    setIsShowIframe(true);
    setIsShowIframe(false);
  };

  const handleScroll = () => {
    if (
      scrollerRefOne.current.scrollLeft >= 50 ||
      scrollerRefSecond.current.scrollLeft >= 50 ||
      scrollerRefTheree.current.scrollLeft >= 50
    ) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  const networkCompanies = () => {
    const data = dataMovie.networks;
    return data && data.map((compani) => compani.logo_path);
  };

  const changeTab = {
    social: (name) => {
      setActiveTab(name);
    },
    media: (name) => {
      setActiveTabMedia(name);
    },
  };
  const filteredActor = () => {
    const actors = dataActors.filter((item, index, array) => {
      return array.findIndex((obj) => obj.name === item.name) === index;
    });
    return actors;
  };

  useEffect(() => {
    getDatas.dataMovieInfomation();
    getDatas.dataImfomationUrlTraler();
    getDatas.dataImagesMovie();
    getDatas.dataInfomationSocial();
    getDatas.dataInfomationActors();
    getDatas.dataInfomationKeywords();
    getDatas.dataPostReview();
    getDatas.dataRecommentdation();

    window.onload = () => {
      window.scrollTo(0, 0);
    };
    document.documentElement.style.setProperty("--maxPrimaryPageWidth", "1400px");
  }, []);

  return (
    <section className={cx("container", "movie_content", "backdrop", "poster")}>
      <ShortCutBar />
      <Header
        id={id}
        resultType={resultType}
        movieId={movieId}
        dataMovie={dataMovie}
        dataCrew={dataCrew}
        dataActor={dataActors}
      />
      <div className={cx("media", "movie_v4", "header_large")}>
        {loading && (
          <Box className={cx("line_progress")} sx={{width: "100%"}}>
            <LinearProgress />
          </Box>
        )}

        <div className={cx("column_wrapper")}>
          <div className={cx("content_wrapper")}>
            <div>
              <div className={cx("white_column")}>
                <section className={cx("panel", "top_billed", "scroller")}>
                  <h3 dir="auto">Top Billed Cast</h3>
                  <div className={cx("scroller_wrap", "should_fade", isScrolled ? "is_hidden" : "is_fading")}>
                    <ol className={cx("people", "scroller")} ref={scrollerRefOne} onScroll={handleScroll}>
                      {filteredActor() ? (
                        filteredActor()
                          .slice(0, 9)
                          .map((actor, index) => {
                            return (
                              <li className={cx("card")} key={index}>
                                <a href={`/person/${actor.id}-${actor.name}?language=en`}>
                                  <img
                                    loading="lazy"
                                    className={cx("profile")}
                                    src={
                                      actor.profile_path
                                        ? `https://www.themoviedb.org/t/p/w138_and_h175_face/${actor.profile_path}`
                                        : defaultImage
                                    }
                                    alt={actor.name}
                                  />
                                </a>

                                <p>
                                  <a href={`/person/${actor.id}-${actor.name}?language=en`}>{actor.name}</a>
                                </p>
                                <p className={cx("character")}>{actor.job}</p>
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
                        <li
                          className={cx(activeTab === "first" ? "active" : "")}
                          onClick={() => changeTab.social("first")}
                        >
                          <a id="reviews" className={cx("media_panel")}>
                            Reviews <span>{dataReview.length}</span>
                          </a>
                        </li>
                        <li
                          className={cx(activeTab === "second" ? "active" : "")}
                          onClick={() => changeTab.social("second")}
                        >
                          <a id="discussions" className={cx("media_panel")}>
                            Discussions <span>1</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className={cx("content")}>
                      <div className={cx("original_content")}>
                        <div className={cx(activeTab === "first" ? "show_content" : "", "review_container")}>
                          {dataReview && dataReview[0] && (
                            <Reviews
                              key={randomID}
                              dataReview={dataReview[0]}
                              id={id}
                              resultType={resultType}
                              dataMovie={dataMovie}
                            />
                          )}
                        </div>
                        <div className={cx(activeTab === "second" ? "show_content" : "", "discussion_container")}>
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
                      <li
                        className={cx(activeTabMedia === "popular" ? "active" : "")}
                        onClick={() => changeTab.media("popular")}
                      >
                        <a id="popular" className={cx("media_panel")}>
                          Most Popular
                        </a>
                      </li>
                      <li
                        className={cx(activeTabMedia === "videos" ? "active" : "")}
                        onClick={() => {
                          changeTab.media("videos");
                          fetchDataVideos();
                        }}
                      >
                        <a id="videos" className={cx("media_panel")}>
                          Videos <span>{dataUrlTraler.length}</span>
                        </a>
                      </li>
                      <li
                        className={cx("media_panel", activeTabMedia === "backdrops" ? "active" : "")}
                        onClick={() => {
                          changeTab.media("backdrops");
                          getDatas.dataMovieInfomation();
                        }}
                      >
                        <a id="backdrops">
                          Backdrops <span>{dataImages.length}</span>
                        </a>
                      </li>
                      <li
                        className={cx("media_panel", activeTabMedia === "posters" ? "active" : "")}
                        onClick={() => {
                          changeTab.media("posters");
                          getDatas.dataMovieInfomation();
                        }}
                      >
                        <a id="posters">
                          Posters <span>{dataMovie && dataMovie.images && dataMovie.images.posters.length}</span>
                        </a>
                      </li>
                      {activeTabMedia !== "popular" && (
                        <li className={cx("view_all")}>
                          <NavLink
                            to={`/${resultType}/${id}/${activeTabMedia}?language=en`}
                          >{`View All ${activeTabMedia}`}</NavLink>
                        </li>
                      )}
                    </ul>
                  </div>
                  <div
                    className={cx("scroller_wrap", "should_fade", isScrolled ? "is_hidden" : "is_fading")}
                    ref={scrollerRefSecond}
                    onScroll={handleScroll}
                  >
                    {activeTabMedia === "popular" && (
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
                    )}
                    {activeTabMedia === "videos" &&
                      dataVideos &&
                      (loading ? (
                        <div className={cx("loading_skeleton")}>
                          <Skeleton
                            variant="rectangular"
                            width={533}
                            height={300}
                            sx={{borderRadius: "8px"}}
                            animation="wave"
                          />
                          <Skeleton
                            variant="rectangular"
                            width={533}
                            height={300}
                            sx={{borderRadius: "8px"}}
                            animation="wave"
                          />
                        </div>
                      ) : (
                        <div
                          className={cx("h_scroller", "content scroller")}
                          ref={scrollerRefSecond}
                          onScroll={handleScroll}
                        >
                          {dataVideos.slice(0, 6).map((video, index) => {
                            return (
                              <div key={index} className={cx("video", "card", "no_border")}>
                                <div
                                  className={cx("wrapper")}
                                  style={{
                                    backgroundImage: `url("https://image.tmdb.org/t/p/w533_and_h300_bestv2/${imagesList[index]}")`,
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
                            );
                          })}
                        </div>
                      ))}
                    {activeTabMedia === "backdrops" &&
                      dataMovie &&
                      (loading ? (
                        <div className={cx("loading_skeleton")}>
                          <Skeleton
                            variant="rectangular"
                            width={533}
                            height={300}
                            sx={{borderRadius: "8px"}}
                            animation="wave"
                          />
                          <Skeleton
                            variant="rectangular"
                            width={533}
                            height={300}
                            sx={{borderRadius: "8px"}}
                            animation="wave"
                          />
                        </div>
                      ) : (
                        <div
                          className={cx("h_scroller", "content scroller")}
                          ref={scrollerRefSecond}
                          onScroll={handleScroll}
                        >
                          {dataMovie &&
                            dataMovie.images &&
                            dataMovie.images.backdrops.slice(0, 6).map((img, index) => {
                              return (
                                <div key={index} className={cx("backdrop")}>
                                  <img
                                    className={cx("backdrop_img")}
                                    src={`https://media.themoviedb.org/t/p/w533_and_h300_bestv2/${img.file_path}`}
                                    srcSet={`https://media.themoviedb.org/t/p/w533_and_h300_bestv2/${img.file_path} 1x https://media.themoviedb.org/t/p/w533_and_h300_bestv2/${img.file_path} 2x`}
                                    alt={dataMovie.original_title}
                                  />
                                </div>
                              );
                            })}
                        </div>
                      ))}
                    {activeTabMedia === "posters" &&
                      dataMovie &&
                      (loading ? (
                        <div className={cx("loading_skeleton")}>
                          <Skeleton
                            variant="rectangular"
                            width={533}
                            height={300}
                            sx={{borderRadius: "8px"}}
                            animation="wave"
                          />
                          <Skeleton
                            variant="rectangular"
                            width={533}
                            height={300}
                            sx={{borderRadius: "8px"}}
                            animation="wave"
                          />
                        </div>
                      ) : (
                        <div
                          className={cx("h_scroller", "content scroller")}
                          ref={scrollerRefSecond}
                          onScroll={handleScroll}
                        >
                          {dataMovie &&
                            dataMovie.images &&
                            dataMovie.images.posters.slice(0, 6).map((img, index) => {
                              return (
                                <div key={index} className={cx("poster")}>
                                  <img
                                    className={cx("poster_img")}
                                    src={`https://media.themoviedb.org/t/p/w220_and_h330_face/${img.file_path}`}
                                    srcSet={`https://media.themoviedb.org/t/p/w220_and_h330_face/${img.file_path} 1x https://media.themoviedb.org/t/p/w220_and_h330_face/${img.file_path} 2x`}
                                    alt={dataMovie.original_title}
                                  />
                                </div>
                              );
                            })}
                        </div>
                      ))}
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
                    <div
                      className={cx("recommentdation_list", "should_fade", isScrolled ? "is_hidden" : "is_fading")}
                      style={{display: "flex", overflowX: "scroll", position: "relative"}}
                      ref={scrollerRefTheree}
                      onScroll={handleScroll}
                    >
                      {dataRecommentdation.map((card, index) => {
                        return (
                          <Recommentdation
                            id={card.id}
                            index={index}
                            image={card.poster_path}
                            name={card.name}
                            time={card.first_air_date}
                            recent={card.vote_average}
                            path={pathname}
                            type={resultType}
                          />
                        );
                      })}
                    </div>
                    {/* <p className={cx("no_margin")} dir="auto">
                      We don't have enough data to suggest any movies based on The Nun II. You can help by rating movies
                      you've seen.
                    </p> */}
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
                              {networkCompanies() &&
                                networkCompanies().map((logo, index) => (
                                  <li key={randomID}>
                                    <a href="/network/1024?language=en">
                                      <img
                                        loading="lazy"
                                        alt="See more TV shows from Prime Video..."
                                        src={`https://www.themoviedb.org/t/p/h30/${logo}`}
                                        srcSet={`https://www.themoviedb.org/t/p/h30/${logo} 1x, https://www.themoviedb.org/t/p/h30/${logo} 2x`}
                                      />
                                    </a>
                                  </li>
                                ))}
                              {/* <li>
                                <a href="/network/1024?language=en">
                                  <img
                                    loading="lazy"
                                    alt="See more TV shows from Prime Video..."
                                    src={`https://www.themoviedb.org/t/p/h30/${logoNetwork}`}
                                    srcSet={`https://www.themoviedb.org/t/p/h30/${logoNetwork} 1x, https://www.themoviedb.org/t/p/h30/${logoNetwork} 2x`}
                                  />
                                </a>
                              </li> */}
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
                          {dataKeywords.map((keyword, index) => {
                            return (
                              <li key={index}>
                                <a href="#">{keyword.name}</a>
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
      {isShowIframe && (
        <Iframe
          embedId={finalTtraler && finalTtraler.key}
          onClick={handleHideIframe}
          name={dataMovie.title || dataMovie.name}
        />
      )}
      {isShowOverlay && (
        <OverlayContent
          id={movieId}
          type={resultType}
          onClick={showOverlay.handleHideOverlay}
          backdrop_path={dataMovie.poster_path}
          poster_path={dataMovie.poster_path}
          dataImagess={dataMovie}
        />
      )}
    </section>
  );
};

export default BackDrop;

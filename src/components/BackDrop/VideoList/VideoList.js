import React, {useEffect, useState} from "react";
import classNames from "classnames/bind";
import styles from "./VideoList.module.scss";
import ApiLinks from "~/services/api/Apis";
import {NavLink, Navigate, useNavigate, useParams} from "react-router-dom";
import http from "~/services/axios/axios";
import ShortCutBar from "~/layout/Components/ShortCutBar/ShortCutBar";
import Iframe from "../IframeContent/Iframe";

const cx = classNames.bind(styles);

const VideoList = () => {
  const [dataMovie, setDataMovie] = useState([]);
  const [typeVideo, setTypeVideo] = useState("trailers");
  const [isShowOverlay, setIsShowOverlay] = useState(false);
  const [isShowIframe, setIsShowIframe] = useState(false);
  const [key, setKey] = useState("");
  const {type, id} = useParams();
  console.log("🚀 ~ VideoList ~ dataMovie:", dataMovie);

  const getDatas = {
    dataMovieInfomation: () => {
      http
        .get(ApiLinks.apiMovieInfomation(id, type))
        .then((response) => {
          setDataMovie(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  };

  const typeVideos = {
    popular: () => {
      return dataMovie && dataMovie.videos && dataMovie.videos.results.filter((video) => video.type === "Featurette");
    },
    clip: () => {
      return dataMovie && dataMovie.videos && dataMovie.videos.results.filter((video) => video.type === "Clip");
    },
    teaser: () => {
      return dataMovie && dataMovie.videos && dataMovie.videos.results.filter((video) => video.type === "Teaser");
    },
    trailer: () => {
      return dataMovie && dataMovie.videos && dataMovie.videos.results.filter((video) => video.type === "Trailer");
    },
    BehindScenes: () => {
      return (
        dataMovie && dataMovie.videos && dataMovie.videos.results.filter((video) => video.type === "Behind the Scenes")
      );
    },
    Bloopers: () => {
      return dataMovie && dataMovie.videos && dataMovie.videos.results.filter((video) => video.type === "Bloopers");
    },
  };

  const changeType = {
    trailers: (name) => {
      setTypeVideo(name);
    },
    teasers: (name) => {
      setTypeVideo(name);
    },
    clips: (name) => {
      setTypeVideo(name);
    },
    behindtheScenes: (name) => {
      setTypeVideo(name);
    },
    bloopers: (name) => {
      setTypeVideo(name);
    },
    featurettes: (name) => {
      setTypeVideo(name);
    },
  };
  const formattDate = (dateString) => {
    const date = new Date(dateString);

    const options = {year: "numeric", month: "long", day: "2-digit"};
    const formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate;
  };

  const render = () => {
    switch (typeVideo) {
      case "trailers":
        return typeVideos.trailer() && typeVideos.trailer().length !== 0 && typeVideo === "trailers" ? (
          typeVideos.trailer().map((video, index) => {
            return (
              <div key={index} id={video.id} className={cx("video_card", "default")}>
                <div
                  className={cx("wrapper")}
                  style={{
                    backgroundImage: `url("https://image.tmdb.org/t/p/w533_and_h300_bestv2/${dataMovie.images.backdrops[index].file_path}")`,
                  }}
                >
                  <NavLink
                    className={cx("play_trailer")}
                    data-site="YouTube"
                    data-title="Official Trailer"
                    previewlistener="true"
                    onClick={() => {
                      playTrailer(video.key);
                    }}
                  >
                    <div className={cx("play_background")}>
                      <span className={cx("glyphicons_v2", "play", "invert", "svg")}></span>
                    </div>
                  </NavLink>
                </div>

                <div className={cx("info_movie")}>
                  <div>
                    <h2>
                      <a
                        href="https://www.youtube.com/watch?v=iwROgK94zcM"
                        target="_blank"
                        rel="noopener"
                        previewlistener="true"
                      >
                        {video.name}
                      </a>
                    </h2>
                    <h3 className={cx("sub")}>{`${video.type}  • ${formattDate(video.published_at)}`}</h3>
                    <p></p>
                  </div>

                  <div className={cx("bg")}>
                    <img src="https://media.themoviedb.org/t/p/original/e2XGMhHKR9QKE8huwuP0xqqZ9zs.svg" width="20" />
                    <h4>
                      <a href="/video/channel/UCRuJMENPfFiMYoqCXleDLLQ?language=en" previewlistener="true">
                        {video.name}
                      </a>{" "}
                      <span className={cx("glyphicons_v2", "verify-check")}></span>
                    </h4>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div>
            <p style={{fontSize: "16px"}}>{`There are no English trailers added to ${dataMovie.title}.`}</p>
          </div>
        );
        break;
      case "teasers":
        return typeVideos.teaser() && typeVideos.teaser().length !== 0 && typeVideo === "teasers" ? (
          typeVideos.teaser().map((video, index) => {
            return (
              <div key={index} id={video.id} className={cx("video_card", "default")}>
                <div
                  className={cx("wrapper")}
                  style={{
                    backgroundImage: `url("https://image.tmdb.org/t/p/w533_and_h300_bestv2/${dataMovie.images.backdrops[index].file_path}")`,
                  }}
                >
                  <a
                    className={cx("play_trailer")}
                    data-site="YouTube"
                    data-title="Official Trailer"
                    previewlistener="true"
                    onClick={() => {
                      playTrailer(video.key);
                    }}
                  >
                    <div className={cx("play_background")}>
                      <span className={cx("glyphicons_v2", "play", "invert", "svg")}></span>
                    </div>
                  </a>
                </div>

                <div className={cx("info_movie")}>
                  <div>
                    <h2>
                      <a
                        href="https://www.youtube.com/watch?v=iwROgK94zcM"
                        target="_blank"
                        rel="noopener"
                        previewlistener="true"
                      >
                        {video.name}
                      </a>
                    </h2>
                    <h3 className={cx("sub")}>{`${video.type}  • ${formattDate(video.published_at)}`}</h3>
                    <p></p>
                  </div>

                  <div className={cx("bg")}>
                    <img src="https://media.themoviedb.org/t/p/original/e2XGMhHKR9QKE8huwuP0xqqZ9zs.svg" width="20" />
                    <h4>
                      <a href="/video/channel/UCRuJMENPfFiMYoqCXleDLLQ?language=en" previewlistener="true">
                        {video.name}
                      </a>{" "}
                      <span className={cx("glyphicons_v2", "verify-check")}></span>
                    </h4>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div>
            <p style={{fontSize: "16px"}}>{`There are no English teasers added to ${dataMovie.title}.`}</p>
          </div>
        );
        break;
      case "clips":
        return typeVideos.clip() && typeVideos.clip().length !== 0 && typeVideo === "clips" ? (
          typeVideos.clip().map((video, index) => {
            return (
              <div key={index} id={video.id} className={cx("video_card", "default")}>
                <div
                  className={cx("wrapper")}
                  style={{
                    backgroundImage: `url("https://image.tmdb.org/t/p/w533_and_h300_bestv2/${dataMovie.images.backdrops[index].file_path}")`,
                  }}
                >
                  <a
                    className={cx("play_trailer")}
                    data-site="YouTube"
                    data-title="Official Trailer"
                    previewlistener="true"
                    onClick={() => {
                      playTrailer(video.key);
                    }}
                  >
                    <div className={cx("play_background")}>
                      <span className={cx("glyphicons_v2", "play", "invert", "svg")}></span>
                    </div>
                  </a>
                </div>

                <div className={cx("info_movie")}>
                  <div>
                    <h2>
                      <a
                        href="https://www.youtube.com/watch?v=iwROgK94zcM"
                        target="_blank"
                        rel="noopener"
                        previewlistener="true"
                      >
                        {video.name}
                      </a>
                    </h2>
                    <h3 className={cx("sub")}>{`${video.type}  • ${formattDate(video.published_at)}`}</h3>
                    <p></p>
                  </div>

                  <div className={cx("bg")}>
                    <img src="https://media.themoviedb.org/t/p/original/e2XGMhHKR9QKE8huwuP0xqqZ9zs.svg" width="20" />
                    <h4>
                      <a href="/video/channel/UCRuJMENPfFiMYoqCXleDLLQ?language=en" previewlistener="true">
                        {video.name}
                      </a>{" "}
                      <span className={cx("glyphicons_v2", "verify-check")}></span>
                    </h4>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div>
            <p style={{fontSize: "16px"}}>{`There are no English clips added to ${dataMovie.title}.`}</p>
          </div>
        );
        break;
      case "behindtheScenes":
        return typeVideos.BehindScenes() &&
          typeVideos.BehindScenes().length !== 0 &&
          typeVideo === "behindtheScenes" ? (
          typeVideos.BehindScenes().map((video, index) => {
            return (
              <div key={index} id={video.id} className={cx("video_card", "default")}>
                <div
                  className={cx("wrapper")}
                  style={{
                    backgroundImage: `url("https://image.tmdb.org/t/p/w533_and_h300_bestv2/${dataMovie.images.backdrops[index].file_path}")`,
                  }}
                >
                  <a
                    className={cx("play_trailer")}
                    data-site="YouTube"
                    data-title="Official Trailer"
                    previewlistener="true"
                    onClick={() => {
                      playTrailer(video.key);
                    }}
                  >
                    <div className={cx("play_background")}>
                      <span className={cx("glyphicons_v2", "play", "invert", "svg")}></span>
                    </div>
                  </a>
                </div>

                <div className={cx("info_movie")}>
                  <div>
                    <h2>
                      <a
                        href="https://www.youtube.com/watch?v=iwROgK94zcM"
                        target="_blank"
                        rel="noopener"
                        previewlistener="true"
                      >
                        {video.name}
                      </a>
                    </h2>
                    <h3 className={cx("sub")}>{`${video.type}  • ${formattDate(video.published_at)}`}</h3>
                    <p></p>
                  </div>

                  <div className={cx("bg")}>
                    <img src="https://media.themoviedb.org/t/p/original/e2XGMhHKR9QKE8huwuP0xqqZ9zs.svg" width="20" />
                    <h4>
                      <a href="/video/channel/UCRuJMENPfFiMYoqCXleDLLQ?language=en" previewlistener="true">
                        {video.name}
                      </a>{" "}
                      <span className={cx("glyphicons_v2", "verify-check")}></span>
                    </h4>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div>
            <p style={{fontSize: "16px"}}>{`There are no English behind the Scenes added to ${dataMovie.title}.`}</p>
          </div>
        );
        break;
      case "bloopers":
        return typeVideos.Bloopers() && typeVideos.Bloopers().length !== 0 && typeVideo === "bloopers" ? (
          typeVideos.Bloopers().map((video, index) => {
            return (
              <div key={index} id={video.id} className={cx("video_card", "default")}>
                <div
                  className={cx("wrapper")}
                  style={{
                    backgroundImage: `url("https://image.tmdb.org/t/p/w533_and_h300_bestv2/${dataMovie.images.backdrops[index].file_path}")`,
                  }}
                >
                  <a
                    className={cx("play_trailer")}
                    data-site="YouTube"
                    data-title="Official Trailer"
                    previewlistener="true"
                    onClick={() => {
                      playTrailer(video.key);
                    }}
                  >
                    <div className={cx("play_background")}>
                      <span className={cx("glyphicons_v2", "play", "invert", "svg")}></span>
                    </div>
                  </a>
                </div>

                <div className={cx("info_movie")}>
                  <div>
                    <h2>
                      <a
                        href="https://www.youtube.com/watch?v=iwROgK94zcM"
                        target="_blank"
                        rel="noopener"
                        previewlistener="true"
                      >
                        {video.name}
                      </a>
                    </h2>
                    <h3 className={cx("sub")}>{`${video.type}  • ${formattDate(video.published_at)}`}</h3>
                    <p></p>
                  </div>

                  <div className={cx("bg")}>
                    <img src="https://media.themoviedb.org/t/p/original/e2XGMhHKR9QKE8huwuP0xqqZ9zs.svg" width="20" />
                    <h4>
                      <a href="/video/channel/UCRuJMENPfFiMYoqCXleDLLQ?language=en" previewlistener="true">
                        {video.name}
                      </a>{" "}
                      <span className={cx("glyphicons_v2", "verify-check")}></span>
                    </h4>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div>
            <p style={{fontSize: "16px"}}>{`There are no English bloopers added to ${dataMovie.title}.`}</p>
          </div>
        );
        break;
      case "featurettes":
        return typeVideos.popular() && typeVideos.popular().length !== 0 && typeVideo === "featurettes" ? (
          typeVideos.popular().map((video, index) => {
            return (
              <div key={index} id={video.id} className={cx("video_card", "default")}>
                <div
                  className={cx("wrapper")}
                  style={{
                    backgroundImage: `url("https://image.tmdb.org/t/p/w533_and_h300_bestv2/${dataMovie.images.backdrops[index].file_path}")`,
                  }}
                >
                  <a
                    className={cx("play_trailer")}
                    data-site="YouTube"
                    data-title="Official Trailer"
                    previewlistener="true"
                    onClick={() => {
                      playTrailer(video.key);
                    }}
                  >
                    <div className={cx("play_background")}>
                      <span className={cx("glyphicons_v2", "play", "invert", "svg")}></span>
                    </div>
                  </a>
                </div>

                <div className={cx("info_movie")}>
                  <div>
                    <h2>
                      <a
                        href="https://www.youtube.com/watch?v=iwROgK94zcM"
                        target="_blank"
                        rel="noopener"
                        previewlistener="true"
                      >
                        {video.name}
                      </a>
                    </h2>
                    <h3 className={cx("sub")}>{`${video.type}  • ${formattDate(video.published_at)}`}</h3>
                    <p></p>
                  </div>

                  <div className={cx("bg")}>
                    <img src="https://media.themoviedb.org/t/p/original/e2XGMhHKR9QKE8huwuP0xqqZ9zs.svg" width="20" />
                    <h4>
                      <a href="/video/channel/UCRuJMENPfFiMYoqCXleDLLQ?language=en" previewlistener="true">
                        {video.name}
                      </a>{" "}
                      <span className={cx("glyphicons_v2", "verify-check")}></span>
                    </h4>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div>
            <p style={{fontSize: "16px"}}>{`There are no English featurettes added to ${dataMovie.title}.`}</p>
          </div>
        );
        break;

      default:
        <div>
          <p style={{fontSize: "16px"}}>There are no data</p>
        </div>;
        break;
    }
  };

  const playTrailer = (key) => {
    setIsShowIframe(true);
    setKey(key);
  };

  const handleHideIframe = () => {
    setIsShowIframe(false);
  };

  useEffect(() => {
    getDatas.dataMovieInfomation();
    document.documentElement.style.setProperty("--maxPrimaryPageWidth", "1400px");
  }, []);

  return (
    <div className={cx("container")}>
      <div className={cx("shortcut_bar")}>
        <ShortCutBar />
      </div>
      <header className={cx("header")}>
        <div className={cx("header_content")}>
          <div className={cx("header_small")}>
            <span class={cx("header_poster")}>
              <a href="/movie/848538-argylle?language=en" previewlistener="true">
                <div className={cx("glyphicons_v2", "picture", "grey", "poster", "no_image_holder", "no_border")}>
                  <img
                    className={cx("poster")}
                    src={`https://media.themoviedb.org/t/p/w58_and_h87_face/${dataMovie.poster_path}`}
                    srcSet={`https://media.themoviedb.org/t/p/w58_and_h87_face/${dataMovie.poster_path} 1x https://media.themoviedb.org/t/p/w58_and_h87_face/${dataMovie.poster_path} 2x`}
                    alt={dataMovie.original_title}
                  />
                </div>
              </a>
              <span className={cx("header_title")}>
                <div className={cx("title")} dir="auto">
                  <h2 class="7">
                    <NavLink to="" previewlistener="true">
                      {dataMovie.title || dataMovie.original_title}
                    </NavLink>
                    <span className={cx("tag", "release_date")}>
                      {" "}
                      ({dataMovie && dataMovie.release_date && dataMovie.release_date.split("-")[0]})
                    </span>
                  </h2>
                </div>

                <h3>
                  <NavLink class="keyboard_s parent" to={`/${type}/${id}?language=en`} previewlistener="true">
                    ← Back to main
                  </NavLink>
                </h3>
              </span>
            </span>
          </div>
        </div>
      </header>
      <main className={cx("main")}>
        <div className={cx("content")}>
          <div className={cx("content_wrapper")}>
            <div className={cx("aside_content")}>
              <div className={cx("settings_content")}>
                <h3 className={cx("background_color")}>
                  Videos
                  <div>
                    <a
                      href="/movie/4935/edit?active_nav_item=videos&amp;language=en"
                      className={cx("add_video", "tooltip")}
                      title="Add a Video"
                      data-role="tooltip"
                      previewlistener="true"
                    >
                      <span className={cx("glyphicons_v2", "circle-plus")}></span>
                    </a>
                  </div>
                </h3>

                <div id="" className={cx("video_menu_scroller")}>
                  <ul id="video_menu" className={cx("menu_item")}>
                    <li
                      className={cx("menu_link", typeVideo === "trailers" ? "selected" : "")}
                      onClick={() => {
                        changeType.trailers("trailers");
                      }}
                    >
                      <a href="#" previewlistener="true">
                        Trailers
                      </a>
                      <span>{typeVideos.trailer() && typeVideos.trailer().length}</span>
                    </li>
                    <li
                      className={cx("menu_link", typeVideo === "teasers" ? "selected" : "")}
                      onClick={() => {
                        changeType.teasers("teasers");
                      }}
                    >
                      <a href="#" previewlistener="true">
                        Teasers
                      </a>
                      <span>{typeVideos.teaser() && typeVideos.teaser().length}</span>
                    </li>
                    <li
                      className={cx("menu_link", typeVideo === "clips" ? "selected" : "")}
                      onClick={() => {
                        changeType.clips("clips");
                      }}
                    >
                      <a href="#" previewlistener="true">
                        Clips
                      </a>
                      <span>{typeVideos.clip() && typeVideos.clip().length}</span>
                    </li>
                    <li
                      className={cx("menu_link", typeVideo === "behindtheScenes" ? "selected" : "")}
                      onClick={() => {
                        changeType.behindtheScenes("behindtheScenes");
                      }}
                    >
                      <a href="#" previewlistener="true">
                        Behind the Scenes
                      </a>
                      <span>{typeVideos.BehindScenes() && typeVideos.BehindScenes().length}</span>
                    </li>
                    <li
                      className={cx("menu_link", typeVideo === "bloopers" ? "selected" : "")}
                      onClick={() => {
                        changeType.bloopers("bloopers");
                      }}
                    >
                      <a href="#" previewlistener="true">
                        Bloopers
                      </a>
                      <span>{typeVideos.Bloopers() && typeVideos.Bloopers().length}</span>
                    </li>
                    <li
                      className={cx("menu_link", typeVideo === "featurettes" ? "selected" : "")}
                      onClick={() => {
                        changeType.featurettes("featurettes");
                      }}
                    >
                      <a href="#" previewlistener="true">
                        Featurettes
                      </a>
                      <span>{typeVideos.popular() && typeVideos.popular().length}</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <p className={cx("rounded", "new_button", "pad")}>
                  <a class="" href="#" previewlistener="true">
                    edit page
                  </a>
                </p>
              </div>
            </div>
            <div className={cx("main_content")}>
              <div className={cx("content")}>
                <section className={cx("panel_video")}>{render()}</section>
              </div>
            </div>
          </div>
        </div>
      </main>
      {isShowIframe && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            position: "absolute",
            top: "-20%",
          }}
        >
          <Iframe embedId={key} onClick={handleHideIframe} name={dataMovie.title || dataMovie.name} />
        </div>
      )}
    </div>
  );
};

export default VideoList;

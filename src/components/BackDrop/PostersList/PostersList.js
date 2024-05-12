import React, {useEffect, useState} from "react";
import classNames from "classnames/bind";
import styles from "./PostersList.module.scss";
import ApiLinks from "~/services/api/Apis";
import {NavLink, Navigate, useNavigate, useParams} from "react-router-dom";
import http from "~/services/axios/axios";
import ShortCutBar from "~/layout/Components/ShortCutBar/ShortCutBar";

const cx = classNames.bind(styles);

const PostersList = () => {
  const [dataMovie, setDataMovie] = useState([]);
  const [typeVideo, setTypeVideo] = useState("posters");
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

  const changeType = {
    posters: (name) => {
      setTypeVideo(name);
    },
    logos: (name) => {
      setTypeVideo(name);
    },
  };

  const render = () => {
    switch (typeVideo) {
      case "posters":
        return (
          dataMovie &&
          dataMovie.images &&
          dataMovie.images.posters.map((img, index) => {
            return (
              <li key={index} className={cx("card", "compact")}>
                <div className={cx("image_content", "glyphicons_v2", "picture", "grey", "backdrop", "no_image_holder")}>
                  <a
                    className={cx("image")}
                    href={`https://image.tmdb.org/t/p/original/${img.file_path}`}
                    title="View Original"
                    alt="View Original"
                    target="_blank"
                    rel="noopener"
                    previewlistener="true"
                  >
                    <img
                      loading="lazy"
                      className={cx("backdrop")}
                      src={`https://media.themoviedb.org/t/p/w500_and_h282_face/${img.file_path}`}
                      srcset={`https://media.themoviedb.org/t/p/w500_and_h282_face/${img.file_path} 1x https://media.themoviedb.org/t/p/w500_and_h282_face/${img.file_path} 2x`}
                      alt={dataMovie.title}
                    />
                  </a>
                  <div className={cx("rating_info")}>
                    <a className={cx("thumbs_up")} href="#">
                      <span className={cx("glyphicons_v2", "hand-like", "thumb_up")}></span>
                    </a>
                    <a className={cx("thumbs_down")} href="#">
                      <span className={cx("glyphicons_v2", "hand-like", "thumb_down")}></span>
                    </a>
                  </div>
                </div>

                <div className={cx("info")}>
                  <div className={cx("meta")} data-role="tooltip">
                    <h3>
                      Info
                      <span>
                        <span className={cx("glyphicons_v2", "unlock")}></span>
                      </span>
                    </h3>
                    <form className={cx("k-form")}>
                      <label>Added By</label>
                      <p>
                        <a className={cx("info_info")} previewlistener="true">
                          Temearoo
                        </a>
                      </p>

                      <label>Size</label>
                      <p className={cx("flex")}>
                        <a
                          href="https://image.tmdb.org/t/p/original/9RWPPVB9ZPsrqALjcXKkl5rwijN.jpg"
                          target="_blank"
                          rel="noopener"
                          className={cx("info_info")}
                        >
                          {`${img.width}x${img.height}`}
                        </a>{" "}
                        <span className={cx("glyphicons_v2 check ratio")} title=""></span>
                      </p>

                      <label
                        className={cx("k-form-field")}
                        for="image_language_64e4dd535258ae00add2f785"
                        id="image_language_64e4dd535258ae00add2f785_label"
                      >
                        <span className={cx("flex")}>Language</span>
                        <input type="text" className={cx("input")} />
                      </label>
                    </form>
                  </div>
                </div>
              </li>
            );
          })
        );
        break;
      case "logos":
        return (
          dataMovie &&
          dataMovie.images &&
          dataMovie.images.logos.map((img, index) => {
            return (
              <li key={index} className={cx("card", "compact")}>
                <div className={cx("image_content", "glyphicons_v2", "picture", "grey", "backdrop", "no_image_holder")}>
                  <a
                    className={cx("image")}
                    href={`https://image.tmdb.org/t/p/original/${img.file_path}`}
                    title="View Original"
                    alt="View Original"
                    target="_blank"
                    rel="noopener"
                    previewlistener="true"
                  >
                    <img
                      loading="lazy"
                      className={cx("backdrop")}
                      src={`https://media.themoviedb.org/t/p/w500_and_h282_face/${img.file_path}`}
                      srcset={`https://media.themoviedb.org/t/p/w500_and_h282_face/${img.file_path} 1x https://media.themoviedb.org/t/p/w500_and_h282_face/${img.file_path} 2x`}
                      alt={dataMovie.title}
                    />
                  </a>
                  <div className={cx("rating_info")}>
                    <a className={cx("thumbs_up")} href="#">
                      <span className={cx("glyphicons_v2", "hand-like", "thumb_up")}></span>
                    </a>
                    <a className={cx("thumbs_down")} href="#">
                      <span className={cx("glyphicons_v2", "hand-like", "thumb_down")}></span>
                    </a>
                  </div>
                </div>

                <div className={cx("info")}>
                  <div className={cx("meta")} data-role="tooltip">
                    <h3>
                      Info
                      <span>
                        <span className={cx("glyphicons_v2", "unlock")}></span>
                      </span>
                    </h3>
                    <form className={cx("k-form")}>
                      <label>Added By</label>
                      <p>
                        <a className={cx("info_info")} previewlistener="true">
                          Temearoo
                        </a>
                      </p>

                      <label>Size</label>
                      <p className={cx("flex")}>
                        <a
                          href="https://image.tmdb.org/t/p/original/9RWPPVB9ZPsrqALjcXKkl5rwijN.jpg"
                          target="_blank"
                          rel="noopener"
                          className={cx("info_info")}
                        >
                          {`${img.width}x${img.height}`}
                        </a>{" "}
                        <span className={cx("glyphicons_v2 check ratio")} title=""></span>
                      </p>

                      <label
                        className={cx("k-form-field")}
                        for="image_language_64e4dd535258ae00add2f785"
                        id="image_language_64e4dd535258ae00add2f785_label"
                      >
                        <span className={cx("flex")}>Language</span>
                        <input type="text" className={cx("input")} />
                      </label>
                    </form>
                  </div>
                </div>
              </li>
            );
          })
        );

      default:
        break;
    }
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
              <a href="" previewlistener="true">
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
                  Backdrops
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
                      className={cx("menu_link", typeVideo === "posters" ? "selected" : "")}
                      onClick={() => {
                        changeType.posters("posters");
                      }}
                    >
                      <a href="#" previewlistener="true">
                        Posters
                      </a>
                      <span>{dataMovie && dataMovie.images && dataMovie.images.posters.length}</span>
                    </li>
                    <li
                      className={cx("menu_link", typeVideo === "logos" ? "selected" : "")}
                      onClick={() => {
                        changeType.logos("logos");
                      }}
                    >
                      <a href="#" previewlistener="true">
                        Logos
                      </a>
                      <span>{dataMovie && dataMovie.images && dataMovie.images.logos.length}</span>
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
                <section className={cx("panel_backdrops")}>
                  <div className={cx("results")} data-role="tooltip">
                    <ul className={cx("images", "backdrops", "compact")}>
                      {render()}
                      <li class="compact filler"></li>
                      <li class="compact filler"></li>
                      <li class="compact filler"></li>
                    </ul>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PostersList;

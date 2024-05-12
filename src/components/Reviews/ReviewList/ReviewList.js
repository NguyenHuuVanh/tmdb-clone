import classNames from "classnames/bind";
import React, {useEffect, useState} from "react";
import {NavLink, useNavigate, useParams} from "react-router-dom";
import ShortCutBar from "~/layout/Components/ShortCutBar/ShortCutBar";
import styles from "./ReviewList.module.scss";
import Reviews from "../Reviews";
import http from "~/services/axios/axios";
import ApiLinks from "~/services/api/Apis";

const cx = classNames.bind(styles);

const ReviewList = () => {
  const [dataReviewPost, setDataReviewPost] = useState([]);
  const [dataMovie, setDataMovie] = useState([]);
  const navigate = useNavigate();
  console.log("🚀 ~ ReviewList ~ dataMovie:", dataMovie);

  console.log("🚀 ~ ReviewList ~ dataReviewPost:", dataReviewPost);

  const {type, name} = useParams();
  const id = name.split("-")[0];
  console.log("🚀 ~ ReviewList ~ useParams:", id);

  const dataMovieInfomation = () => {
    http
      .get(ApiLinks.apiMovieInfomation(id, type))
      .then((response) => {
        setDataMovie(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const ReviewPost = () => {
    http
      .get(ApiLinks.apiPostReview(id, type))
      .then((res) => {
        setDataReviewPost(res.data.results);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    ReviewPost();
    dataMovieInfomation();
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
                    <NavLink to="/movie/848538-argylle?language=en" previewlistener="true">
                      {dataMovie.original_title}
                    </NavLink>
                    <span className={cx("tag", "release_date")}>
                      {" "}
                      ({dataMovie && dataMovie.release_date && dataMovie.release_date.split("-")[0]})
                    </span>
                  </h2>
                </div>

                <h3>
                  <a class="keyboard_s parent" onClick={() => navigate(-1)} previewlistener="true">
                    ← Back to main
                  </a>
                </h3>
              </span>
            </span>
          </div>
        </div>
      </header>
      <main className={cx("main")}>
        <div className={cx("content")}>
          <div className={cx("content_wrapper")}>
            <div class={cx("write_btn")}>
              <section className={cx("writeBtn_content")}>
                <p className={cx("button", "rounded", " new_button", "no_pad")}>
                  <a
                    class=""
                    href="/review/new?media_type=movie&amp;media_id=60e5ccccd7cd06002ddddc26&amp;language=en"
                    previewlistener="true"
                  >
                    <span className={cx("glyphicons_v2", "pencil", "svg", "invert")}></span> Write Review
                  </a>
                </p>
              </section>
            </div>
            <div>
              <div className={cx("white_column")}>
                <section className={cx("panel", "review")}>
                  <div className={cx("review_container")}>
                    {dataReviewPost &&
                      dataReviewPost.map((post, id) => {
                        return (
                          <div key={id} className={cx("content")}>
                            <Reviews dataReview={post} id={id} resultType={type} isFullPostReview={false} />;
                          </div>
                        );
                      })}
                  </div>
                  <div class="pagination_wrapper"></div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ReviewList;

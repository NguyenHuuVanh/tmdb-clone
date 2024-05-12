import React, {useEffect, useState} from "react";
import classNames from "classnames/bind";
import styles from "./ReviewPost.module.scss";
import http from "~/services/axios/axios";
import ApiLinks from "~/services/api/Apis";
import {useParams} from "react-router-dom";

const cx = classNames.bind(styles);

const ReviewPost = () => {
  const {id, type} = useParams();
  const [dataReviewPost, setDataReviewPost] = useState([]);
  console.log("🚀 ~ ReviewPost ~ dataReviewPost:", dataReviewPost);
  const [avatarMovie, setAvatarMovie] = useState([]);
  console.log(useParams());

  const ReviewPost = () => {
    http
      .get(ApiLinks.apiPostReview(id, type))
      .then((res) => {
        setDataReviewPost(res.data.results);
      })
      .catch((error) => console.log(error));
  };

  const AvatarMovie = () => {
    http
      .get(ApiLinks.apiMovieInfomation(id, type))
      .then((response) => {
        setAvatarMovie(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getYear = () => {
    return avatarMovie && avatarMovie.release_date && avatarMovie.release_date.split("-")[0];
  };

  const getData = () => {
    return dataReviewPost.slice(0, 1).map((review) => {
      return review.created_at;
    });
  };

  const getTime = () => {
    let dateString = getData();
    let date = new Date(dateString);
    let monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    let day = date.getDate();
    let monthIndex = date.getMonth();
    let year = date.getFullYear();

    let formattedDateString = `${monthNames[monthIndex]} ${day}, ${year}`;
    return formattedDateString;
  };

  useEffect(() => {
    ReviewPost();
    AvatarMovie();
  }, []);

  return (
    <div className={cx("container")}>
      <div className={cx("pad_content")}>
        <a href="/movie/848538/reviews?language=en" previewlistener="true">
          <img
            loading="lazy"
            class="poster"
            src={`https://media.themoviedb.org/t/p/w220_and_h330_face/${avatarMovie.poster_path}`}
            srcSet={`https://media.themoviedb.org/t/p/w220_and_h330_face/${avatarMovie.poster_path} 1x https://media.themoviedb.org/t/p/w220_and_h330_face/${avatarMovie.poster_path} 2x`}
            alt={avatarMovie.original_title}
          />
        </a>
      </div>
      <div className={cx("main_content")}>
        <h2>
          <a href="/review/65bef6da902012017ccc2cfd?language=en" title="Argylle" previewlistener="true">
            {`${avatarMovie.original_title} (${getYear()})`}
          </a>
        </h2>
        <h3 class="sub-heading">
          Written by{" "}
          <a href="/u/Brent_Marchant?language=en" previewlistener="true">
            {dataReviewPost &&
              dataReviewPost.slice(0, 1).map((review) => {
                return review.author;
              })}
          </a>{" "}
          {` on ${getTime()}`}
        </h3>
        <p>
          {dataReviewPost &&
            dataReviewPost.slice(0, 1).map((review) => {
              return review.content;
            })}
        </p>
      </div>
    </div>
  );
};

export default ReviewPost;

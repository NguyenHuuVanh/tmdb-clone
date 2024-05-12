import React, {useState} from "react";
import classNames from "classnames/bind";
import styles from "./Reviews.module.scss";
import {NavLink, useLocation, useParams} from "react-router-dom";

const cx = classNames.bind(styles);

const Reviews = ({dataReview, id, resultType, isFullPostReview = true}) => {
  // Xây dựng đường dẫn cho trang reviews
  const reviewsPath = `/${resultType}/${id}/reviews`;

  const getTime = () => {
    let dateString = dataReview.created_at;
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

  const splitString = () => {
    const originalString = dataReview.content;

    let parts = originalString.split("\r\n\r\n");
    return parts;
  };
  return (
    <div className={cx("review", "one")}>
      <div className={cx("content", "one")}>
        <div className={cx("inner_content")}>
          <div className={cx("card")}>
            <div className={cx("grouped")}>
              <div className={cx("avatar")}>
                <a href="/u/msbreviews?language=en" previewlistener="true">
                  {dataReview.author_details.avatar_path ? (
                    <img
                      loading="lazy"
                      className={cx("avatar")}
                      src={`https://secure.gravatar.com/avatar${dataReview.author_details.avatar_path}`}
                      srcSet={`https://secure.gravatar.com/avatar${dataReview.author_details.avatar_path} 1x https://secure.gravatar.com/avatar${dataReview.author_details.avatar_path} 2x`}
                      alt={dataReview.author_details}
                    />
                  ) : (
                    <span className={cx("round", " initials", " background_color", " silver")}>
                      {dataReview.author[0]}
                    </span>
                  )}
                </a>
              </div>
              <div className={cx("info")}>
                <h3 className={cx("info_name")}>
                  <a href="/review/65e8dac3713ea6017c53076e?language=en" previewlistener="true">
                    {`A review by ${dataReview.author}`}
                  </a>
                </h3>
                <div className={cx("flex")}>
                  <div className={cx("rounded", "rating")}>
                    <span className={cx("glyphicons_v2", "star_review", "invert", "svg")}></span>8.0
                  </div>
                  <h5>
                    Written by{" "}
                    <a href="/u/msbreviews?language=en" previewlistener="true">
                      {dataReview.author}
                    </a>{" "}
                    {getTime()}
                  </h5>
                </div>
              </div>
            </div>

            <div className={cx("teaser")}>
              <p>{splitString()[0]}</p>
              <p>{splitString()[1]}</p>
              <p>
                {splitString()[2]}
                <NavLink
                  className={cx("underline")}
                  to={`/fullreview/${resultType}/${id}/${dataReview.id}?language=en`}
                  previewlistener="true"
                >
                  ...read the rest.
                </NavLink>
              </p>
            </div>
          </div>

          {isFullPostReview ? (
            <p className={cx("new_button")}>
              <NavLink to={reviewsPath} previewlistener="true">
                Read All Reviews
              </NavLink>
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Reviews;

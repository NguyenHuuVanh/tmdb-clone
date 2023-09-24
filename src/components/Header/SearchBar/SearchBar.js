import React, {useEffect, useRef, useState} from "react";
import useComponentVisible from "../../Hooks/useComponentVisible";
import classNames from "classnames/bind";
import styles from "./SearchBar.module.scss";
import ApiLinks from "../../api/Apis";
import {useNavigate} from "react-router-dom";

const cx = classNames.bind(styles);

const SearchBar = () => {
  const {ref, isComponentVisible, setIsComponentVisible} = useComponentVisible(true);
  const [isVisibleLoading, setIsVisibleLoading] = useState(true);
  const [dataMovieTrendingToday, setDataMovieTrendingToday] = useState([]);
  const [dataMovieSearch, setDataMovieSearch] = useState([]);
  const [search, setSearch] = useState();
  const inputRef = useRef();
  const navigate = useNavigate();

  const handleInput = (e) => {
    const value = e.target.value.trim(); // Xóa khoảng trắng từ đầu và cuối chuỗi
    if (value.length === 0) {
      e.target.value = ""; // Xóa nội dung nếu chỉ còn khoảng trắng
    }
    setSearch(e.target.value);
  };

  const multiSearch = async () => {
    const responsive = await fetch(ApiLinks.apiSearch(search));
    const data = responsive.json();
    return data;
  };

  const movieTredingToday = async () => {
    const responsive = await fetch(ApiLinks.apiTrendingToday);
    const data = responsive.json();
    return data;
  };

  const handleClick = () => {
    inputRef.current.focus();
    setSearch("");
    setIsComponentVisible(true);
    setIsVisibleLoading(true);
    setTimeout(() => {
      setIsVisibleLoading(false);
    }, 3000);
  };

  const handleNavigate = () => {
    navigate("search/movie/nameExample");
    setIsComponentVisible(false);
  };

  const handleScroll = () => {
    setIsComponentVisible(false);
  };

  window.addEventListener("scroll", handleScroll, true);

  useEffect(() => {
    inputRef.current.focus();
    setTimeout(() => {
      setIsVisibleLoading(false);
    }, 3000);

    movieTredingToday()
      .then((movie) => {
        setDataMovieTrendingToday(movie.results);
      })
      .catch((error) => {
        console.log(error.message);
      });

    multiSearch()
      .then((movie) => {
        setDataMovieSearch(movie.results);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [search]);

  return (
    <>
      <div className={cx("container")}>
        <section className={cx("search")}>
          <div className={cx("sub_media")}>
            <form className={cx("search_form")}>
              <label htmlFor="">
                <span className={cx("search_input")}>
                  <input
                    onChange={handleInput}
                    onClick={() => setIsComponentVisible(true)}
                    value={search}
                    ref={inputRef}
                    className={cx("input")}
                    type="text"
                    placeholder="Search for a movie, tv show, person..."
                  />
                  {isVisibleLoading ? (
                    <span className={cx("loading")}></span>
                  ) : (
                    <span className={cx("close_icon")} onClick={handleClick}></span>
                  )}
                </span>
              </label>
            </form>
          </div>
        </section>
      </div>
      <div className={cx("search_trending")} ref={ref}>
        {isComponentVisible && (
          <div className={cx("search_trending_container")}>
            <div className={cx("search_trending_template")}>
              <div className={cx("wrapper")}>
                {dataMovieSearch.length > 0 && (
                  <h2>
                    <span className={cx("glyphicons_v2", "trending")}></span> Trending
                  </h2>
                )}
              </div>
            </div>
            <div className={cx("search_trending_list")}>
              <ul className={cx("list_items")}>
                {dataMovieSearch.length > 0 ? (
                  dataMovieSearch.map((movieName) => {
                    return (
                      <li className={cx("item")} key={movieName.id} onClick={handleNavigate}>
                        <div className={cx("search_trending_results")}>
                          <div className={cx("wrapper")}>
                            <div className={cx("glyphicons_v2", "search")}></div>
                            <p>
                              <span data-media-type="/movie" data-search-name={movieName.original_title}>
                                {movieName.original_title ??
                                  movieName.title ??
                                  movieName.name ??
                                  movieName.original_name}
                              </span>
                            </p>
                          </div>
                        </div>
                      </li>
                    );
                  })
                ) : (
                  <div className={cx("no_data")}>
                    <div>
                      <div className={cx("no_result")}>
                        <div className={cx("wrapper")}>
                          <h2>No Results</h2>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </ul>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SearchBar;

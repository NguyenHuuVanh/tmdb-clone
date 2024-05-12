import React, {useEffect, useRef, useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import useComponentVisible from "~/hooks/useComponentVisible";
import classNames from "classnames/bind";
import styles from "./SearchBar.module.scss";
import ApiLinks from "~/services/api/Apis";
import http from "~/services/axios/axios";

const cx = classNames.bind(styles);

const SearchBar = () => {
  const {ref, isComponentVisible, setIsComponentVisible} = useComponentVisible(true);
  const [isVisibleLoading, setIsVisibleLoading] = useState(true);
  const [dataMovieSearch, setDataMovieSearch] = useState([]);
  const [search, setSearch] = useState();
  const inputRef = useRef();
  const navigate = useNavigate();
  const [searhcParmas, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searhcParmas.get("query"));

  const handleInput = (e) => {
    const value = e.target.value.trim(); // Xóa khoảng trắng từ đầu và cuối chuỗi
    if (value.length === 0) {
      e.target.value = ""; // Xóa nội dung nếu chỉ còn khoảng trắng
    }
    setSearch(e.target.value);
  };

  const multiSearch = () => {
    http
      .get(ApiLinks.apiSearch(search))
      .then((res) => setDataMovieSearch(res.data.results))
      .catch((error) => console.log(error));
  };

  const DefaultData = () => {
    http
      .get(ApiLinks.apiTrendingToday)
      .then((res) => setDataMovieSearch(res.data.results))
      .catch((error) => console.log(error));
  };

  const changeApi = () => {
    let data = [];
    if (search === "" || search === null || search === undefined) {
      data = DefaultData();
    } else {
      data = multiSearch();
    }
    return data;
  };

  const handleClick = () => {
    inputRef.current.focus();
    setSearch("");
    setIsComponentVisible(false);
    setIsVisibleLoading(true);
    setTimeout(() => {
      setIsVisibleLoading(false);
      setIsComponentVisible(true);
    }, 3000);
  };

  const handleNavigate = (e) => {
    navigate(`search/movie?query=${search}`);
    setIsComponentVisible(false);
  };

  const handleSubmitData = (e) => {
    if (e.keyCode === 13) {
      navigate(`search&query=${search}`);
    }
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

    changeApi();
  }, [search]);

  return (
    <>
      <div className={cx("container")}>
        <section className={cx("search")}>
          <div className={cx("sub_media")}>
            <form className={cx("search_form")}>
              <label htmlFor="search">
                <span className={cx("search_input")}>
                  <input
                    onChange={handleInput}
                    onClick={() => setIsComponentVisible(true)}
                    value={search}
                    ref={inputRef}
                    className={cx("input")}
                    onKeyDown={handleSubmitData}
                    type="text"
                    placeholder="Search for a movie, tv show, person..."
                    id="search"
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

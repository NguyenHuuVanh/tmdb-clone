import {useEffect} from "react";
import classNames from "classnames/bind";
import styles from "./DataSearch.module.scss";
import {useLocation, useParams} from "react-router-dom";

const cx = classNames.bind(styles);

const DataSearch = () => {
  const location = useLocation();

  useEffect(() => {
    document.documentElement.style.setProperty("--maxPrimaryPageWidth", "1400px");
  }, []);
  return (
    <main className={cx("main")}>
      <div className={cx("inner_block", "pad_top")}>
        <div className={cx("inner_content", "search_result")}>
          <div className={cx("content")}>
            <div className={cx("wrapper")}>
              <div className={cx("wrapper_column")}>
                <div className={cx("settings_panel", "card", "no_margin")}>
                  <h3 className={cx("background_color", "light_blue")}>Search Results</h3>
                  <div>
                    <ul className={cx("panel", "svg_check", "no_scroll")}>
                      <li className={cx("selected")}>
                        <a className={cx("search_tab")} href="">
                          Movies
                        </a>
                        <span>2</span>
                      </li>
                      <li>
                        <a className={cx("search_tab")} href="">
                          TV Shows
                        </a>
                        <span>2</span>
                      </li>{" "}
                      <li>
                        <a className={cx("search_tab")} href="">
                          People
                        </a>
                        <span>2</span>
                      </li>
                      <li>
                        <a className={cx("search_tab")} href="">
                          Collections
                        </a>
                        <span>2</span>
                      </li>
                      <li>
                        <a className={cx("search_tab")} href="">
                          Companies
                        </a>
                        <span>2</span>
                      </li>
                      <li>
                        <a className={cx("search_tab")} href="">
                          Keywords
                        </a>
                        <span>2</span>
                      </li>
                      <li>
                        <a className={cx("search_tab")} href="">
                          Networks
                        </a>
                        <span>2</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <p className={cx("search_tip")}>
                  <span className={cx("glyphicons_v2", "circle-info")}></span> Tip: You can use the 'y:' filter to
                  narrow your results by year. Example: 'star wars y:1977'.
                </p>
              </div>
              <div className={cx("search_content")}>
                <section className={cx("data_search")}>
                  <div className={cx("search_results", "movie")}>
                    <div className={cx("results", "flex")}>
                      <div className={cx("card", "v4", "tight")}>
                        <div className={cx("wrapper")}>
                          <div className={cx("image")}>
                            <div className={cx("poster")}>
                              <a className={cx("result")} href="">
                                <img
                                  className={cx("poster")}
                                  src="https://www.themoviedb.org/t/p/w94_and_h141_bestv2/ehGIDAMaYy6Eg0o8ga0oqflDjqW.jpg"
                                  alt=""
                                />
                              </a>
                            </div>
                          </div>
                          <div className={cx("details")}>
                            <div className={cx("wrapper")}>
                              <div className={cx("title")}>
                                <div>
                                  <a className={cx("result")} href="">
                                    <h2>No One Will Save You</h2>
                                  </a>
                                </div>
                                <span className={cx("release_date")}>September 22, 2023</span>
                              </div>
                            </div>
                            <div className={cx("overview")}>
                              <p>
                                An exiled anxiety-ridden homebody must battle an alien who's found its way into her
                                home.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={cx("card", "v4", "tight")}>
                        <div className={cx("wrapper")}>
                          <div className={cx("image")}>
                            <div className={cx("poster")}>
                              <a className={cx("result")} href="">
                                <img
                                  className={cx("poster")}
                                  src="https://www.themoviedb.org/t/p/w94_and_h141_bestv2/ehGIDAMaYy6Eg0o8ga0oqflDjqW.jpg"
                                  alt=""
                                />
                              </a>
                            </div>
                          </div>
                          <div className={cx("details")}>
                            <div className={cx("wrapper")}>
                              <div className={cx("title")}>
                                <div>
                                  <a className={cx("result")} href="">
                                    <h2>No One Will Save You</h2>
                                  </a>
                                </div>
                                <span className={cx("release_date")}>September 22, 2023</span>
                              </div>
                            </div>
                            <div className={cx("overview")}>
                              <p>
                                An exiled anxiety-ridden homebody must battle an alien who's found its way into her
                                home.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={cx("card", "v4", "tight")}>
                        <div className={cx("wrapper")}>
                          <div className={cx("image")}>
                            <div className={cx("poster")}>
                              <a className={cx("result")} href="">
                                <img
                                  className={cx("poster")}
                                  src="https://www.themoviedb.org/t/p/w94_and_h141_bestv2/ehGIDAMaYy6Eg0o8ga0oqflDjqW.jpg"
                                  alt=""
                                />
                              </a>
                            </div>
                          </div>
                          <div className={cx("details")}>
                            <div className={cx("wrapper")}>
                              <div className={cx("title")}>
                                <div>
                                  <a className={cx("result")} href="">
                                    <h2>No One Will Save You</h2>
                                  </a>
                                </div>
                                <span className={cx("release_date")}>September 22, 2023</span>
                              </div>
                            </div>
                            <div className={cx("overview")}>
                              <p>
                                An exiled anxiety-ridden homebody must battle an alien who's found its way into her
                                home.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={cx("card", "v4", "tight")}>
                        <div className={cx("wrapper")}>
                          <div className={cx("image")}>
                            <div className={cx("poster")}>
                              <a className={cx("result")} href="">
                                <img
                                  className={cx("poster")}
                                  src="https://www.themoviedb.org/t/p/w94_and_h141_bestv2/ehGIDAMaYy6Eg0o8ga0oqflDjqW.jpg"
                                  alt=""
                                />
                              </a>
                            </div>
                          </div>
                          <div className={cx("details")}>
                            <div className={cx("wrapper")}>
                              <div className={cx("title")}>
                                <div>
                                  <a className={cx("result")} href="">
                                    <h2>No One Will Save You</h2>
                                  </a>
                                </div>
                                <span className={cx("release_date")}>September 22, 2023</span>
                              </div>
                            </div>
                            <div className={cx("overview")}>
                              <p>
                                An exiled anxiety-ridden homebody must battle an alien who's found its way into her
                                home.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={cx("card", "v4", "tight")}>
                        <div className={cx("wrapper")}>
                          <div className={cx("image")}>
                            <div className={cx("poster")}>
                              <a className={cx("result")} href="">
                                <img
                                  className={cx("poster")}
                                  src="https://www.themoviedb.org/t/p/w94_and_h141_bestv2/ehGIDAMaYy6Eg0o8ga0oqflDjqW.jpg"
                                  alt=""
                                />
                              </a>
                            </div>
                          </div>
                          <div className={cx("details")}>
                            <div className={cx("wrapper")}>
                              <div className={cx("title")}>
                                <div>
                                  <a className={cx("result")} href="">
                                    <h2>No One Will Save You</h2>
                                  </a>
                                </div>
                                <span className={cx("release_date")}>September 22, 2023</span>
                              </div>
                            </div>
                            <div className={cx("overview")}>
                              <p>
                                An exiled anxiety-ridden homebody must battle an alien who's found its way into her
                                home.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={cx("panigation_wrapper")}></div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DataSearch;

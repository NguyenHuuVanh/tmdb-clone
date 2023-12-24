import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./Main.module.scss";
import bgIntroLists from "~/assets/images/bg-intro";

const cx = classNames.bind(styles);

const Main = () => {
  const [backgroundImage, setBackgroundImage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const randomImages = () => {
    const randomIndex = Math.floor(Math.random() * bgIntroLists.length);
    const randomImage = bgIntroLists[randomIndex];
    return randomImage;
  };

  const navigator = () => {
    navigate(`/search&query=${searchQuery}`);
  };

  const searchValue = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const newBackgroundImage = `url(${randomImages()})`;
    setBackgroundImage(newBackgroundImage);
  }, []);

  return (
    <div className={cx("container")}>
      <section
        className={cx("inner_content")}
        style={{
          backgroundImage: backgroundImage,
        }}
      >
        <div className={cx("content_wrapper")}>
          <div className={cx("content")}>
            <div className={cx("title")}>
              <h2>Welcome.</h2>
              <h3>Millions of movies, TV shows and people to discover. Explore now.</h3>
            </div>
            <div className={cx("search")}>
              <form className={cx("inner_search")}>
                <label htmlFor="">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={searchValue}
                    className={cx("inner_input")}
                    placeholder="Search for a movie, tv show, person......"
                  />
                </label>
                <input
                  className={cx("search_btn")}
                  type="submit"
                  value="Search"
                  onClick={navigator}
                  onChange={() => alert("to do something!")}
                />
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Main;

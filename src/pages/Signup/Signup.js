import {useEffect, useState} from "react";
import classNames from "classnames/bind";
import styles from "./Signup.module.scss";
import {useLocation, useNavigate} from "react-router-dom";

const cx = classNames.bind(styles);

const Signup = () => {
  const [inputValue, setInputValue] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/signup") {
      document.documentElement.style.setProperty("--maxPrimaryPageWidth", "1400px");
    } else {
      document.documentElement.style.setProperty("--maxPrimaryPageWidth", "1300px");
    }
    navigate("?language=en");
  }, [location.pathname]);

  const handleInputValue = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <main className={cx("main")}>
      <div className={cx("inner_block", "pad_top")}>
        <div className={cx("inner_content")}>
          <div className={cx("content")}>
            <div className={cx("wrapper")}>
              <div className={cx("settings_panel", "card", "no_margin")}>
                <h3 className={cx("background_color", "light_blue")}>Benefits of being a member</h3>
                <div>
                  <ul className={cx("panel", "svg_check", "no_scroll")}>
                    <li>
                      <span className={cx("glyphicons_v2", "check")}></span> Find something to watch on your subscribed
                      streaming services
                    </li>
                    <li>
                      <span className={cx("glyphicons_v2", "check")}></span> Log the movies and TV shows you have
                      watched
                    </li>
                    <li>
                      <span className={cx("glyphicons_v2", "check")}></span> Keep track of your favourite movies and TV
                      shows and get recommendations from them
                    </li>
                    <li>
                      <span className={cx("glyphicons_v2", "check")}></span> Build and maintain a personal watchlist
                    </li>
                    <li>
                      <span className={cx("glyphicons_v2", "check")}></span> Build custom mixed lists (movies and TV)
                    </li>
                    <li>
                      <span className={cx("glyphicons_v2", "check")}></span> Take part in movie and TV discussions
                    </li>
                    <li>
                      <span className={cx("glyphicons_v2", "check")}></span> Contribute to, and improve the information
                      in our database
                    </li>
                  </ul>
                </div>
              </div>
              <section className={cx("content")}>
                <div className={cx("column_content")}>
                  <h2>Sign up for an account</h2>
                  <p>
                    Signing up for an account is free and easy. Fill out the form below to get started. JavaScript is
                    required to to continue.
                  </p>
                  <form
                    className={cx("k-form")}
                    action="/signup"
                    name="account_signup"
                    method="post"
                    acceptCharset="utf-8"
                  >
                    <input type="hidden" name="language" />
                    {/* value="en" */}
                    <fieldset>
                      <label className={cx("k-form-field")} htmlFor="username">
                        <span>Username</span>
                        <input
                          id="username"
                          className={cx("k-textbox")}
                          type="text"
                          name="username"
                          autoCapitalize="off"
                          data-gtm-form-interact-field-id="0"
                        />
                        {/* defaultValue="Initial value" */}
                      </label>
                      <label className={cx("k-form-field")} htmlFor="password">
                        <span>Password (4 characters minimum)</span>
                        <input
                          id="password"
                          className={cx("k-textbox")}
                          type="password"
                          name="password"
                          data-gtm-form-interact-field-id="1"
                        />
                        {/* defaultValue="Initial value" */}
                      </label>
                      <label className={cx("k-form-field")} htmlFor="password_confirm">
                        <span>Password Confirm</span>
                        <input className={cx("k-textbox")} type="password" name="password_confirm" />
                        {/* defaultValue="Initial value" */}
                      </label>
                      <label className={cx("k-form-field")} htmlFor="email">
                        <span>Email</span>
                        <input className={cx("k-textbox")} type="text" name="email" />
                        {/* defaultValue="Initial value" */}
                      </label>
                    </fieldset>
                    <p>
                      By clicking the "Sign up" button below, I certify that I have read and agree to the TMDB terms of
                      use and privacy policy.
                    </p>
                    <div className={cx("flex")}>
                      <input className={cx("k-button", " k-primary")} type="submit" />
                      {/* value="Signup" */}
                      <p className={cx("reset")}>
                        <a href="/reset-password?language=en">Cancel</a>
                      </p>
                    </div>
                  </form>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
export default Signup;

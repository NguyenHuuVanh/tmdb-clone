import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./Login.module.scss";

const cx = classNames.bind(styles);

const Login = () => {
  const [inputValue, setInputValue] = useState("");
  const location = useLocation();
  console.log("🚀 ~ file: Login.js:9 ~ Login ~ location:", location);

  useEffect(() => {
    if (location.pathname === "/login") {
      document.documentElement.style.setProperty("--maxPrimaryPageWidth", "1400px");
    } else {
      document.documentElement.style.setProperty("--maxPrimaryPageWidth", "1300px");
    }
  }, [location.pathname]);

  const handleInputValue = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <main className={cx("main")}>
      <section className={cx("main_content", "content")}>
        <div className={cx("wrapper")}>
          <div className={cx("content")}>
            <div className={cx("wrapper", "wrapper_login")}>
              <h2>Login to your account</h2>
              <p>
                In order to use the editing and rating capabilities of TMDB, as well as get personal recommendations you
                will need to login to your account. If you do not have an account, registering for an account is free
                and simple. <a href="/signup?language=en">Click here</a> to get started.
              </p>
              <p>
                If you signed up but didn't get your verification email,{" "}
                <a href="/resend-email-verification?language=en">click here</a> to have it resent.
              </p>
              <form
                className={cx("k-form")}
                action="/login?language=en"
                name="account_login"
                method="post"
                acceptCharset="utf-8"
                data-gtm-form-interact-id="0"
              >
                <input type="hidden" name="language" defaultValue="Initial value" />

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
                      defaultValue="Initial value"
                    />
                  </label>

                  <label className={cx("k-form-field")} htmlFor="password">
                    <span>Password</span>
                    <input
                      defaultValue="Initial value"
                      id="password"
                      className={cx("k-textbox")}
                      type="password"
                      name="password"
                      data-gtm-form-interact-field-id="1"
                    />
                  </label>
                </fieldset>
                <div className={cx("flex")}>
                  <input className={cx("k-button", " k-primary")} type="submit" value="Login" />
                  <p className={cx("reset")}>
                    <a href="/reset-password?language=en">Reset password</a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Login;

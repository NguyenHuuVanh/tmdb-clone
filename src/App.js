import "./App.css";
import {Routes, Route} from "react-router-dom";
import "./components/GlobalStyle/GlobalStyle.scss";

import Community from "./components/Community/Community";
import Footer from "./components/Footer/Footer";
import DefaultHeader from "./components/Header/DefaultHeader/DefaultHeader";
import Header from "./components/Header/Header";
import Introtraler from "./components/IntroTraler/Introtraler";
import LeaderBoard from "./components/LeaderBoard/LeaderBoard";
import Main from "./components/Main/Main";
import Popular from "./components/Popular/Popular";
import Trending from "./components/Trending/Trending";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";

function App() {
  return (
    <div className="App">
      <DefaultHeader />
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Main />
              <Trending />
              <Introtraler />
              <Popular />
              <Community />
              <LeaderBoard />
            </>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="search/movie/nameExample" element={<Signup />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

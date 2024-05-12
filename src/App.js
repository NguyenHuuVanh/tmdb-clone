import {Routes, Route} from "react-router-dom";
import "./App.css";
import "./components/GlobalStyle/GlobalStyle.scss";

import Community from "~/components/Community/Community";
import Footer from "./layout/Components/Footer/Footer";
import DefaultHeader from "./layout/Components/Header/DefaultHeader/DefaultHeader";
import Header from "./layout/Components/Header/Header";
import Introtraler from "./components/IntroTraler/Introtraler";
import LeaderBoard from "./components/LeaderBoard/LeaderBoard";
import Main from "./components/Main/Main";
import Popular from "./components/Popular/Popular";
import Trending from "./components/Trending/Trending";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import DataSearch from "./pages/DataSearch/DataSearch";
import BackDrop from "./components/BackDrop/BackDrop";
import ScrollTopBtn from "./layout/Components/ScrollTopBtn/ScrollTopBtn";
import ScrollToTop from "./layout/Components/ScrollToTop/ScrollToTop";
import ReviewPost from "./components/Reviews/ReviewPost/ReviewPost";
import ShortCutBar from "./layout/Components/ShortCutBar/ShortCutBar";
import ReviewList from "./components/Reviews/ReviewList/ReviewList";
import VideoList from "./components/BackDrop/VideoList/VideoList";
import ImageList from "./components/BackDrop/ImageList/ImageList";
import PostersList from "./components/BackDrop/PostersList/PostersList";

function App() {
  return (
    <div className="App">
      <ScrollToTop />
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
              <ScrollTopBtn />
            </>
          }
        />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/signup"} element={<Signup />} />
        <Route path={"search/:type/?query=:name"} element={<DataSearch />} />
        <Route path={``} element={<DataSearch />} />
        <Route path={":type/:movieId"} element={<BackDrop />} />
        <Route path={"/cast?language=en"} element={<Login />} />
        <Route path={"/fullreview/:type/:id/:idPost"} element={<ReviewPost />} />
        <Route
          path={"/:type/:name/reviews"}
          element={
            <>
              <ReviewList />
            </>
          }
        />
        <Route path={"/:type/:id/videos"} element={<VideoList />} />
        <Route path={"/:type/:id/backdrops"} element={<ImageList />} />
        <Route path={"/:type/:id/posters"} element={<PostersList />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

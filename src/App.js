import {Routes, Route, useParams, useLocation} from "react-router-dom";
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
        <Route path="search/movie/nameExample" element={<DataSearch />} />
        <Route path={``} element={<DataSearch />} />
        <Route path={"movie/:movieId"} element={<BackDrop />} />
        <Route path={"tv/:movieId"} element={<BackDrop />} />
        <Route path={"/cast?language=en"} element={<Login />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

import Signin from "./components/Signin";
import Account from "./components/Account";
import Signup from "./components/Signup";
import { Route, Routes } from "react-router-dom";
import { Context } from "./components/Context";
import ProtectedRoute from "./components/ProtectedRoute";
import Discover from "./components/Discover";
import AroundYou from "./components/AroundYou";
import TopArtists from "./components/TopArtists";
import TopCharts from "./components/TopCharts";
import ErrorPage from "./components/ErrorPage";
import LikedTracks from "./components/LikedTracks";
import SavedTracks from "./components/SavedTracks";
import ArtistDetails from "./components/ArtistDetails";
import SongDetails from "./components/SongDetails";
import Search from "./components/Search";

const App = () => {
  return (
    <div className="bg-[#2c2f33]">
      <Context>
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          >
            <Route path="/account/discover" element={<Discover />} />
            <Route path="/account/around-you" element={<AroundYou />} />
            <Route path="/account/top-artists" element={<TopArtists />} />
            <Route path="/account/top-charts" element={<TopCharts />} />
            <Route
              path="/account/artist-details/:id"
              element={<ArtistDetails />}
            />
            <Route path="/account/song-details/:id" element={<SongDetails />} />
            <Route path="/account/search/:searchTerm" element={<Search />} />
            <Route path="/account/liked-tracks" element={<LikedTracks />} />
            <Route path="/account/saved-tracks" element={<SavedTracks />} />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Context>
    </div>
  );
};

export default App;

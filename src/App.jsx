import {
	BrowserRouter as Router,
	Routes,
	Route
} from "react-router-dom";
import VideosPage from "./pages/VideosPage";
import Home from "./pages/Home";
import Video from "./pages/Video";

const App = () => {
  

  return (
    <Router>
		<Routes>
      <Route path="/" element={<Home />} />
      <Route path="/videos" element={<VideosPage />} />
      <Route path="/video/:id" element={<Video />} />
    </Routes>
    </Router>
  );
};

export default App;

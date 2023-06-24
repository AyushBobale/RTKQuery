import "./App.css";

import {
  Outlet,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";

import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import UserLayout from "./pages/UserLayout/UserLayout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path={"/"} element={<UserLayout />}>
          <Route path={"/"} element={<Home />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

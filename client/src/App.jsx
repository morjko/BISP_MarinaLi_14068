import { BrowserRouter, Routes, Route } from "react-router-dom" ;
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import CreateAdvert from "./pages/CreateAdvert.jsx";
import EditAdvert from "./pages/EditAdvert.jsx";
import Advert from "./pages/Advert.jsx";
import Search from "./pages/Search.jsx";

export default function App() {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-advert" element={<CreateAdvert />} />
          <Route path="/edit-advert/:advertId" element={<EditAdvert />} />
        </Route>
        <Route path="/advert/:advertId" element={<Advert />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  )
}

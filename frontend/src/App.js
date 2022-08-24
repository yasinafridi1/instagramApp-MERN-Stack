import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import Signin from "./pages/signin/Signin";
import ProtectedRoutes from "./protectedRoutes";

function App() {
  return (
    <div>
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route index path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="register" element={<Register />} />
        <Route path="signin" element={<Signin />} />
      </Routes>
    </div>
  );
}

export default App;

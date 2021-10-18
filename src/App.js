import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Error404 } from "./components/Error404";
import Home from "./components/Home";
import { OngoingVotes } from "./components/OngoingVotes";
import { About } from "./components/About";
import { LoginForm } from "./components/LoginForm";
import { SignupForm } from "./components/SignupForm";
import { Profile } from "./components/Profile";
import { Poll } from "./components/Poll";
import { CreatePoll } from "./components/CreatePoll";
import { Rules } from "./components/Rules";
import { Vote } from "./components/Vote";
import axios from "axios";

function App() {
  const [user, setUser] = useState({
    _id: "",
    name: "",
    surname: "",
    email: "",
    phone: "",
    is_admin: false,
  });
  const navigate = useNavigate();
  const Login = (details) => {
    setUser({
      _id: details._id,
      name: details.name,
      surname: details.surname,
      email: details.email,
      phone: details.phone,
      is_admin: details.is_admin,
    });
    navigate("/profile");
  };
  const Logout = async () => {
    setUser({
      _id: "",
      name: "",
      surname: "",
      email: "",
      phone: "",
      is_admin: false,
    });
    const res = await axios.get("http://localhost:3000/logout");
    navigate("/");
  };
  return (
    <div className="bg">
      <Routes>
        <Route path="/" element={<Home user={user} Logout={Logout} />} />
        <Route
          path="/ongoingvotes"
          element={<OngoingVotes user={user} Logout={Logout} />}
        />
        <Route path="/about" element={<About user={user} Logout={Logout} />} />
        <Route
          path="/login"
          element={<LoginForm user={user} Login={Login} Logout={Logout} />}
        />
        <Route
          path="/signup"
          element={<SignupForm user={user} Logout={Logout} />}
        />
        <Route
          path="/profile"
          element={<Profile user={user} Logout={Logout} />}
        />
        <Route
          path="/create_poll"
          element={<CreatePoll user={user} Logout={Logout} />}
        />
        <Route
          path="/poll/:name/rules"
          element={<Rules user={user} Logout={Logout} />}
        />
        <Route
          path="/poll/:name/vote"
          element={<Vote user={user} Logout={Logout} />}
        />
        <Route
          path="/poll/:name"
          element={<Poll user={user} Logout={Logout} />}
        />

        <Route path="*" element={<Error404 user={user} Logout={Logout} />} />
      </Routes>
    </div>
  );
}

export default App;

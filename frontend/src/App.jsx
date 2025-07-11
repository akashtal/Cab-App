import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import UserLogin from "./pages/userlogin";
import UserSignup from "./pages/UserSignup";
import UserHome from "./pages/UserHome";
import CaptainLogin from "./pages/CaptainLogin";
import CaptainSignup from "./pages/CaptainSignup";
import CaptainHome from "./pages/CaptainHome";
import UseProtectWrapper from "./pages/UseProtectWrapper";
import CaptainProtectWrapper from "./pages/CaptainProtectWrapper";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/userlogin" element={<UserLogin />} />
        <Route path="/usersignup" element={<UserSignup />} />
        <Route
          path="/UserHome"
          element={
            <UseProtectWrapper>
              <UserHome />
            </UseProtectWrapper>
          }
        />
        <Route path="/captainlogin" element={<CaptainLogin />} />
        <Route path="/captainsignup" element={<CaptainSignup />} />
        <Route
          path="/captainHome"
          element={
            <CaptainProtectWrapper>
              <CaptainHome />
            </CaptainProtectWrapper>
          }
        />
      </Routes>
    </div>
  );
};

export default App;

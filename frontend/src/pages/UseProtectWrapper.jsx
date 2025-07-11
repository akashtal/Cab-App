import { useEffect, React, useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UseProtectWrapper = ({ children }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [ isLoading, setIsLoading ] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate("/userlogin");
    }
  }, [token, navigate]);

  
  axios.get(`${import.meta.env.VITE_API_URL}user/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      if (response.status === 200) {
        setUser(response.data.user);
        setIsLoading(false);
      }
    })
    .catch((err) => {
      console.log(err);
      localStorage.removeItem(`token`);
      navigate("/userlogin");
    });

  if (isLoading) {
    return <div>Loading....</div>;
  }

  return children;
};

export default UseProtectWrapper;

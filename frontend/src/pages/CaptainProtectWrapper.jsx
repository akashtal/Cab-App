import { useEffect, React, useState, useContext } from "react";
import { CaptainDataContext } from "../context/CaptainContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CaptainProtectWrapper = ({ children }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { captain, setCaptainData } = useContext(CaptainDataContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate("/captainlogin");
    }
  }, [token, navigate]);

    axios.get(`${import.meta.env.VITE_API_URL}captain/profile`, {
    headers: {
      Authorization: `Bearer ${token}`
    },

  }).then(response =>{
    if(response.status === 200){
      setCaptainData(response.data.captain)
      setIsLoading(false)
    }
  })
  .catch(err=>{
    console.log(err)
    localStorage.removeItem(`token`)
     navigate("/captainlogin");
  })

  if (isLoading) {
    return <div>Loading....</div>;
  }

  return children;
};

export default CaptainProtectWrapper;

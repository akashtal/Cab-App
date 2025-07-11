import { createContext, useState, useContext } from "react";

export const CaptainDataContext = createContext();

const CaptainContext = ({ children }) => {
    const [captainData, setCaptainData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const updateCaptainData = (data) => {
        setCaptainData(data);
    };

    const value = { captainData, setCaptainData, isLoading, setIsLoading, error, setError, updateCaptainData };

    return (
        <CaptainDataContext.Provider value={value}>
            {children}
        </CaptainDataContext.Provider>
    );
}

export default CaptainContext;
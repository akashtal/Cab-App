import React, { createContext, useState } from 'react';

export const UserContext = createContext(); // ✅ this line exports it

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    email: '',
    fullName: {
      firstName: '',
      lastName: ''
    },
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider; // ✅ default export of the provider

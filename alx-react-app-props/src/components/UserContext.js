import React from 'react';

// Create a Context for user data
const UserContext = createContext();

// Create a Provider component
export const UserProvider = ({ children, value }) => {
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;

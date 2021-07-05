import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

let validUser = null;

(async () => {
  let token = localStorage.getItem('token');
  if (token) {
    try {
      const res = await axios.post('/api/users/verify', { token });
      validUser = res.data.decoded.user;
    } catch (e) {
      console.log(e);
    }
  }
})();

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [user, setUser] = useState(validUser);

  useEffect(() => {
    setUser(validUser);
  }, []);

  return (
    <UserContext.Provider value={[user, setUser]}>
      {props.children}
    </UserContext.Provider>
  );
};

import React, {useState, useEffect} from "react";
import axios from "axios";
import {ARTICLES_GET_ALL_ARTICLES, AUTHENTICATE, GET_USER_INFO} from "../constants/links";
import {useNavigate} from "react-router-dom";

export const UserContext = React.createContext({
  user: {},
  loading: false,
  logout: () => {},
  hasUser: () => {}
});

export default function UserContextProvider(props) {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // requestInfo (status, detail, data)

  useEffect(() => {
    const localStorageUserInfo = sessionStorage.getItem('user');
    if (localStorageUserInfo) {
      setUser(JSON.parse(localStorageUserInfo));
    } else {
      logout();
    }
  }, [])

  const authenticate = (login, password) => {
    setLoading(true);
    axios
      .post(AUTHENTICATE(), {username: login, password})
      .then(response => {
        setLoading(false);
        const userObject = {
          accessToken: response.data.access_token
        }
        setUser(userObject);
        sessionStorage.removeItem('user');
        sessionStorage.setItem('user', JSON.stringify(userObject))
      })
      .catch(error => {
        setLoading(false);
        console.error(error);
      })
  }

  const logout = () => {
    sessionStorage.removeItem('user');
    setUser({});
    navigate("/login");
  }

  const hasUser = () => {
    return JSON.stringify(user) !== '{}'
  }

  const context = {
    user,
    loading,
    logout,
    authenticate,
    hasUser
  }

  return (
    <UserContext.Provider value={{...context}}>
      {props.children}
    </UserContext.Provider>
  )
}
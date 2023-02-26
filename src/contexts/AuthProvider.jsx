import { createContext, useReducer, useEffect } from 'react';
import { useSelector } from 'react-redux';
import apiService from '../app/apiService';

const initialState = {
   isInitialized: false,
   isAuthenticated: false,
   user: null,
};

const INITIALIZE = 'AUTH.INITIALIZE';
const LOGIN_SUCCESS = 'AUTH.LOGIN_SUCCESS';
const REGISTER_SUCCESS = 'AUTH.REGISTER_SUCCESS';
const LOGOUT = 'AUTH.LOGOUT';
const UPDATE_PROFILE = 'AUTH.UPDATE_PROFILE';
const reducer = (state, action) => {
   switch (action.type) {
      case INITIALIZE:
         const { isAuthenticated, user } = action.payload;
         return {
            ...state,
            isInitialized: true,
            isAuthenticated,
            user,
         };
      case LOGIN_SUCCESS:
         return {
            ...state,
            isAuthenticated: true,
            user: action.payload.user,
         };
      case LOGOUT:
         return { ...action.payload };
      case UPDATE_PROFILE:
         const {
            name,
            avatarUrl,
            coverUrl,
            aboutMe,
            city,
            country,
            company,
            jobTitle,
            facebookLink,
            instagramLink,
            linkedinLink,
            twitterLink,
            friendCount,
            postCount,
         } = action.payload;
         return {
            ...state,
            user: {
               ...state.user,
               name,
               avatarUrl,
               coverUrl,
               aboutMe,
               city,
               country,
               company,
               jobTitle,
               facebookLink,
               instagramLink,
               linkedinLink,
               twitterLink,
               friendCount,
               postCount,
            },
         };
      default:
         return state;
   }
};
const setToken = (accessToken) => {
   if (accessToken) {
      window.localStorage.setItem('accessToken', accessToken);
      apiService.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
   } else {
      window.localStorage.removeItem('accessToken');
      delete apiService.defaults.headers.common.Authorization;
   }
};

const AuthContext = createContext({ ...initialState });
function AuthProvider({ children }) {
   const [state, dispatch] = useReducer(reducer, initialState);
   const currentUser = useSelector((state) => state.user.currentUser);
   useEffect(() => {
      const initialize = async () => {
         try {
            const accessToken = window.localStorage.getItem('accessToken');
            if (accessToken) {
               setToken(accessToken);
               const response = await apiService.get('/users/me');
               const user = response.data;
               dispatch({
                  type: INITIALIZE,
                  payload: { isAuthenticated: true, user },
               });
            } else {
               setToken(null);
               dispatch({
                  type: INITIALIZE,
                  payload: { isAuthenticated: false, user: null },
               });
            }
         } catch (error) {
            setToken(null);
            dispatch({
               type: INITIALIZE,
               payload: { isAuthenticated: false, user: null },
            });
         }
      };
      initialize();
   }, []);

   useEffect(() => {
      // console.log(currentUser);
      // console.log(state.user);
      if (currentUser) {
         dispatch({ type: UPDATE_PROFILE, payload: currentUser });
      }
   }, [currentUser]);

   const login = async (email, pass, callback) => {
      const response = await apiService.post('/auth/login', {
         email: email,
         password: pass,
      });
      const { accessToken, user } = response.data;
      setToken(accessToken);
      dispatch({
         type: LOGIN_SUCCESS,
         payload: { user: user },
      });
      callback();
   };
   const logout = async (callback) => {
      setToken(null);
      dispatch({
         type: LOGOUT,
         payload: { ...initialState, isInitialized: true },
      });
      callback();
   };

   const signUp = async (name, email, pass) => {
      await apiService.post('/users', {
         name: name,
         email: email,
         password: pass,
      });
   };
   return (
      <AuthContext.Provider value={{ ...state, login, logout, signUp }}>
         {children}
      </AuthContext.Provider>
   );
}

export { AuthContext, AuthProvider };

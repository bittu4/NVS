import { login,logout } from './types'

export const onLogin = (userDetails, isLoggedIn,token) => (
    {
        type: login,
        userDetails: userDetails,
        isLoggedIn:isLoggedIn,
        token:token
    }
);

export const onLogout = (isLoggedIn) => (
    {
        type: logout,
        isLoggedIn:isLoggedIn,
    }
);
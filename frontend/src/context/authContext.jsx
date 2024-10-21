import React, { useReducer, createContext } from 'react';
import {jwtDecode} from 'jwt-decode'; // Use named import instead of * as jwtDecode

const initialState = {
    user: null,
};

// Check for token in localStorage and decode it
if (localStorage.getItem('token')) {
    const decodedToken = jwtDecode(localStorage.getItem('token'));

    // Check if the token is expired
    if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem('token'); 
    } else {
        initialState.user = decodedToken; 
    }
}

const AuthContext = createContext({
    user: null,
    login: (userData) => {},
    logout: () => {},
});

function authReducer(state, action) {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                user: action.payload,
            };
        case 'LOGOUT':
            return {
                ...state,
                user: null,
            };
        default:
            return state;
    }
}

function AuthProvider(props) {
    const [state, dispatch] = useReducer(authReducer, initialState);

    const login = (userData) => {
        // Store the token
        localStorage.setItem('token', userData.token);
        
        // Decode token to get user information
        const decodedToken = jwtDecode(userData.token);

        // Dispatch user data including ID
        dispatch({
            type: 'LOGIN',
            payload: {
                id: decodedToken.userId,  // Ensure this matches the token payload structure
                username: decodedToken.username, 
                email: decodedToken.email,
                role: decodedToken.role,
            },
        });
    };

    const logout = () => {
        localStorage.removeItem('token');
        dispatch({ type: 'LOGOUT' });
    };

    return (
        <AuthContext.Provider value={{ user: state.user, login, logout }} {...props} />
    );
}

export { AuthContext, AuthProvider };

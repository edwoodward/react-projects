import * as actions from './actions';
//import axios from 'axios';

export const authStart = () => {
    return {
        type: actions.AUTH_START,
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actions.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
};

export const authFailed = (error) => {
    return {
        type: actions.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    // localStorage.removeItem('token');
    // localStorage.removeItem('expirationDate');
    // localStorage.removeItem('userId');
    return {
        type: actions.AUTH_INITIATE_LOGOUT
    };
};

export const logoutSucceed = () => {
    return {
        type: actions.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return {
        type: actions.AUTH_CHECK_TIMEOUT,
        expirationTime: expirationTime
    };
};

export const auth = (email, password, isSignUp) => {
    return {
        type: actions.AUTH_USER,
        email: email,
        password: password,
        isSignUp: isSignUp
    }
    //return dispatch => {
    //     dispatch(authStart());
    //     const authData = {
    //         email: email,
    //         password: password,
    //         returnSecureToken: true
    //
    //     }
    //     let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';
    //     if(isSignUp) {
    //         url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';
    //     }
    //     console.log('isSignUp: ' + isSignUp)
    //     console.log(url);
    //     axios.post(url, authData)
    //         .then(response => {
    //             console.log(response);
    //             const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
    //             localStorage.setItem('token', response.data.idToken);
    //             localStorage.setItem('userId', response.data.localId);
    //             localStorage.setItem('expirationDate', expirationDate);
    //             dispatch(authSuccess(response.data.idToken,response.data.localId));
    //             dispatch(checkAuthTimeout(response.data.expiresIn));
    //
    //         })
    //         .catch(err => {
    //             console.log(err.response);
    //             dispatch(authFailed(err.response.data.error));
    //         })
    //
    // };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actions.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};

export const authCheckState = () => {
    // return dispatch => {
    //     const token = localStorage.getItem('token');
    //     if (!token) {
    //         dispatch(logout());
    //     } else {
    //         const expirationDate = new Date(localStorage.getItem('expirationDate'));
    //         if (expirationDate < new Date()) {
    //             dispatch(logout());
    //         } else {
    //             const userId = localStorage.getItem('userId');
    //             dispatch(authSuccess(token, userId));
    //             dispatch(checkAuthTimeout(expirationDate.getSeconds() - new Date().getSeconds()));
    //         }
    //
    //
    //     }
    return {
        type: actions.AUTH_CHECK_STATE,

    }

};


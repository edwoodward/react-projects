import { put } from 'redux-saga/effects';
import * as actions from '../actions/actions';
import * as bbActions from '../actions/index';
import {logout} from "../actions/index";
import { delay, put } from 'redux-saga/effects';
import axios from "axios";
import {authFailed, authStart, authSuccess, checkAuthTimeout} from "../actions/authActions";

export function* logoutSaga(action) {
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('expirationDate');
    yield localStorage.removeItem('userId');
    yield put( bbActions.logoutSucceed());

}

export function* checkAuthTimeoutSaga(action) {
    yield delay(action.expirationTime * 1000);
    yield put(bbActions.logout())

}

export function* authUserSaga(action) {
    yield put(bbActions.authStart());
    const authData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true

    }
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';
    if(action.isSignUp) {
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';
    }
    try {
        const response = yield axios.post(url, authData)
        const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
        localStorage.setItem('token', response.data.idToken);
        localStorage.setItem('userId', response.data.localId);
        localStorage.setItem('expirationDate', expirationDate);
        yield put(bbActions.authSuccess(response.data.idToken, response.data.localId));
        yield put(bbActions.checkAuthTimeout(response.data.expiresIn));

    }catch(err) {
        yield put(bbActions.authFailed(err.response.data.error));
    }
}

export function* authCheckStateSaga(action) {
        const token = yield localStorage.getItem('token');
        if (!token) {
            yield put(bbActions.logout());
        } else {
            const expirationDate = yield new Date(localStorage.getItem('expirationDate'));
            if (expirationDate < new Date()) {
                yield put(bbActions.logout());
            } else {
                const userId = yield localStorage.getItem('userId');
                yield put(bbActions.authSuccess(token, userId));
                yield put(bbActions.checkAuthTimeout(expirationDate.getSeconds() - new Date().getSeconds()));
            }


        }
}

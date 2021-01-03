import { takeEvery } from 'redux-saga/effects';
import {logoutSaga, checkAuthTimeoutSaga, authUserSaga, authCheckStateSaga} from "./authSaga";
import * as actions from '../actions/actions';
import {initIngredientsSaga} from "./burgerBuilderSaga";
import {fetchOrdersSaga, purchaseBurgerSaga} from "./orderSaga";

export function* watchAuth() {
    yield takeEvery(actions.AUTH_INITIATE_LOGOUT, logoutSaga);
    yield takeEvery(actions.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
    yield takeEvery(actions.AUTH_USER, authUserSaga);
    yield takeEvery(actions.AUTH_CHECK_STATE, authCheckStateSaga);
}

export function* watchBurgerBuilder() {
    yield takeEvery(actions.INIT_INGREDIENTS, initIngredientsSaga);
}

export function* watchOrder() {
    yield takeEvery(actions.PURCHASE_BURGER, purchaseBurgerSaga);
    yield takeEvery(actions.FETCH_ORDERS, fetchOrdersSaga);
}

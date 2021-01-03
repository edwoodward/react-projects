import axios from "../../axiosOR";
import * as bbActions from '../actions/index';
import { put } from 'redux-saga/effects';
import {fetchOrdersFail, fetchOrdersStart, fetchOrdersSuccess} from "../actions/orderActions";


export function* purchaseBurgerSaga(action) {
    yield put(bbActions.purchaseBurgerStart());
    try {
        const response = axios.post('/orders.json?auth=' + action.token, action.orderData);
        yield put(bbActions.purchaseBurgerSuccess(response.data.name, action.orderData))
    } catch(error) {
        yield put(bbActions.purchaseBurgerFail(error))
    }
}

export function* fetchOrdersSaga(action) {
    console.log('action token: ' + action.token);
    console.log('action userId: ' + action.userId);
    yield put(bbActions.fetchOrdersStart());
    const queryParams = '?auth=' + action.token + '&orderBy="userId"&equalTo="' + action.userId + '"';
    try {
        const response = yield axios.get('/orders.json' + queryParams)
        console.log(response.data);
        const fetchedOrders = [];
        for (let key in response.data) {
            fetchedOrders.push({
                ...response.data[key],
                id: key

            });
        }
        yield put(bbActions.fetchOrdersSuccess(fetchedOrders));
    } catch(err) {
        yield put(bbActions.fetchOrdersFail(err));
    }
}
import { put } from 'redux-saga/effects';
import * as bbActions from '../actions/index';
import axios from '../../axiosOR';

export function* initIngredientsSaga(action) {
    try {
        const response = yield axios.get('https://ew-burger-builder.firebaseio.com/ingredients.json');
        yield put(bbActions.setIngredients(response.data));
    } catch(error) {
        yield put(bbActions.fetchIngredientsFailed());
    }
}
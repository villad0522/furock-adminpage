
//yield put({type:'ACTION', ...})   ActionをDispatchする
//yield take(['ACTION'])            指定のActionがDispatchされるまで待つ
//yield takeEvery('ACTION', func)   ActionがDispatchされたら、毎回関数を呼び出すように設定する（同じActionが複数回来た場合は、並列で処理を行う）
//yield call(func, args)            関数をを呼び出して、終了を待つ（関数から戻り値を貰える）
//yield fork(func)                  バックグラウンド処理を開始する。（終了は待たない）
//yield select(selector関数, args)  storeからデータを取りたい
//takeLatest                        処理をキャンセルし、新しい処理を行う
//axios.get(..)                     GET関数とかをコール

import { takeEvery, call, delay, select } from 'redux-saga/effects';
import actions from '../actions';
import login from './auth/login';
import loginCheck from './auth/loginCheck';
import logout from './auth/logout';
import getJson from './json/get';
import postJsonFunc from './json/post';
import postImage from './postImage';
import getVersionDatas from './versions/get';
import push from './versions/push';
import pull from './versions/pull';

export default function* rootSaga() {
    yield takeEvery(actions?.auth?.login, login);
    yield takeEvery(actions?.auth?.loginCheck, loginCheck);
    yield takeEvery(actions?.auth?.logout, logout);
    yield takeEvery(actions?.json?.get, getJson);
    yield takeEvery(actions?.json?.post, postJson);
    yield takeEvery(actions?.json?.delete, deleteJson);
    yield takeEvery(actions?.json?.move, moveJson);
    yield takeEvery(actions?.imageUploader?.post, postImage);
    yield takeEvery(actions?.versions?.getVersionDatas, getVersionDatas);
    yield takeEvery(actions?.versions?.push, push);
    yield takeEvery(actions?.versions?.pull, pull);
    //
    const oneTimeId = localStorage.getItem('oneTimeId');
    if (oneTimeId) {
        yield call(loginCheck, oneTimeId);
    }
}

function* postJson() {
    const fileName = yield select(state => state?.json?.select?.fileName);
    yield call(postJsonFunc, fileName);
}

function* deleteJson({ payload: { fileName, category, index } }) {
    yield delay(1000);  //reducerがstateを変更するのを待つ
    yield call(postJsonFunc, fileName);
}

function* moveJson({ payload: {
    ballJsonFileName,
    ballCategory,
    ballIndex,
    catchJsonFileName,
    catchCategory,
    catchIndex,
} }) {
    yield delay(1000);  //reducerがstateを変更するのを待つ
    yield call(postJsonFunc, ballJsonFileName);
    if (ballJsonFileName !== catchJsonFileName) {
        yield call(postJsonFunc, catchJsonFileName);
    }
}
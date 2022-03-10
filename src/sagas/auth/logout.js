
import { select, put } from 'redux-saga/effects';
import axios from 'axios';
import actions from '../../actions';

export default function* logout() {
    const oneTimeId = yield select(state => state?.auth?.oneTimeId);
    yield put(actions?.auth?.setAuthCode(''));
    yield put(actions?.auth?.setOneTimeId(''));
    //
    console.log("ログアウト開始");
    try {
        const res = yield axios.delete(
            'https://epn63s2g5a.execute-api.ap-northeast-1.amazonaws.com/production/auth?'
            + 'oneTimeId=' + oneTimeId
        );
        if (typeof res.data === "string") {
            console.log('サーバーエラー：' + res.data);
            alert(res.data);
            return;
        }
        console.log("ログアウト完了");
    }
    catch (e) {
        alert('ネットワークエラー');
        console.log('ログアウト中にエラー発生 : ' + e);
    }
}


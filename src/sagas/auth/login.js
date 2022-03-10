
import { select, put } from 'redux-saga/effects';
import axios from 'axios';
import actions from '../../actions';

export default function* login() {
    const authCode = yield select(state => state?.auth?.authCode);
    //
    console.log("ログイン開始");
    try {
        const res = yield axios.post(
            'https://epn63s2g5a.execute-api.ap-northeast-1.amazonaws.com/production/auth',
            {
                authCode,
            },
        );
        if (typeof res.data === "string") {
            yield put(actions?.auth?.setVerifiedFlag(false));
            console.log('サーバーエラー：' + res.data);
            alert(res.data);
            return;
        }
        console.log("ログイン完了");
        yield put(actions?.auth?.setAuthCode(''));
        yield put(actions?.auth?.setVerifiedFlag(res?.data?.verifiedFlag));
        if (res?.data?.verifiedFlag) {
            yield put(actions?.auth?.setOneTimeId(res?.data?.oneTimeId));
        }
    }
    catch (e) {
        alert('ネットワークエラー');
        console.log('ログイン中にエラー発生 : ' + e);
    }
}


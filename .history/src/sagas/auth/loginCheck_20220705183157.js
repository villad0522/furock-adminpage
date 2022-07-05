
import { select, put } from 'redux-saga/effects';
import axios from 'axios';
import actions from '../../actions';

export default function* loginCheck(oneTimeId) {
    oneTimeId = oneTimeId ? oneTimeId : yield select(state => state?.auth?.oneTimeId);
    //
    console.log("ログインチェック開始");
    try {
        const res = yield axios.get(
            'https://epn63s2g5a.execute-api.ap-northeast-1.amazonaws.com/production/auth?'
            + 'oneTimeId=' + oneTimeId,
            {
                params: {
                    timestamp: new Date().getTime(),    //キャッシュ対策
                }
            }
        );
        if (typeof res.data === "string") {
            yield put(actions?.auth?.setVerifiedFlag(false));
            console.log('サーバーエラー：' + res.data);
            alert(res.data);
            return;
        }
        console.log("ログインチェック完了");
        yield put(actions?.auth?.setVerifiedFlag(res?.data?.verifiedFlag));
        if (res?.data?.verifiedFlag) {
            yield put(actions?.auth?.setOneTimeId(oneTimeId));
        }
        else {
            yield put(actions?.auth?.setOneTimeId(''));
        }
    }
    catch (e) {
        alert('ネットワークエラー');
        console.log('ログインチェック中にエラー発生 : ' + e);
    }
}


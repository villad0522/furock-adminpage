
import { select, put } from 'redux-saga/effects';
import axios from 'axios';
import actions from '../../actions';

export default function* pull({ payload: { version } }) {
    const oneTimeId = yield select(state => state?.auth?.oneTimeId);
    console.log("プル開始");
    try {
        const res = yield axios.post(
            'https://wvdkbseaqd.execute-api.ap-northeast-1.amazonaws.com/production/pull',
            {
                oneTimeId,
                version,
            },
        );
        console.log(res.data);
        //###########################################################################
        if (typeof res.data === "string") {
            if (res.data === 'PLEASE LOGIN') {
                yield put(actions?.auth?.setAuthCode(''));
                yield put(actions?.auth?.setOneTimeId(''));
                yield put(actions?.auth?.setVerifiedFlag(false));
                alert('セッションの有効期限が切れました。再度ログインしてください。');
            }
            else {
                console.log('サーバーエラー：' + res.data);
                alert(res.data);
            }
        }
        //###########################################################################
        console.log("プル完了");
    }
    catch (e) {
        alert('ネットワークエラー');
        console.log('プル中にエラー発生 : ' + e);
    }
    finally {
        yield put(actions.loading.setLoading(false));
    }
}


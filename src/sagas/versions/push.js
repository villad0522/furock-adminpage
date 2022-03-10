
import { select, put } from 'redux-saga/effects';
import axios from 'axios';
import actions from '../../actions';

export default function* push() {
    const oneTimeId = yield select(state => state?.auth?.oneTimeId);
    const operator = yield select(state => state?.versions?.operator);
    const comment = yield select(state => state?.versions?.comment);
    console.log("プッシュ開始");
    try {
        const res = yield axios.post(
            'https://wvdkbseaqd.execute-api.ap-northeast-1.amazonaws.com/production/push',
            {
                oneTimeId,
                operator,
                comment,
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
        console.log("プッシュ完了");
        yield put(actions?.versions?.setVersionDatas(res.data));
    }
    catch (e) {
        alert('ネットワークエラー');
        console.log('プッシュ中にエラー発生 : ' + e);
    }
    finally {
        yield put(actions.loading.setLoading(false));
    }
}


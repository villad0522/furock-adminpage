
import { select, put } from 'redux-saga/effects';
import axios from 'axios';
import actions from '../../actions';

export default function* getVersionDatas() {
    const oneTimeId = yield select(state => state?.auth?.oneTimeId);
    let url = 'https://epn63s2g5a.execute-api.ap-northeast-1.amazonaws.com/production/s3/rentalserver-json/versions.json?oneTimeId=' + oneTimeId;
    //
    console.log("ロード開始 " + url);
    try {
        const res = yield axios.get(url);
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
        console.log("ロード完了");
        yield put(actions?.versions?.setVersionDatas(res.data));
    }
    catch (e) {
        //alert('ネットワークエラー');
        console.log('ロード中にエラー発生 : ' + e);
        yield put(actions.loading.setLoading(false));
    }
}


import { select, put } from 'redux-saga/effects';
import axios from 'axios';
import actions from '../../actions';

export default function* postJsonItems(fileName) {
    const oneTimeId = yield select(state => state?.auth?.oneTimeId);
    const files = yield select(state => state?.json.files);
    const categories = files[fileName] ? { ...files[fileName] } : {};
    console.log("アップロード開始");
    try {
        const res = yield axios.post(
            'https://wvdkbseaqd.execute-api.ap-northeast-1.amazonaws.com/production/s3/ayasugi-json/draft/'
            + fileName + '?oneTimeId=' + oneTimeId,
            JSON.stringify(categories),
            {
                headers: {
                    'content-type': 'application/json',
                },
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
        console.log("アップロード完了");
    }
    catch (e) {
        alert('ネットワークエラー');
        console.log('アップロード中にエラー発生 : ' + e);
    }
    finally {
        yield put(actions.loading.setLoading(false));
    }
}


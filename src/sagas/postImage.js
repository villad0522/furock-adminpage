
import { put, select } from 'redux-saga/effects';
import axios from 'axios';
import actions from '../actions';

export default function* postImage({ payload: { imageId, file } }) {
    const oneTimeId = yield select(state => state?.auth?.oneTimeId);
    //###########################################################################
    console.log("S3アップロード開始");
    try {
        //###########################################################################
        const res = yield axios.post(
            'https://epn63s2g5a.execute-api.ap-northeast-1.amazonaws.com/production/s3/rentalserver-image/'
            + imageId + '?public=true&oneTimeId=' + oneTimeId,
            file,
            {
                headers: {
                    'content-type': file.type,
                },
            }
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
            yield put(actions.imageUploader.uploaded(imageId, 'FAILURE'));
            return;
        }
        //###########################################################################
        // 追加完了報告
        yield put(actions.imageUploader.uploaded(imageId, res?.data?.url));
        console.log("アップロード完了");
        //
        //###########################################################################
    }
    catch (e) {
        alert('ネットワークエラー');
        console.log('アップロード中にエラー発生 : ' + e);
        yield put(actions.imageUploader.uploaded(imageId, 'FAILURE'));
        return;
    }
}


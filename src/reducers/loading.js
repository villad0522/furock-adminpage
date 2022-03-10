import { handleActions } from 'redux-actions';
import actions from '../actions';

const defaultState = false;

export default handleActions({
    //============================================================
    [actions.loading.setLoading]: (state, { payload: { loading } }) => {
        return loading;
    },
    //============================================================
    [actions.versions.push]: (state, { payload }) => {
        return true;
    },
    //============================================================
    [actions.versions.pull]: (state, { payload }) => {
        return true;
    },
    //============================================================
    [actions.versions.getVersionDatas]: (state, { payload }) => {
        return true;
    },
    //============================================================
    [actions.versions.setVersionDatas]: (state, { payload }) => {
        return false;
    },
    //============================================================
    [actions.auth.setOneTimeId]: (state, { payload }) => {
        return false;
    },
    //============================================================
    [actions.auth.setVerifiedFlag]: (state, { payload }) => {
        return false;
    },
    //============================================================
    [actions.auth.login]: (state, { payload }) => {
        return true;
    },
    //============================================================
    [actions.auth.loginCheck]: (state, { payload }) => {
        return true;
    },
    //============================================================
    [actions.imageUploader.post]: (state, { payload }) => {
        return true;
    },
    //============================================================
    [actions.imageUploader.uploaded]: (state, { payload }) => {
        return false;
    },
    //============================================================
    [actions.json.get]: (state, { payload }) => {
        return true;
    },
    //============================================================
    [actions.json.post]: (state, { payload }) => {
        return true;
    },
    //============================================================
    [actions.json.delete]: (state, { payload }) => {
        return true;
    },
    //============================================================
    [actions.json.setAll]: (state, { payload }) => {
        return false;
    },
    //============================================================
    [actions.json.move]: (state, { payload }) => {
        return true;
    },
    //============================================================
}, defaultState);

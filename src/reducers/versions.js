import { handleActions } from 'redux-actions';
import actions from '../actions';

const defaultState = {
    pull: false,
    operator: '',
    comment: '',
    pushDialog: false,
    versionDatas: [],
};

export default handleActions({
    //============================================================
    [actions?.versions?.openPushDialog]: (state) => {
        let operator = '';
        if (state?.versionDatas?.length >= 1) {
            const latest = state?.versionDatas[state?.versionDatas?.length - 1];
            if (latest?.operator) {
                //前回の名前を自動入力
                operator = latest?.operator;
            }
        }
        return {
            ...state,
            pushDialog: true,
            operator,
        };
    },
    //============================================================
    [actions?.versions?.closePushDialog]: (state) => {
        return {
            ...state,
            pushDialog: false,
        };
    },
    //============================================================
    [actions?.versions?.push]: (state) => {
        return {
            ...state,
            pushDialog: false,
            pull: false,
        };
    },
    //============================================================
    [actions?.versions?.pull]: (state) => {
        return {
            ...state,
            pull: true,
        };
    },
    //============================================================
    [actions?.versions?.setOperator]: (state, { payload: { operator } }) => {
        return {
            ...state,
            operator,
        };
    },
    //============================================================
    [actions?.versions?.setComment]: (state, { payload: { comment } }) => {
        return {
            ...state,
            comment,
        };
    },
    //============================================================
    [actions?.versions?.getVersionDatas]: (state) => {
        return {
            ...state,
            pull: false,
        };
    },
    //============================================================
    [actions?.versions?.setVersionDatas]: (state, { payload: { versionDatas } }) => {
        return {
            ...state,
            versionDatas,
        };
    },
    //============================================================
}, defaultState);

import { handleActions } from 'redux-actions';
import actions from '../actions';

const defaultState = {
    zenkaku: false,
    authCode: '',
    oneTimeId: '',
    verifiedFlag: null,
};

export default handleActions({
    //============================================================
    [actions.auth.setAuthCode]: (state, { payload: { authCode } }) => {
        const newAuthCode = authCode.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function (s) {
            return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
        });
        const zenkaku = (authCode !== newAuthCode);
        if (zenkaku && state.zenkaku) {
            //全角の２文字目は捨てる
            return {
                ...state,
                zenkaku: false,
                verifiedFlag: null,
            };
        }
        if (isNaN(Number(newAuthCode))) {
            return state;
        }
        return {
            ...state,
            zenkaku: zenkaku,
            verifiedFlag: null,
            authCode: newAuthCode,
        };
    },
    //============================================================
    [actions.auth.setOneTimeId]: (state, { payload: { oneTimeId } }) => {
        localStorage.setItem('oneTimeId', oneTimeId);
        return {
            ...state,
            oneTimeId,
        };
    },
    //============================================================
    [actions.auth.setVerifiedFlag]: (state, { payload: { verifiedFlag } }) => {
        return {
            ...state,
            verifiedFlag,
        };
    },
    //============================================================
}, defaultState);

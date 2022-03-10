import { createActions } from 'redux-actions'

export default createActions({
    LOADING: {
        SET_LOADING: (loading) => ({ loading }),
    },
    AUTH: {
        SET_AUTH_CODE: (authCode) => ({ authCode }),
        SET_ONE_TIME_ID: (oneTimeId) => ({ oneTimeId }),
        SET_VERIFIED_FLAG: (verifiedFlag) => ({ verifiedFlag }),
        LOGIN: () => ({}),
        LOGIN_CHECK: () => ({}),
        LOGOUT: () => ({}),
    },
    IMAGE_UPLOADER: {
        POST: (imageId, file) => ({ imageId, file }),
        UPLOADED: (imageId, url) => ({ imageId, url }),
    },
    VERSIONS: {
        SET_OPERATOR: (operator) => ({ operator }),
        SET_COMMENT: (comment) => ({ comment }),
        GET_VERSION_DATAS: () => ({}),
        SET_VERSION_DATAS: (versionDatas) => ({ versionDatas }),
        OPEN_PUSH_DIALOG: () => ({}),
        CLOSE_PUSH_DIALOG: () => ({}),
        PUSH: () => ({}),
        PULL: (version) => ({ version }),
    },
    JSON: {
        GET: (fileName) => ({ fileName }),
        POST: () => ({}),
        DELETE: (fileName, category, index) => ({ fileName, category, index }),
        SET_ALL: (fileName, items) => ({ fileName, items }),
        OPEN_MENU: () => ({}),
        CLOSE_MENU: () => ({}),
        OPEN_DIALOG: (fileName, category, index) => ({ fileName, category, index }),
        EDIT: (key, value) => ({ key, value }),
        MOVE: (
            ballJsonFileName,
            ballCategory,
            ballIndex,
            catchJsonFileName,
            catchCategory,
            catchIndex,
        ) => ({
            ballJsonFileName,
            ballCategory,
            ballIndex,
            catchJsonFileName,
            catchCategory,
            catchIndex,
        }),
    },
})
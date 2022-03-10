import { handleActions } from 'redux-actions';
import actions from '../actions';
import { v4 as uuidv4 } from 'uuid';

const defaultState = {
    openMenu: false,
    openDialog: false,
    select: {
        new: true,
        fileName: '',
        category: '',
        index: 0,
    },
    files: {},
};

export default handleActions({
    //============================================================
    [actions?.json.post]: (state) => {
        return {
            ...state,
            openMenu: false,
            openDialog: false,
        };
    },
    //============================================================
    [actions?.json.setAll]: (state, { payload: { fileName, items } }) => {
        return {
            ...defaultState,
            files: {
                ...state.files,
                [fileName]: items,
            }
        };
    },
    //============================================================
    [actions?.json.openMenu]: (state) => {
        return {
            ...state,
            openMenu: true,
            openDialog: false,
        };
    },
    //============================================================
    [actions?.json.closeMenu]: (state) => {
        return {
            ...state,
            openMenu: false,
            openDialog: false,
        };
    },
    //============================================================
    [actions?.json.openDialog]: (state, { payload: { fileName, category, index } }) => {
        const files = state.files ? { ...state.files } : {};
        const categories = files[fileName] ? { ...files[fileName] } : {};
        const items = categories[category] ? [...categories[category]] : [];
        return {
            ...state,
            openMenu: false,
            openDialog: true,
            select: {
                new: (!category) || (typeof index !== 'number') || (index >= items?.length),
                fileName,
                category,
                index: (typeof index === 'number') ? index : items?.length,
            },
            files: {
                ...files,
                [fileName]: {
                    ...categories,
                    [category]: items,
                },
            }
        };
    },
    //============================================================
    [actions?.json.edit]: (state, { payload: { key, value } }) => {
        const fileName = state?.select?.fileName;   //選択中のデータテーブル
        const category = state?.select?.category;   //選択中のカテゴリ
        const index = state?.select?.index;   //選択中の番号
        //
        const files = state.files ? { ...state.files } : {};
        const categories = files[fileName] ? { ...files[fileName] } : {};
        const items = categories[category] ? [...categories[category]] : [];
        items[index] = {
            ...items[index],
            [key]: value,
        };
        if (!items[index].uuid) {
            items[index].uuid = uuidv4();
        }
        return {
            ...state,
            files: {
                ...files,
                [fileName]: {
                    ...categories,
                    [category]: items,
                },
            }
        };
    },
    //============================================================
    [actions?.json.delete]: (state, { payload: { fileName, category, index } }) => {
        const files = state.files ? { ...state.files } : {};
        const categories = files[fileName] ? { ...files[fileName] } : {};
        const items = categories[category] ? [...categories[category]] : [];
        items.splice(index, 1);
        return {
            ...state,
            files: {
                ...files,
                [fileName]: {
                    ...categories,
                    [category]: items,
                },
            }
        };
    },
    //============================================================
    [actions?.json.move]: (state, { payload: {
        ballJsonFileName,
        ballCategory,
        ballIndex,
        catchJsonFileName,
        catchCategory,
        catchIndex,
    } }) => {
        let files = state.files ? { ...state.files } : {};
        const ballCategories = files[ballJsonFileName] ? { ...files[ballJsonFileName] } : {};
        const ballItems = ballCategories[ballCategory] ? [...ballCategories[ballCategory]] : [];
        const ballItem = ballItems[ballIndex] ? { ...ballItems[ballIndex] } : {};
        ballItems.splice(ballIndex, 1);
        files = {
            ...files,
            [ballJsonFileName]: {
                ...ballCategories,
                [ballCategory]: ballItems,
            },
        };
        const catchCategories = files[catchJsonFileName] ? { ...files[catchJsonFileName] } : {};
        const catchItems = catchCategories[catchCategory] ? [...catchCategories[catchCategory]] : [];
        catchItems.splice(catchIndex, 0, ballItem);
        return {
            ...state,
            files: {
                ...files,
                [catchJsonFileName]: {
                    ...catchCategories,
                    [catchCategory]: catchItems,
                },
            }
        };
    },
    //============================================================
}, defaultState);

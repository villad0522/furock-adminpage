
import { combineReducers } from 'redux';
import auth from './auth';
import versions from './versions';
import json from './json';
import loading from './loading';
import imageUploader from './imageUploader';

//親玉Reducer
export default combineReducers({
    loading,
    auth,
    versions,
    json,
    imageUploader,
});
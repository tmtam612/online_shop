import { put, takeLatest, all } from 'redux-saga/effects';
function* fetchNews() {
    const json = yield fetch('http://127.0.0.1:8000/api/products/')
        .then(response => response.json(), );
        yield put({ type: "NEWS_RECEIVED", data : json});
    
}
function* actionWatcher() {
    yield takeLatest('GET_LIST', fetchNews)
}
export default function* rootSaga() {
    
    yield all([
        actionWatcher(),
    ]);
 }
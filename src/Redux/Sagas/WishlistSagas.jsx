import { put, takeEvery } from "redux-saga/effects";
import { CREATE_WISHLIST, CREATE_WISHLIST_RED, DELETE_WISHLIST, DELETE_WISHLIST_RED, GET_WISHLIST, GET_WISHLIST_RED, UPDATE_WISHLIST, UPDATE_WISHLIST_RED } from "../Constant"
import { createRecord, deleteRecord, getRecord, updateRecord } from "./Service/index"
// import { createMultipartRecord, getRecord, updateMultipartRecord,deleteRecord } from "./Service/index"

function* createSaga(action) {                                  //Worker Saga
    let response = yield createRecord("wishlist", action.payload)
    // let response = yield createMultipartRecord(action.payload)   //If record has file field
    yield put({ type: CREATE_WISHLIST_RED, payload: response })
}

function* getSaga(action) {                                     //Worker Saga
    let response = yield getRecord("wishlist")
    yield put({ type: GET_WISHLIST_RED, payload: response })
}

function* updateSaga(action) {                                  //Worker Saga
    yield updateRecord("wishlist", action.payload)
    yield put({ type: UPDATE_WISHLIST_RED, payload: action.payload })

    // let response = yield updateMultipartRecord(action.payload)
    // yield put({ type: UPDATE_WISHLIST_RED, payload: response })
}

function* deleteSaga(action) {                                     //Worker Saga
    yield deleteRecord("wishlist", action.payload)
    yield put({ type: DELETE_WISHLIST_RED, payload: action.payload })
}

export default function* WishlistSagas() {
    yield takeEvery(CREATE_WISHLIST, createSaga)            //Watcher Saga
    yield takeEvery(GET_WISHLIST, getSaga)                  //Watcher Saga
    yield takeEvery(UPDATE_WISHLIST, updateSaga)            //Watcher Saga
    yield takeEvery(DELETE_WISHLIST, deleteSaga)            //Watcher Saga
}
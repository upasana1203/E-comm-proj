import { put, takeEvery } from "redux-saga/effects";
import { CREATE_CHECKOUT, CREATE_CHECKOUT_RED, DELETE_CHECKOUT, DELETE_CHECKOUT_RED, GET_CHECKOUT, GET_CHECKOUT_RED, UPDATE_CHECKOUT, UPDATE_CHECKOUT_RED } from "../Constant"
import { createRecord, deleteRecord, getRecord, updateRecord } from "./Service/index"
// import { createMultipartRecord, getRecord, updateMultipartRecord,deleteRecord } from "./Service/index"

function* createSaga(action) {                                  //Worker Saga
    let response = yield createRecord("checkout", action.payload)
    // let response = yield createMultipartRecord(action.payload)   //If record has file field
    yield put({ type: CREATE_CHECKOUT_RED, payload: response })
}

function* getSaga(action) {                                     //Worker Saga
    let response = yield getRecord("checkout")
    yield put({ type: GET_CHECKOUT_RED, payload: response })
}

function* updateSaga(action) {                                  //Worker Saga
    yield updateRecord("checkout", action.payload)
    yield put({ type: UPDATE_CHECKOUT_RED, payload: action.payload })

    // let response = yield updateMultipartRecord(action.payload)
    // yield put({ type: UPDATE_CHECKOUT_RED, payload: response })
}

function* deleteSaga(action) {                                     //Worker Saga
    yield deleteRecord("checkout", action.payload)
    yield put({ type: DELETE_CHECKOUT_RED, payload: action.payload })
}

export default function* CheckoutSagas() {
    yield takeEvery(CREATE_CHECKOUT, createSaga)            //Watcher Saga
    yield takeEvery(GET_CHECKOUT, getSaga)                  //Watcher Saga
    yield takeEvery(UPDATE_CHECKOUT, updateSaga)            //Watcher Saga
    yield takeEvery(DELETE_CHECKOUT, deleteSaga)            //Watcher Saga
}
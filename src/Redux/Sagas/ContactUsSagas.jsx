import { put, takeEvery } from "redux-saga/effects";
import { CREATE_CONTACT_US, CREATE_CONTACT_US_RED, DELETE_CONTACT_US, DELETE_CONTACT_US_RED, GET_CONTACT_US, GET_CONTACT_US_RED, UPDATE_CONTACT_US, UPDATE_CONTACT_US_RED } from "../Constant"
import { createRecord, deleteRecord, getRecord, updateRecord } from "./Service/index"
// import { createMultipartRecord, getRecord, updateMultipartRecord,deleteRecord } from "./Service/index"

function* createSaga(action) {                                  //Worker Saga
    let response = yield createRecord("contactus", action.payload)
    // let response = yield createMultipartRecord(action.payload)   //If record has file field
    yield put({ type: CREATE_CONTACT_US_RED, payload: response })
}

function* getSaga(action) {                                     //Worker Saga
    let response = yield getRecord("contactus")
    yield put({ type: GET_CONTACT_US_RED, payload: response })
}

function* updateSaga(action) {                                  //Worker Saga
    yield updateRecord("contactus", action.payload)
    yield put({ type: UPDATE_CONTACT_US_RED, payload: action.payload })

    // let response = yield updateMultipartRecord(action.payload)
    // yield put({ type: UPDATE_CONTACT_US_RED, payload: response })
}

function* deleteSaga(action) {                                     //Worker Saga
    yield deleteRecord("contactus", action.payload)
    yield put({ type: DELETE_CONTACT_US_RED, payload: action.payload })
}

export default function* ContactUsSagas() {
    yield takeEvery(CREATE_CONTACT_US, createSaga)            //Watcher Saga
    yield takeEvery(GET_CONTACT_US, getSaga)                  //Watcher Saga
    yield takeEvery(UPDATE_CONTACT_US, updateSaga)            //Watcher Saga
    yield takeEvery(DELETE_CONTACT_US, deleteSaga)            //Watcher Saga
}
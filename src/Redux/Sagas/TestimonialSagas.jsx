import { put, takeEvery } from "redux-saga/effects";
import { CREATE_TESTIMONIAL, CREATE_TESTIMONIAL_RED, DELETE_TESTIMONIAL, DELETE_TESTIMONIAL_RED, GET_TESTIMONIAL, GET_TESTIMONIAL_RED, UPDATE_TESTIMONIAL, UPDATE_TESTIMONIAL_RED } from "../Constant"
import { createRecord, deleteRecord, getRecord, updateRecord } from "./Service/index"
// import { createMultipartRecord, getRecord, updateMultipartRecord,deleteRecord } from "./Service/index"

function* createSaga(action) {                                  //Worker Saga
    let response = yield createRecord("testimonial", action.payload)
    // let response = yield createMultipartRecord(action.payload)   //If record has file field
    yield put({ type: CREATE_TESTIMONIAL_RED, payload: response })
}

function* getSaga(action) {                                     //Worker Saga
    let response = yield getRecord("testimonial")
    yield put({ type: GET_TESTIMONIAL_RED, payload: response })
}

function* updateSaga(action) {                                  //Worker Saga
    yield updateRecord("testimonial", action.payload)
    yield put({ type: UPDATE_TESTIMONIAL_RED, payload: action.payload })

    // let response = yield updateMultipartRecord(action.payload)
    // yield put({ type: UPDATE_TESTIMONIAL_RED, payload: response })
}

function* deleteSaga(action) {                                     //Worker Saga
    yield deleteRecord("testimonial", action.payload)
    yield put({ type: DELETE_TESTIMONIAL_RED, payload: action.payload })
}

export default function* TestimonialSagas() {
    yield takeEvery(CREATE_TESTIMONIAL, createSaga)            //Watcher Saga
    yield takeEvery(GET_TESTIMONIAL, getSaga)                  //Watcher Saga
    yield takeEvery(UPDATE_TESTIMONIAL, updateSaga)            //Watcher Saga
    yield takeEvery(DELETE_TESTIMONIAL, deleteSaga)            //Watcher Saga
}
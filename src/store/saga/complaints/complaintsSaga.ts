import { takeEvery } from "typed-redux-saga";
import { getComplaintsRequestAction } from "../../actions";
import { getComplaintsSaga } from "./getComplaintsSaga";

export function* watchComplaintsSaga() {
    yield takeEvery(getComplaintsRequestAction, getComplaintsSaga);
}

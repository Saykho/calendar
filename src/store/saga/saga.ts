import { all } from "typed-redux-saga";
import { watchComplaintsSaga } from "./complaints";

export function* watchSaga() {
  yield* all([watchComplaintsSaga()]);
}

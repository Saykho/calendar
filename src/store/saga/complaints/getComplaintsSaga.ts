import { call, put, SagaGenerator } from "typed-redux-saga";
import {
  getComplaintsFailureAction,
  getComplaintsSuccessAction,
} from "../../actions";
import { ComplaintsService } from "../../../services";

export function* getComplaintsSaga(): SagaGenerator<void> {
  try {
    const complaints = yield* call(ComplaintsService.getComplaints);
    yield* put(getComplaintsSuccessAction({ complaints }));
  } catch (error: any) {
    yield* put(getComplaintsFailureAction(error));
  }
}

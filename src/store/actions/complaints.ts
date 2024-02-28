import { createAction } from "@reduxjs/toolkit";
import { Complaint } from "../../models";

export const getComplaintsRequestAction = createAction("COMPLAINTS/COMPLAINTS_REQUEST");

export const getComplaintsSuccessAction = createAction<{
    complaints: Complaint[];
}>("COMPLAINTS/COMPLAINTS_SUCCESS");

export const getComplaintsFailureAction = createAction<{
    error: any;
}>("COMPLAINTS/COMPLAINTS_FAILURE");

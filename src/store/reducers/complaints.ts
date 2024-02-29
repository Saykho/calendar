import { createReducer, createSelector } from "@reduxjs/toolkit";
import { Complaint } from "../../models";
import {
  getComplaintsFailureAction,
  getComplaintsRequestAction,
  getComplaintsSuccessAction,
} from "../actions";

export enum ComplaintsStateStatus {
  idle = "idle",
  loading = "loading",
}

export interface ComplaintsState {
  complaints: Complaint[];
  error: null | string;
  status: ComplaintsStateStatus;
}

const initialState: ComplaintsState = {
  complaints: [],
  error: null,
  status: ComplaintsStateStatus.idle,
};

export const complaintsReducer = createReducer(initialState, (builder) =>
  builder
    .addCase(getComplaintsRequestAction, (state) => ({
      ...state,
      status: ComplaintsStateStatus.loading,
    }))
    .addCase(getComplaintsSuccessAction, (state, { payload }) => ({
      ...state,
      complaints: payload.complaints,
      status: ComplaintsStateStatus.idle,
    }))
    .addCase(getComplaintsFailureAction, (state, { payload }) => {
      if (payload) {
        return {
          ...state,
          error: payload.error,
        };
      }
      return {
        ...state,
        status: ComplaintsStateStatus.idle,
      };
    }),
);

type WithComplaintsState = {
  complaints: ComplaintsState;
};

export const complaintsStateSelector = (
  state: WithComplaintsState,
): ComplaintsState => state.complaints;

export const getComplaintsSelector = createSelector(
  complaintsStateSelector,
  (state) => {
    return state.complaints;
  },
);

import { put, takeLatest } from "redux-saga/effects";
import { loadMetrics } from "../actions/github";

function* getMetrics() {
  let metrics = yield fetch("https://react-assessment-api.herokuapp.com/api/drone").then(r => r.json());
  yield put(loadMetrics(metrics));
}

export function* githubWatcher() {
  yield [takeLatest("GET_METRICS", getMetrics)];
}

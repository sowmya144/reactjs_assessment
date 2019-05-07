import { combineReducers } from "redux";
import { githubReducer } from "./github";

const rootReducer = combineReducers({
  githubState: githubReducer
});

export default rootReducer;

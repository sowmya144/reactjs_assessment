export function githubReducer(
  prevState = { metrics: [], isLoading: false },
  action
) {
  switch (action.type) {
    case "GET_METRICS":
      return { ...prevState, isLoading: true };
    case "LOAD_METRICS":
      return { ...prevState, isLoading: false, metrics: action.metrics.data };
    default:
      return prevState;
  }
}

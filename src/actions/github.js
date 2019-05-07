export function getMetrics() {
  return { type: "GET_METRICS" };
}

export function loadMetrics(metrics) {
  return { type: "LOAD_METRICS", metrics };
}

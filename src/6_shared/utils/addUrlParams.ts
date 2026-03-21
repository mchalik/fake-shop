export const addUrlParams = (
  searchParamsInstance: URLSearchParams,
  newParams: Record<string, string | number>
) => {
  for (const [key, value] of Object.entries(newParams)) {
    searchParamsInstance.set(key, String(value));
  }
};
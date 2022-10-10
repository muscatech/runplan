export const getCodeFromQueryString = () => {
  const qs = window.location.search;
  const params = new URLSearchParams(qs);
  return params.get('code');
};

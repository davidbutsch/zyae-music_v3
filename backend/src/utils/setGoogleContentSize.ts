export const setGoogleContentSize = (
  url: string,
  width: number,
  height: number
) => {
  const trimmedUrl = url.substring(0, url.lastIndexOf("="));
  const returnUrl = trimmedUrl + `=w${width}-h${height}-p-l90-rj`;
  return returnUrl;
};

import { Thumbnail } from "@/types";

export const getThumbnail = (
  thumbnail: Thumbnail,
  width: number,
  height?: number
): Thumbnail => {
  if (!height) height = width;

  const beforeTrim = thumbnail.url.substring(0, thumbnail.url.lastIndexOf("="));
  const afterTrim = thumbnail.url.substring(thumbnail.url.lastIndexOf("=") + 1);

  if (!afterTrim.startsWith("w") || !afterTrim.includes("-h"))
    return {
      url: thumbnail.url,
      width: thumbnail.width,
      height: thumbnail.height,
    };

  const returnUrl = beforeTrim + `=w${width}-h${height}-p-l90-rj`;
  return {
    url: returnUrl,
    width,
    height,
  };
};

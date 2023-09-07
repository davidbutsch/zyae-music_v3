import { createCanvas, loadImage } from "canvas";
import { newInternalError, setGoogleContentSize } from "@/utils";

import { AppError } from "@/types";
import { FinalColor } from "extract-colors/lib/types/Color";
import { extractColors } from "extract-colors";

export const getColors = async (process: string, src: string) => {
  try {
    process += ".GetColors";

    const canvas = createCanvas(300, 200);
    const ctx = canvas.getContext("2d");

    const image = await loadImage(setGoogleContentSize(src, 200, 100));

    ctx.drawImage(image, 0, 0);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    const palette = await extractColors(
      {
        data: [...imageData.data],
        width: canvas.width,
        height: canvas.height,
      },
      {
        pixels: 2000,
        distance: 0.05,
      }
    );

    return palette;
  } catch (err) {
    if (err instanceof AppError) throw err;
    else throw newInternalError(process, err);
  }
};

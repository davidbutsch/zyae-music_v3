import { AppError, Palette } from "@/types";
import { createCanvas, loadImage } from "canvas";
import { newInternalError, setGoogleContentSize } from "@/utils";

import { FinalColor } from "extract-colors/lib/types/Color";
import { extractColors } from "extract-colors";

// TODO implement better lightness adjust
function adjust(color: string, amount: number) {
  return (
    "#" +
    color
      .replace(/^#/, "")
      .replace(/../g, (color) =>
        (
          "0" +
          Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)
        ).substr(-2)
      )
  );
}

export const getColors = async (
  process: string,
  src: string
): Promise<Palette> => {
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
      }
    );

    const buildSort = (
      palette: FinalColor[],
      key: "area" | "saturation" | "lightness" | "intensity"
    ): { hex: string; determinant: number }[] =>
      palette
        .sort((c1, c2) => c2[key] - c1[key])
        .map((color) => ({ hex: color.hex, determinant: color[key] }));

    const byArea = buildSort(palette, "area");
    const bySaturation = buildSort(palette, "saturation");
    const byLightness = buildSort(palette, "lightness");
    const byIntensity = buildSort(palette, "intensity");

    if (byLightness[0].determinant < 0.4)
      byLightness.unshift({
        hex: adjust(
          byLightness[0].hex,
          Math.round(
            -(Math.pow(1 - byLightness[0].determinant * 100, 2) / 5) + 275
          )
        ),
        determinant: null,
      });

    return {
      colors: palette,
      byArea,
      bySaturation,
      byLightness,
      byIntensity,
    };
  } catch (err) {
    if (err instanceof AppError) throw err;
    else throw newInternalError(process, err);
  }
};

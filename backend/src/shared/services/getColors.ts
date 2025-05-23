import { AppError, Palette, PaletteColor } from "@/types";
import { newInternalError } from "@/utils";
import { createCanvas, loadImage } from "canvas";
import { extractColors } from "extract-colors";

export const getColors = async (src: string): Promise<Palette> => {
  if (!src)
    return [
      {
        hex: "#000000",
        rgb: {
          r: 0,
          g: 0,
          b: 0,
        },
        area: 0,
        hue: 0,
        saturation: 0,
        lightness: 0,
        intensity: 0,
      },
    ];

  try {
    return await loadImage(src)
      .then(async (image) => {
        const canvas = createCanvas(image.width, image.height);
        const ctx = canvas.getContext("2d");

        ctx.drawImage(image, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        const palette: PaletteColor[] = (
          await extractColors(
            {
              data: [...imageData.data],
              width: canvas.width,
              height: canvas.height,
            },
            {
              distance: 0.05,
            }
          )
        ).map((color) => ({
          hex: color.hex,
          rgb: {
            r: color.red,
            g: color.green,
            b: color.blue,
          },
          area: color.area,
          hue: color.hue,
          saturation: color.saturation,
          lightness: color.lightness,
          intensity: color.intensity,
        }));

        if (palette.length == 1) {
          palette[1] = palette[0];
        }

        return palette;
      })
      .catch((error) => {
        console.log(error);
        console.log("ERROR");
        return [];
      });
  } catch (err) {
    console.log(err);
    console.log("ERROR2");

    console.log(src);

    if (err instanceof AppError) throw err;
    else throw newInternalError(err);
  }
};

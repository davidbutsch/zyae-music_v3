import { PaletteColor } from "@/types";

const getRandomInteger = (min: number = 1, max = 11) => {
  return (Math.floor(Math.random() * (max - min)) + min) * 10;
};

export const generateMeshGradient = (colors: PaletteColor[]) => {
  const radialGradients = colors.map((color) => {
    const position: number[] = [getRandomInteger(), getRandomInteger()];

    var gradient = `radial-gradient(at ${position[0]}% ${position[1]}%, ${
      color.hex
    } 0px, transparent ${getRandomInteger(4, 8)}%)`;

    return gradient;
  });

  return radialGradients.join(", ");
};

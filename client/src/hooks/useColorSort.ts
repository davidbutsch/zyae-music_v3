import { PaletteColor } from "@/types";

type UseColorSortOptions = {
  colorShifter?: (color: PaletteColor) => any;
  minimum?: number;
};

export const useColorSort = (
  colors: PaletteColor[] = [],
  options: UseColorSortOptions = {}
) => {
  const sortColors = (
    sortKeys: ("area" | "hue" | "saturation" | "lightness" | "intensity")[]
  ): PaletteColor[] => {
    var shifted = colors;

    if (options.colorShifter)
      shifted = shifted
        .map(options.colorShifter)
        .filter((color) => Boolean(color));

    const multiplyArray = (array: number[]) =>
      array.reduce((number1, number2) => number1 * number2);

    const sorter = (color1: PaletteColor, color2: PaletteColor) => {
      const determinants1 = sortKeys.map((sortKey) => color1[sortKey]);
      const determinants2 = sortKeys.map((sortKey) => color2[sortKey]);

      return multiplyArray(determinants2) - multiplyArray(determinants1);
    };

    const sorted = shifted.slice().sort(sorter);

    return sorted;
  };

  return { sortColors };
};

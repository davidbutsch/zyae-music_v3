export type PaletteColor = {
  hex: string;
  rgb: {
    r: number;
    g: number;
    b: number;
  };
  area: number;
  hue: number;
  saturation: number;
  lightness: number;
  intensity: number;
};

export type Palette = PaletteColor[];

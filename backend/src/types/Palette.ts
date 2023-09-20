export type Palette = {
  colors: {
    hex: string;
    red: number;
    green: number;
    blue: number;
    area: number;
    hue: number;
    saturation: number;
    lightness: number;
    intensity: number;
  }[];
  byArea: { hex: string; determinant: number | null }[];
  bySaturation: { hex: string; determinant: number | null }[];
  byLightness: { hex: string; determinant: number | null }[];
  byIntensity: { hex: string; determinant: number | null }[];
};

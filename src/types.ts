export type FontFamily = 'Inter' | 'Roboto' | 'Poppins';
export type FontWeight = 300 | 400 | 500 | 600 | 700 | 800;

export type ButtonShadow = 'none' | 'sm' | 'md' | 'lg';
export type Align = 'left' | 'center' | 'right';
export type GalleryAlign = 'grid-left' | 'grid-center' | 'grid-right';
export type LayoutKey = 'layout-a' | 'layout-b';

export interface TypographyConfig {
  family: FontFamily;
  weight: FontWeight;
  size: number; // px
}

export interface ButtonConfig {
  radius: number; // px
  shadow: ButtonShadow;
  align: Align;
  bgColor: string; // hex or rgb
  textColor: string; // hex or rgb
}

export interface GalleryConfig {
  align: GalleryAlign;
  spacing: number; // px
  radius: number; // px
}

export interface LayoutConfig {
  cardRadius: number; // px
  padding: number; // container padding in px
  sectionBg: string; // color
}

export interface StrokeConfig {
  color: string;
  weight: number; // px
}

export interface EditorConfig {
  typography: TypographyConfig;
  button: ButtonConfig;
  gallery: GalleryConfig;
  layout: LayoutConfig;
  stroke: StrokeConfig;
  activeLayout: LayoutKey;
}

export interface ProductData {
  name: string;
  price: number;
  wasPrice?: number;
  swatches: string[];
}

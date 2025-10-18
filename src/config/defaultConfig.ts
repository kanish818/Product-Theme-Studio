import { EditorConfig, ProductData } from '../types';

// Default styling config - these are my preferred starting values
export const defaultConfig: EditorConfig = {
  typography: { family: 'Poppins', weight: 500, size: 15 },
  button: {
    radius: 8,
    shadow: 'sm',
    align: 'center',
    bgColor: '#58a6ff',
    textColor: '#ffffff',
  },
  gallery: {
    align: 'grid-center',
    spacing: 12,
    radius: 10,
  },
  layout: {
    cardRadius: 14,
    padding: 20,
    sectionBg: '#161b22',
  },
  stroke: { color: '#30363d', weight: 1 },
  activeLayout: 'layout-a',
};

// Sample product data for the preview
export const sampleProduct: ProductData = {
  name: 'Premium Wireless Headphones',
  price: 299,
  wasPrice: 399,
  swatches: ['#1a1a1a', '#2d3748', '#4a5568', '#718096', '#e53e3e', '#dd6b20', '#d69e2e', '#38a169', '#3182ce', '#805ad5', '#d53f8c'],
};

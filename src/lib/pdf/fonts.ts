// PDF fonts configuration
// Using built-in fonts for reliability - custom fonts can be added later

// React-PDF built-in fonts:
// - Courier, Courier-Bold, Courier-Oblique, Courier-BoldOblique
// - Helvetica, Helvetica-Bold, Helvetica-Oblique, Helvetica-BoldOblique
// - Times-Roman, Times-Bold, Times-Italic, Times-BoldItalic
// - Symbol, ZapfDingbats

// Export font family names for consistency
// Using built-in fonts that don't require registration
export const fonts = {
  primary: 'Helvetica',
  heading: 'Helvetica-Bold',
  handwriting: 'Times-Italic', // Closest to handwriting in built-in fonts
} as const;

// Common font sizes
export const fontSizes = {
  title: 24,
  subtitle: 18,
  heading: 16,
  body: 12,
  small: 10,
  tiny: 8,
} as const;

// Common colors
export const colors = {
  black: '#1a1a1a',
  darkGray: '#4a4a4a',
  mediumGray: '#888888',
  lightGray: '#cccccc',
  veryLightGray: '#f5f5f5',
  white: '#ffffff',
  primary: '#2563eb', // Blue
  secondary: '#7c3aed', // Purple
  success: '#16a34a', // Green
  warning: '#ca8a04', // Yellow
  danger: '#dc2626', // Red
} as const;

// Common spacing (in points, 72 points = 1 inch)
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
} as const;

// Page dimensions (Letter size)
export const pageDimensions = {
  width: 612, // 8.5 inches
  height: 792, // 11 inches
  margin: 54, // 0.75 inches
} as const;

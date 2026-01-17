import { Font } from '@react-pdf/renderer';

// Register fonts for PDF generation
// Using Google Fonts that are available via CDN

// Primary font - clean and readable
Font.register({
  family: 'Inter',
  fonts: [
    {
      src: 'https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff2',
      fontWeight: 400,
    },
    {
      src: 'https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fAZ9hjp-Ek-_EeA.woff2',
      fontWeight: 600,
    },
    {
      src: 'https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYAZ9hjp-Ek-_EeA.woff2',
      fontWeight: 700,
    },
  ],
});

// Heading font - friendly for kids
Font.register({
  family: 'Poppins',
  fonts: [
    {
      src: 'https://fonts.gstatic.com/s/poppins/v20/pxiEyp8kv8JHgFVrJJfecg.woff2',
      fontWeight: 400,
    },
    {
      src: 'https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLEj6Z1xlFQ.woff2',
      fontWeight: 600,
    },
    {
      src: 'https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLCz7Z1xlFQ.woff2',
      fontWeight: 700,
    },
  ],
});

// Handwriting font - for answers/cursive
Font.register({
  family: 'Caveat',
  fonts: [
    {
      src: 'https://fonts.gstatic.com/s/caveat/v17/WnznHAc5bAfYB2QRah7pcpNvOx-pjfJ9eIWpYQ.woff2',
      fontWeight: 400,
    },
    {
      src: 'https://fonts.gstatic.com/s/caveat/v17/WnznHAc5bAfYB2QRah7pcpNvOx-pjcx6eIWpYQ.woff2',
      fontWeight: 700,
    },
  ],
});

// Hyphenation callback - prevent awkward word breaks
Font.registerHyphenationCallback((word) => [word]);

// Export font family names for consistency
export const fonts = {
  primary: 'Inter',
  heading: 'Poppins',
  handwriting: 'Caveat',
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

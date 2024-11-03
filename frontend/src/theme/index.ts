// theme/index.ts

import { extendTheme, ThemeConfig } from "@chakra-ui/react";
import '@fontsource/outfit';  // This will load the Outfit font globally

// 1. Define the color palette
const colors = {
  primary: {
    100: "#1DA1F20A",
    200: "#A1CFFF",
    300: "#72B7FF",
    400: "#43A0FF",
    500: "#1DA1F2", // Trust color
    600: "#0E6BA8",
    700: "#085187",
    800: "#053A66",
    900: "#03254B",
  },
  emergency: {
    500: "#CC2D4A",
  },
  health: {
    500: "#23D160",
  },
  gray: {
    50: "#1B243233",
    100: "#C4C4C4",
    200: "#1B2432",
  },
  neutral: {
    100: "#FFFFFF",
  },
};

// 2. Define other customizations (such as fonts)
const fonts = {
    heading: "Montserrat, sans-serif",
    body: "Montserrat, sans-serif",
  };

// 3. Define color mode config (optional)
const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: true,
};

// 4. Extend the theme with the custom configurations
const theme = extendTheme({
  colors,
  fonts,
  config,
});

export default theme;
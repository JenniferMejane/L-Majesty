"use client";
import { createTheme } from "@mui/material/styles";
import { Roboto } from "next/font/google";
import { PaletteMode } from "@mui/material";

// Google Font
const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

// Shared color tokens
const colors = {
  royalBlue: "#11296b",
  denim: "#005fb8",
  ruddyBlue: "#77a6d3",
  antiflashWhite: "#ededed",
  jasmine: "#ffe999",
  gold: "#ffd633",
  darkBackground: "#0a0a0a",
  darkCard: "#1a1a1a",
  darkMuted: "#3d3d3d",
};

// Material UI Theme
const theme = createTheme({
  palette: {
    mode: "light" as PaletteMode,
    primary: {
      main: colors.royalBlue,
      contrastText: "#ffffff",
    },
    secondary: {
      main: colors.denim,
      contrastText: "#ffffff",
    },
    background: {
      default: colors.antiflashWhite,
      paper: "#ffffff",
    },
    text: {
      primary: colors.royalBlue,
      secondary: colors.denim,
    },
    info: {
      main: colors.ruddyBlue,
    },
    warning: {
      main: colors.jasmine,
    },
    success: {
      main: "#4caf50",
    },
    error: {
      main: "#f44336",
    },
  },

  typography: {
    fontFamily: roboto.style.fontFamily,
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
        standardInfo: {
          backgroundColor: colors.ruddyBlue,
          color: colors.royalBlue,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: colors.royalBlue,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundColor: colors.antiflashWhite,
        },
      },
    },
  },
});

export default theme;

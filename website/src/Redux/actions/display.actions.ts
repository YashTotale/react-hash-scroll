export const TOGGLE_DARK_MODE = "TOGGLE_DARK_MODE";
export const toggleDarkMode = (isDarkMode?: boolean) => ({
  type: TOGGLE_DARK_MODE,
  payload: {
    isDarkMode,
  },
});

import { create } from "zustand";
import { persist } from "zustand/middleware";

//import { themes, themeNames } from "../assets/styles/themes";

const useThemeStore = create(
  persist(
    (set, get) => ({
      //currentTheme: "classic",
      darkMode: true,
      //themes: themes,

      //setTheme: (themeName) =>
      //  set(() => ({
      //    currentTheme: themeNames.includes(themeName) ? themeName : "classic",
      //  })),

      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),

      //theme: () => {
      //  const state = get();
      //  return state.themes[state.currentTheme][
      //    state.darkMode ? "dark" : "light"
      //  ];
      //},

      // extra reusable stuff
      seatColors: {
        standard: {
          light: "bg-blue-600 text-white",
          dark: "bg-blue-500 text-white",
        },
        premium: {
          light: "bg-amber-600 text-white",
          dark: "bg-amber-500 text-white",
        },
        vip: {
          light: "bg-purple-600 text-white",
          dark: "bg-purple-500 text-white",
        },
        disabled: {
          light: "bg-gray-500 text-white",
          dark: "bg-gray-600 text-white",
        },
      },
    }),
    {
      name: "theme-storage",
    },
  ),
);

export const useTheme = () =>
  useThemeStore(
    (state) =>
      state.themes[state.currentTheme][state.darkMode ? "dark" : "light"],
  );

export default useThemeStore;

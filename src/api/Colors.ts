interface colorType {
  surface: string;
  text: string;
  background: string;
  price: string;
}
export const LightTheme: colorType = {
  surface: "#006C9B",
  text: "#707070",
  background: "#FFFFFF",
  price: "#F8B500",
};

export const DarkTheme: colorType = {
  surface: "#000000",
  text: "#076D80",
  background: "#FFFFFF",
  price: "#F8B500",
};

export const Color: () => string = () => {
  !window.localStorage.getItem("theme") &&
    window.localStorage.setItem("theme", "light");
  return LightTheme.surface || "";
};

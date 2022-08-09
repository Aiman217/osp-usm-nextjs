import { useEffect } from "react";
import { themeChange } from "theme-change";

const ThemeSelector = (props) => {
  const themeList = [
    "light",
    "dark",
    "cupcake",
    "bumblebee",
    "emerald",
    "corporate",
    "synthwave",
    "retro",
    "cyberpunk",
    "valentine",
    "halloween",
    "garden",
    "forest",
    "aqua",
    "lofi",
    "pastel",
    "fantasy",
    "wireframe",
    "black",
    "luxury",
    "dracula",
    "cmyk",
    "autumn",
    "business",
    "acid",
    "lemonade",
    "night",
    "coffee",
    "winter",
  ];

  useEffect(() => {
    themeChange(false);
  }, []);

  return (
    <>
      <select
        data-choose-theme
        className={"select select-bordered " + props.theme}
      >
        <option disabled>Pick your theme</option>
        <option value="">Default</option>
        {themeList?.map((item, index) => (
          <option key={index} value={item} className="capitalize">
            {item}
          </option>
        ))}
      </select>
    </>
  );
};

export default ThemeSelector;

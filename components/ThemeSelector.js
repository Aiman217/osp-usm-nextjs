import { useEffect } from "react";
import { themeChange } from "theme-change";

const ThemeSelector = (props) => {
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
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="synthwave">Synthwave</option>
        <option value="halloween">Halloween</option>
      </select>
    </>
  );
};

export default ThemeSelector;
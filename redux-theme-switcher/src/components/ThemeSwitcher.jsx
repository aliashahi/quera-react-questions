import React from "react";
import { connect } from "react-redux";
import { THEME_TYPE } from "../constants";

const ThemeSwitcher = (props) => {
  const themeMode = props.theme;

  const handleThemeChange = (e) => {
    props.dispatch({ type: themeMode });
  };

  return (
    <div className="switch-container">
      <label className="switch">
        <input
          data-testid="theme-changer"
          type="checkbox"
          checked={themeMode === THEME_TYPE.DARK}
          onChange={handleThemeChange}
        />
        <span className="slider round"></span>
      </label>
      <span className="text-color bold">Dark mode</span>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    ...state,
    ...ownProps,
  };
};

export default connect(mapStateToProps)(ThemeSwitcher);

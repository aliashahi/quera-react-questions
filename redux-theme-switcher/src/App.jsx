import React from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import NameBox from "./components/NameBox";
import ThemeSwitcher from "./components/ThemeSwitcher";
import Styles from "./data/Styles";

// No need to change *return* part in both StyleTag and App components
// You have to set themeMode based on redux state

const _StyleTag = (props) => {
  const themeMode = props.theme;
  return (
    <Helmet>
      <style>{Styles(themeMode)}</style>
    </Helmet>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    ...state,
    ...ownProps,
  };
};

const StyleTag = connect(mapStateToProps)(_StyleTag);

function App() {
  return (
    <>
      <StyleTag />
      <NameBox />
      <ThemeSwitcher />
    </>
  );
}

export default App;

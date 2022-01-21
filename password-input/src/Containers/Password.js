import React, { Component } from "react";
import Input from "../Components/Input";
import Bar from "../Components/Bar";
import zxcvbn from "zxcvbn";

class Password extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      text: "Enter Your Password",
      score: 0,
      currentState: {},
    };
  }

  componentDidMount() {
    this.setState({ ...this.state, ...this.props[0] });
  }

  handlePasswordChange = (e) => {
    let value = e.target.value;
    const evaluation = zxcvbn(value);
    this.setState({
      ...this.state,
      score: evaluation.score,
      ...this.props.strength[evaluation.score],
      suggestions: evaluation.feedback.suggestions.join(""),
      input: value,
    });
  };

  render() {
    return (
      <div className="wrapper">
        <Input
          type="text"
          value={this.state.input}
          onChange={this.handlePasswordChange}
        />
        <div className="bar-wrapper">
          <Bar
            width={this.state.input == "" ? 0 : (this.state.score + 1) * 140}
            height={"10px"}
            bgColor={this.state.bgColor}
          />
        </div>
        <h4 id="result">
          {this.state.input == "" ? "Enter Your Password" : this.state.text}
        </h4>
        <h4 id="suggestion">
          {this.state.input == "" ? "" : this.state.suggestions}
        </h4>
      </div>
    );
  }
}

export default Password;

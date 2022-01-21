import React, { Component } from "react";
import Input from "../Components/Input";
import Button from "../Components/Button";
class InputContainer extends Component {
  render() {
    return (
      <div>
        <div className="input-container">
          <Input
            inputId="graph-input"
            value={this.props.value}
            getInput={(e) => this.props.setInput(e)}
          />
        </div>
        <div className="btn-container">
          <Button
            text="Create"
            BtnId="create-btn"
            onClick={this.props.handleCreateGraph}
          />
          <Button
            text="Clean"
            BtnId="clean-btn"
            onClick={this.props.clearInput}
          />
        </div>
      </div>
    );
  }
}

export default InputContainer;

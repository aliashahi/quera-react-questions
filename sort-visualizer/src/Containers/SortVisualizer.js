import Bar from "../Components/Bar";
import Input from "../Components/Input";
import React, { Component } from "react";
import Button from "../Components/Button";

const COLORS = {
  LIMEGREEN: "limegreen",
  BLUE: "blue",
  GREEN: "green",
};
class SortVisualizer extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      speed: 50,
      data: [],
      ended: false,
      sorting: false,
    };
  }

  updateView = (data, index = 0) => {
    if (data.length !== 0 && data.length !== index) {
      setTimeout(() => {
        this.setState({
          ...this.state,
          data: data[index],
          ended: data.length - 1 == index,
        });
        if (data.length - 1 == index) return;
        this.updateView(data, index + 1);
      }, this.state.speed);
    } else this.setState({ ...this.state, ended: true, sorting: false });
  };

  makeGreen = (value) => ({ ...value, color: COLORS.GREEN });
  makeBlue = (value) => ({ ...value, color: COLORS.BLUE });

  insertionSort = () => {
    let actions = [];
    let list = [];
    this.setState({ ...this.state, sorting: true });
    let copy = this.state.data.map((i) => i.value);
    for (let i = 1; i <= copy.length; i++) {
      for (let j = i - 1; j >= 0; j--) {
        if (copy[j + 1] < copy[j]) {
          const temp = copy[j];
          copy[j] = copy[j + 1];
          copy[j + 1] = temp;
          actions.push([j, i]);
          list.push([...copy]);
        } else {
          actions.push([j, i]);
          list.push([...copy]);
          break;
        }
      }
    }
    if (actions.length > 0) {
      for (let i = 0; i < actions.length - 1; i++) {
        list[i] = list[i].map((j) => ({ value: j, color: COLORS.LIMEGREEN }));
        list[i][actions[i][0]] = this.makeGreen(list[i][actions[i][0]]);
        list[i][actions[i][1]] = this.makeBlue(list[i][actions[i][1]]);
      }
      list[actions.length - 1] = list[actions.length - 1].map((j) => ({
        value: j,
        color: COLORS.LIMEGREEN,
      }));
    }
    this.updateView(list);
  };

  handleInputChange = (value) => {
    if (value == "") {
      this.setState({
        ...this.state,
        input: value,
        ended: false,
        data: [],
      });
    }
    try {
      const data = value
        .trim()
        .split(" ")
        .map((d) => {
          if (d === "" || isNaN(d)) throw Error;
          return {
            color: COLORS.LIMEGREEN,
            value: Number(d),
          };
        });
      this.setState({
        ...this.state,
        input: value,
        ended: false,
        data,
      });
    } catch {}
  };

  handleSpeedChange = (value) => {
    this.setState({
      ...this.state,
      speed: value,
      ended: false,
    });
  };

  render() {
    return (
      <div className={"visualizer-container"}>
        <div className={"array-container"}>
          {this.state.data.map((bar, index) => {
            return (
              <Bar key={index} height={bar.value} backgroundColor={bar.color} />
            );
          })}
        </div>
        {this.state.ended && <span id="end-message">Sort has been end</span>}
        <div className={"input-container"}>
          <div>
            <Input
              elementId={"interval"}
              type="number"
              width={"300px"}
              placeholder={"Interval(ms) - default is 50ms"}
              onChange={(e) => this.handleSpeedChange(e.target.value)}
            />
          </div>
          <div>
            <Input
              elementId={"array"}
              type="text"
              width={"600px"}
              placeholder={"Numbers"}
              value={this.state.input}
              onChange={(e) => this.handleInputChange(e.target.value)}
            />
          </div>
        </div>
        <footer className="app-footer">
          <Button
            elementId={"start"}
            text={"Insertion Sort"}
            disabled={this.state.sorting}
            onClick={this.insertionSort}
          />
          <Button
            elementId={"clean"}
            text={"Clear"}
            onClick={() => {
              this.setState({ ...this.state, input: "", data: [] });
            }}
          />
        </footer>
      </div>
    );
  }
}

export default SortVisualizer;

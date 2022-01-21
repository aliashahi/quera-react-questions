import React, { Component } from "react";
import InputContainer from "./InputContainer";
import GraphContainer from "./GraphContainer";

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      graphData: { nodes: [], trans: [] },
    };
  }

  randomPosition = (node) => {
    const x = Math.floor(Math.random() * 770 + 30);
    const y = Math.floor(Math.random() * 470 + 30);
    return {
      x,
      y,
    };
  };

  getNodes = (lines) => {
    let nodes = [];
    lines.map((i) => {
      const [start, end] = i.split(" ");
      if (!nodes.includes(start)) nodes.push(start);
      if (!nodes.includes(end)) nodes.push(end);
    });
    nodes = nodes.map((node) => {
      if (!node) throw Error;
      return {
        id: node,
        ...this.randomPosition(node),
      };
    });
    return nodes;
  };

  getTransitions = (nodes, lines) => {
    return lines.map((i) => {
      const [start, end] = i.split(" ");
      const s = nodes.find((i) => i.id == start);
      const e = nodes.find((i) => i.id == end);
      return {
        id: s.id + e.id,
        s: {
          x: s.x,
          y: s.y,
        },
        e: {
          x: e.x,
          y: e.y,
        },
      };
    });
  };

  handleCreateGraph = () => {
    const lines = this.state.input.trim().split("\n");
    if (lines.length == 0) return;
    try {
      const nodes = this.getNodes(lines);
      const transitions = this.getTransitions(nodes, lines);
      this.setState({
        ...this.state,
        graphData: { nodes, trans: transitions },
      });
    } catch {}
  };

  render() {
    return (
      <div className="wrapper">
        <InputContainer
          handleCreateGraph={this.handleCreateGraph}
          value={this.state.input}
          clearInput={() => {
            this.setState({ input: "", graphData: { nodes: [], trans: [] } });
          }}
          setInput={(e) => {
            this.setState({ ...this.state, input: e });
          }}
        />
        <GraphContainer graphData={this.state.graphData} />
      </div>
    );
  }
}

export default App;

import React, { Component } from "react";
import Node from "../Components/Node";
import Line from "../Components/Line";
import Text from "../Components/Text";

class GraphContainer extends Component {
  render() {
    return (
      <div>
        <div className="container">
          <svg
            version="1.2"
            xmlns="http://www.w3.org/2000/svg"
            className="graph"
            aria-labelledby="title"
            role="img"
          >
            {this.props.graphData.trans.map((tran, index) => {
              return (
                <Line
                  key={tran.id}
                  x1={tran.s.x}
                  y1={tran.s.y}
                  x2={tran.e.x}
                  y2={tran.e.y}
                  id={tran.id}
                />
              );
            })}
            {this.props.graphData.nodes.map((node, index) => {
              return (
                <Node
                  key={node.id}
                  cx={node.x}
                  cy={node.y}
                  id={node.id}
                  r="30"
                />
              );
            })}
            {this.props.graphData.nodes.map((node, index) => {
              return (
                <Text
                  key={index}
                  nodeID={node.id}
                  text={node.id}
                  x={node.x}
                  y={node.y}
                />
              );
            })}
          </svg>
        </div>
        <h1>Simple Graph Visualizer</h1>
      </div>
    );
  }
}

export default GraphContainer;

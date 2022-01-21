import React from "react";

function Chart({ charts }) {
  // 1 to 7901000
  return (
    <div className="chartContainer">
      {charts.map((chart, index) => {
        const lost = !!(chart.percentage !== "..." && chart.percentage < 0);
        const height = Math.floor((chart.value * 100) / 7901000).toFixed(0);
        return (
          <div
            key={index}
            className={`chart ${lost ? "chart_down" : "chart_up"}`}
            style={{ height: `${height > 100 ? 100 : height}%` }}
          ></div>
        );
      })}
    </div>
  );
}

export default Chart;

import React from "react";

function StockCard({ title, percentage, price }) {
  const lost = !!(percentage !== "..." && percentage < 0);
  return (
    <div className="stockContainer">
      <div className="header">
        <div
          id="arrow"
          className={!lost ? "up" : "down"}
          data-testid="arrow-element"
        />
        <div className="title" data-testid="title-element">
          {title}
        </div>
      </div>
      <div className="info">
        <div
          id="percentage"
          className={lost ? "percentage_down" : "percentage_up"}
          data-testid="percentage-element"
        >
          {!lost && percentage != "..." ? "+" : ""}
          {percentage}
          {percentage != "..." ? "%" : ""}
        </div>
        <div className="price" data-testid="price-element">
          {price}
        </div>
      </div>
    </div>
  );
}
export default StockCard;

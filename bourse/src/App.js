import React, { useEffect, useRef, useState } from "react";
import Chart from "./components/chart/Charts";
import StockCard from "./components/stockCard/StockCard";
import "./index.css";

function App({ intervalTime }) {
  const [stocks, setStocks] = useState([]);
  const [lastResponse, setLastResponse] = useState({
    value: 0,
    name: "",
    percentage: "...",
  });
  const lastValue = useRef(lastResponse.value);
  const stocksRef = useRef(stocks);

  const calculatePrecentage = (lastValue, newValue) => {
    return (
      (lastValue > newValue ? -1 : 1) *
      (
        Math.abs(newValue - lastValue) / (lastValue == 0 ? 1 : lastValue)
      ).toFixed(2)
    );
  };
  const handleResponse = (data) => {
    const new_datus = {
      ...data,
      percentage: calculatePrecentage(lastValue.current, data.value),
    };
    setLastResponse(new_datus);
    const new_data = [
      ...stocksRef.current.slice(
        stocksRef.current.length - 49 < 0 ? 0 : stocksRef.current.length - 49,
        stocksRef.current.length
      ),
      new_datus,
    ];
    stocksRef.current = new_data;
    lastValue.current = data.value;
    setStocks(new_data);
  };

  const sendReq = async () => {
    const req = await fetch("http://localhost:3001/stock");
    const data = await req.json();
    return data;
  };
  const getStock = async () => {
    try {
      handleResponse(await sendReq());
    } catch (e) {}
  };

  const doStartReq = async () => {
    const data = await sendReq();
    setLastResponse({
      ...data,
      percentage: "...",
    });
    const new_data = [
      {
        ...data,
        percentage: "...",
      },
    ];
    stocksRef.current = new_data;
    setLastResponse(new_data[0]);
    lastValue.current = data.value;
    setStocks(new_data);
  };

  useEffect(() => {
    doStartReq();
    setInterval(() => {
      getStock();
    }, intervalTime);
  }, []);

  return (
    <div className="container">
      <StockCard
        title={lastResponse.name}
        percentage={lastResponse.percentage}
        price={lastResponse.value}
      />
      <Chart charts={stocks} />
    </div>
  );
}

export default App;

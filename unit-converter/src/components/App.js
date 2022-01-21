import React, { useState } from "react";
import Select from "./Select";
import Input from "./Input";
import { units } from "../units";

function App() {
  const [result, setResult] = useState("0");
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState(units[0].factor);
  const [to, setTo] = useState(units[0].factor);

  const calculateResult = () => {
    var res = 0;
    if (amount && to && from) res = amount * (+from / +to);
    setResult(res.toFixed(6));
  };

  const onFromChange = (e) => {
    setFrom(e.target.value);
  };

  const onToChange = (e) => {
    setTo(e.target.value);
  };

  const onAmountChange = (e) => {
    setAmount(e.target.value);
  };

  return (
    <>
      <div className="converter-form">
        {/* Input with label "Amount" here */}
        <Input label="Amount" onChange={onAmountChange} />
        <div className="row">
          {/* Selects with labels "From" and "To" here */}
          <Select label="From" items={units} onChange={onFromChange} />
          <Select label="To" items={units} onChange={onToChange} />
          <button onClick={calculateResult}>Convert</button>
        </div>
      </div>

      <div id="result">
        Result is: <span data-testid="result">{result}</span>
      </div>
    </>
  );
}

export default App;

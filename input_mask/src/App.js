import React, { useState } from "react";
import Input from "./Input";
import Cities from "./cities.json";

function App() {
  const [hint, setHint] = useState("");

  const onInputChange = (value) => {
    if (value == "") {
      setHint("");
      return;
    }
    const mathed = Cities.filter((i) => i.startsWith(value));
    if (mathed.length > 0) {
      setHint(mathed[0]);
    } else setHint("");
  };
  return (
    <div>
      <Input
        handleChange={(e) => {
          onInputChange(e.target.value);
        }}
        hint={hint}
      />
    </div>
  );
}

export default App;

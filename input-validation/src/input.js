import React, { useRef, useState } from "react";
import { validate } from "./validators";

const INPUT_STATES = {
  UNTOUCHED: "UNTOUCHED",
  VALID: "VALID",
  INVALID: "INVALID",
};

const Input = (props) => {
  const inputRef = useRef();
  const [state, setState] = useState(INPUT_STATES.UNTOUCHED);
  const setInputState = (valid) => {
    setState(valid ? INPUT_STATES.VALID : INPUT_STATES.INVALID);
  };

  const onBlur = () => {
    if (state === INPUT_STATES.UNTOUCHED)
      setInputState(validate(inputRef.current.value, props.validators));
  };

  const onValueChange = () => {
    if (state !== INPUT_STATES.UNTOUCHED)
      setInputState(validate(inputRef.current.value, props.validators));
  };

  return (
    <div
      className={
        "form-input " +
        (state === INPUT_STATES.INVALID ? "form-input--invalid" : "")
      }
      data-testid="form-input"
    >
      <label htmlFor={props.id}>{props.label}</label>
      <input
        onBlur={onBlur}
        type={props.type}
        id={props.id}
        onChange={onValueChange}
        ref={inputRef}
      />
      {state === INPUT_STATES.INVALID ? <p>{props.errorText}</p> : ""}
    </div>
  );
};

export default Input;

import { useEffect, useRef, useState } from "react";
import Knob from "./Knob";

interface RangeProps {
  min?: number;
  max?: number;
  steps?: number[];
}

export default function Range({ min, max, steps }: RangeProps) {
  const [minVal, setMinVal] = useState();
  const [maxVal, setMaxVal] = useState();
  const [state, setState] = useState({ min: min, max: max });

  const sliderRef = useRef(null);

  const handlers = {
    onChange: (ev: React.ChangeEvent<HTMLInputElement>) => {},
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <input
        type="number"
        value={state.min}
        style={{ width: "3rem" }}
        onChange={(ev) => {
          const value = Number(ev.target.value);
          if (value < min || value > state.max) return;
          setState((state) => ({ ...state, min: value }));
        }}
      />
      <div className="slider" ref={sliderRef}>
        <div className="slider__first" />
        <Knob
          slider={sliderRef}
          state={state}
          max={max}
          min={min}
          setValue={setState}
          isMin={true}
          steps={steps}
        />
        <Knob
          slider={sliderRef}
          state={state}
          max={max}
          min={min}
          setValue={setState}
          steps={steps}
        />
      </div>
      <input
        type="number"
        value={state.max}
        style={{ width: "3rem" }}
        onChange={(ev) => {
          const value = Number(ev.target.value);
          if (value > max || value < state.min) return;
          setState((state) => ({ ...state, max: value }));
        }}
      />
    </div>
  );
}

import { useEffect, useRef, useState } from "react";
import Knob from "./Knob";

interface RangeProps {
  min?: number;
  max?: number;
}

export default function Range({ min, max }: RangeProps) {
  const [currentMin, setCurrentMin] = useState(min);
  const [currentMax, setCurrentMax] = useState(max);

  const sliderRef = useRef(null);

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <input
        type="number"
        value={currentMin}
        readOnly
        style={{ width: "3rem" }}
      />
      <div className="slider" ref={sliderRef}>
        <Knob
          slider={sliderRef}
          max={max}
          min={min}
          setValue={setCurrentMin}
          minLimiter={min}
          maxLimiter={currentMax}
        />
        <div className="slider__first" />
        <Knob
          slider={sliderRef}
          max={max}
          min={min}
          setValue={setCurrentMax}
          minLimiter={currentMin}
          maxLimiter={max}
        />
      </div>
      <input
        type="number"
        value={currentMax}
        readOnly
        style={{ width: "3rem" }}
      />
    </div>
  );
}

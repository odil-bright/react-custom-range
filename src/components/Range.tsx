import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { InputLabel } from "./InputLabel";
import Slider from "./Slider";
import { RangeCalculationsProvider } from "@/context/RangeCalculationsContext";
import { handlers } from "@/services/calculations";

export interface RangeProps {
  min?: number;
  max?: number;
  steps?: number[];
}

export interface RangeState {
  min: number;
  max: number;
}

export interface RangeChildrenProps {
  setState: Dispatch<SetStateAction<RangeState>>;
  state: RangeState;
  isMin?: boolean;
  toEdit?: boolean;
  slider?: React.MutableRefObject<any>;
  dimensions?: { width: number; height: number };
}

export default function Range({ min, max, steps }: RangeProps) {
  const [state, setState] = useState<RangeState>({ min, max });

  return (
    <RangeCalculationsProvider handlers={handlers}>
      <div className="range">
        <InputLabel
          setState={setState}
          state={state}
          min={min}
          max={max}
          isMin={true}
          toEdit={!steps}
        />
        <Slider
          steps={steps}
          setState={setState}
          state={state}
          min={min}
          max={max}
        />
        <InputLabel
          setState={setState}
          state={state}
          min={min}
          max={max}
          toEdit={!steps}
        />
      </div>
    </RangeCalculationsProvider>
  );
}

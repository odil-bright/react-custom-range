import { mapRangeValue } from "@/common/utils";
import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

interface KnobProps {
  slider: MutableRefObject<any>;
  setValue: Dispatch<SetStateAction<{ min: number; max: number }>>;
  state: { min: number; max: number };
  min?: number;
  max?: number;
  isMin?: boolean;
  steps?: number[];
}

export default function Knob({
  isMin = false,
  min,
  max,
  state,
  slider,
  setValue,
  steps,
}: KnobProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [hasRun, setHasRun] = useState(false);
  const knob = useRef(null);

  const handlers = {
    onMouseMove: (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (!isDragging) return;
      const value = utils.getRangeValue(ev.pageX);
      if ((isMin && value > state.max) || (!isMin && value < state.min)) return;
      if (!steps) {
        knob.current.style.left = utils.getXPos(ev.pageX) + "px";
        utils.setValue(value);
      } else {
        knob.current.style.left = utils.getXPos(ev.pageX) + "px";
        const step = utils.getStep();
        if (hasRun) utils.setValue(steps[step]);
      }
    },
  };

  const utils = {
    setValue: (value: number) => {
      if (isMin) {
        setValue((state) => ({ ...state, min: value }));
      } else setValue((state) => ({ ...state, max: value }));
    },
    getRangeValue: (currentPos: number | void) => {
      if (!currentPos) return;
      return utils.getValueFromXPos(currentPos);
    },
    getValueFromXPos: (currentPos: number) => {
      const sliderBoundingClientRect = slider.current?.getBoundingClientRect();
      const currentRangeMin = sliderBoundingClientRect.left;
      const currentRangeMax = sliderBoundingClientRect.right;
      const value = mapRangeValue(
        currentPos,
        { min: currentRangeMin, max: currentRangeMax },
        { min, max }
      );
      return value <= max ? Math.round(value) : max;
    },
    getXPosFromValue: () => {
      const sliderBoundingClientRect = slider.current?.getBoundingClientRect();
      const currentRangeMin = 0;
      const currentRangeMax =
        sliderBoundingClientRect.width -
        knob.current.getBoundingClientRect().width;
      const value = isMin ? state.min : state.max;
      const xPos = mapRangeValue(
        value,
        { min, max },
        { min: currentRangeMin, max: currentRangeMax }
      );
      return xPos;
    },
    getXPos: (pageX: number): number | void => {
      const sliderBoundingClientRect = slider.current?.getBoundingClientRect();
      const knobBoundingClientRect = knob.current.getBoundingClientRect();
      const xPosMin = pageX - knobBoundingClientRect.width / 2;
      if (
        sliderBoundingClientRect.left <= xPosMin &&
        sliderBoundingClientRect.right >= pageX
      ) {
        const xPos =
          pageX -
          sliderBoundingClientRect.left -
          knobBoundingClientRect.width / 2;
        return xPos;
      }
    },
    getStep() {
      const knobBoundingClientRect = knob.current.getBoundingClientRect();
      const sliderBoundingClientRect = slider.current.getBoundingClientRect();
      const knobXPos = knobBoundingClientRect.x - sliderBoundingClientRect.left;

      if (knobXPos + 5 < utils.getXPosFromValue()) {
        const currentStepIndex = steps.findIndex((st) => {
          return st == (isMin ? state.min : state.max);
        });
        setHasRun(true);
        return currentStepIndex - 1 < 0 ? 0 : currentStepIndex - 1;
      } else if (knobXPos - 5 > utils.getXPosFromValue()) {
        const currentStepIndex = steps.findIndex((st) => {
          return st == (isMin ? state.min : state.max);
        });
        setHasRun(true);
        return currentStepIndex + 1 > steps.length - 1
          ? steps.length
          : currentStepIndex + 1;
      }
    },
  };

  useEffect(() => {
    if (isDragging && !steps) return;
    knob.current.style.left = utils.getXPosFromValue() + "px";
    if (steps) {
      setHasRun(false);
    }
  }, [knob, state]);

  return (
    <div
      className="slider__knob"
      ref={knob}
      onMouseMove={handlers.onMouseMove}
      onMouseDown={() => {
        knob.current.style.zIndex = 1;
        setIsDragging(true);
      }}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => {
        knob.current.style.zIndex = 0;
        setIsDragging(false);
      }}
    />
  );
}

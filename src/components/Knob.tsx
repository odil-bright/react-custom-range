import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useRef,
  useState,
} from "react";

interface KnobProps {
  slider: MutableRefObject<any>;
  setValue: Dispatch<SetStateAction<number>>;
  minLimiter: number;
  maxLimiter: number;
  min?: number;
  max?: number;
}

export default function Knob({
  min,
  max,
  minLimiter,
  maxLimiter,
  slider,
  setValue,
}: KnobProps) {
  const [isDragging, setIsDragging] = useState(false);
  const knob = useRef(null);

  const handlers = {
    onMouseMove: (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (!isDragging) return;
      const value = utils.getRangeValue(ev.pageX);
      if (value > maxLimiter || value < minLimiter) return;
      knob.current.style.left = utils.setKnobPosition(ev.pageX) + "px";
      setValue(value);
    },
  };

  const utils = {
    getRangeValue: (currentPos: number | void) => {
      if (!currentPos) return;
      return utils.getValueFromPos(currentPos);
    },
    getValueFromPos: (currentPos: number) => {
      const sliderBoundingClientRect = slider.current?.getBoundingClientRect();
      const currentRangeMin = sliderBoundingClientRect.left;
      const currentRangeMax = sliderBoundingClientRect.right;
      const posXPercent =
        (currentPos - currentRangeMin) / (currentRangeMax - currentRangeMin);
      const rangeValue = posXPercent * (max - min) + min;
      return rangeValue <= max ? Math.round(rangeValue) : max;
    },
    setKnobPosition: (pageX: number): number | void => {
      const sliderBoundingClientRect = slider.current?.getBoundingClientRect();
      const xPosMin = pageX - knob.current.getBoundingClientRect().width / 2;
      if (
        sliderBoundingClientRect.left <= xPosMin &&
        sliderBoundingClientRect.right >= pageX
      ) {
        return (
          pageX -
          sliderBoundingClientRect.left -
          knob.current.getBoundingClientRect().width / 2
        );
      }
    },
  };

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

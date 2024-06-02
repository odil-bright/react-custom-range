import { Range } from "@/models/entities";

export function mapRangeValue(currentPos: number, originRange: Range, targetRange: Range) {
  const posXPercent = (currentPos - originRange.min) / (originRange.max - originRange.min);
  const rangeValue = posXPercent * (targetRange.max - targetRange.min) + targetRange.min;
  return rangeValue;
}
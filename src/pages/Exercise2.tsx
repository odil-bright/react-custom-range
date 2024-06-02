import Range from "@/components/Range";
import { useLoaderData } from "react-router-dom";

const Exercise2 = () => {
  const { steps } = useLoaderData() as { steps: number[] };

  return (
    <>
      <h1>Exercise two</h1>
      {steps && (
        <Range min={steps[0]} max={steps[steps.length - 1]} steps={steps} />
      )}
    </>
  );
};

export default Exercise2;

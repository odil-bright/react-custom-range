import Range from "@/components/Range";
import { getPriceRange } from "@/services/priceData";
import { useEffect, useState } from "react";

const Exercise1 = () => {
  const [data, setData] = useState();

  useEffect(() => {
    getPriceRange().then((result) => {
      if (result && result.range) {
        setData(result.range);
      } else {
        throw new Error(result.statusText);
      }
    });
  }, []);

  return (
    <>
      <h1>Exercise 1</h1>
      {data && <Range min={data[0]} max={data[1]} />}
    </>
  );
};

export default Exercise1;

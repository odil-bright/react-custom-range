import Range from "@/components/Range";
import ApiOperationsContext from "@/context/ApiOperationsContext";
import { getPriceRange } from "@/services/priceData";
import { useContext, useEffect, useState } from "react";

const Exercise1 = () => {
  const [data, setData] = useState();
  const { operations } = useContext(ApiOperationsContext);

  useEffect(() => {
    operations.getPriceRange().then((result) => {
      if (result && result.range) {
        setData(result.range);
      } else {
        throw new Error(result.statusText);
      }
    });
  }, []);

  return (
    <>
      <h1>Exercise one</h1>
      {data && <Range min={data[0]} max={data[1]} />}
    </>
  );
};

export default Exercise1;

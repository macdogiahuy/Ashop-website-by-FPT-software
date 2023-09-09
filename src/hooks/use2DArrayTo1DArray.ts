import { useEffect, useState } from "react";

export function use2DArrayTo1DArray<T>(array2d?: T[][]) {
  const [data, setData] = useState<T[]>();
  useEffect(() => {
    setData((array2d ?? []).flat());
  }, [array2d]);
  return data;
}

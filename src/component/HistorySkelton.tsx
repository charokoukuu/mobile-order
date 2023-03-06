import * as React from "react";
import Skeleton from "@mui/material/Skeleton";

interface Props {
  maxItem: number;
}
export default function HistorySkeleton({ maxItem }: Props) {
  return (
    <div>
      {new Array(maxItem).fill(0).map((_, i) => (
        <div key={i}>
          <Skeleton
            className="m-auto mt-3 rounded-xl"
            variant="rectangular"
            width={"95%"}
            height={"7rem"}
          />
        </div>
      ))}
    </div>
  );
}

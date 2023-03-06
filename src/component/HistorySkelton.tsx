import * as React from "react";
import Skeleton from "@mui/material/Skeleton";

interface Props {
  maxItem: number;
}
export default function HistorySkeleton({ maxItem }: Props) {
  return (
    <div>
      {new Array(maxItem).fill(0).map((_, i) => (
        <div
          key={i}
          className="mx-auto w-[95%] rounded-lg px-3 py-2 shadow-[0px_3px_6px_rgba(0,0,0,0.2)]"
        >
          <div className="flex justify-end">
            <Skeleton variant="text" width={150} height={30} animation="wave" />
          </div>
          <div className="flex justify-between">
            <Skeleton variant="text" animation="wave" width={150} height={50} />
            <Skeleton variant="text" animation="wave" width={50} />
            <Skeleton variant="text" animation="wave" width={80} />
          </div>
          <div className="flex justify-between">
            <Skeleton variant="text" animation="wave" width={80} />
            <Skeleton variant="text" animation="wave" width={150} />
          </div>
        </div>
      ))}
    </div>
  );
}

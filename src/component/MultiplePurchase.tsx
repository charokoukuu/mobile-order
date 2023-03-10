import { Fab, Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import classNames from "classnames";
import { useContext } from "react";
import { menuData } from "./DetailDialog";
interface Props {
  purchaseCount: number;
  setPurchaseCount: (quantity: number) => void;
  initialValue?: number;
}

export const MultiplePurchase = ({
  purchaseCount,
  setPurchaseCount,
  initialValue: initialValue,
}: Props) => {
  const value = useContext(menuData);
  return (
    <>
      <p className="japanese_L text-2xl font-bold text-runticketGrayText">
        {purchaseCount}個
      </p>
      <Grid container alignItems="center">
        {!initialValue && (
          <Grid item xs={3}>
            <Fab
              size="small"
              onClick={() => {
                if (purchaseCount > 1) {
                  setPurchaseCount(purchaseCount - 1);
                }
              }}
              className={classNames("shadow-none", {
                "bg-buttonGray ": purchaseCount === 1,
                "bg-buttonBlue": purchaseCount >= 2,
              })}
            >
              <RemoveIcon className="text-white" />
            </Fab>
          </Grid>
        )}

        <Grid item xs={!initialValue ? 6 : 12}>
          <p
            className={classNames(
              "japanese_B text-[3rem] leading-[3rem] text-runticketBlue",
              {
                "text-[2.5rem]":
                  (value.menu?.price * purchaseCount).toString().length > 4,
              }
            )}
          >
            {"¥" + (value.menu?.price || 0) * purchaseCount}
          </p>
        </Grid>
        {!initialValue && (
          <Grid item xs={3}>
            <Fab
              size={"small"}
              onClick={() => {
                setPurchaseCount(purchaseCount + 1);
              }}
              className="bg-buttonRed shadow-none"
            >
              <AddIcon className="text-white" />
            </Fab>
          </Grid>
        )}
      </Grid>
    </>
  );
};

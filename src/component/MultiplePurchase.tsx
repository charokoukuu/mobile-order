import { Fab, Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import classNames from "classnames";
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
  return (
    <Grid container>
      {!initialValue && (
        <Grid item xs={3}>
          <Fab
            size="small"
            onClick={() => {
              if (purchaseCount > 1) {
                setPurchaseCount(purchaseCount - 1);
              }
            }}
            className={classNames("bg-buttonGray shadow-none", {
              "!bg-buttonBlue": purchaseCount > 1,
            })}
          >
            <RemoveIcon className="text-white" />
          </Fab>
        </Grid>
      )}
      <Grid item xs={6}>
        <p className="japanese_L text-2xl text-runticketGrayText">
          {purchaseCount}個
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
  );
};

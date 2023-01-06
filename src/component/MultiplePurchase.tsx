import { Fab, Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
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
            style={{
              backgroundColor: purchaseCount > 1 ? "#1D98F2" : "#707070",
              boxShadow: "none",
            }}
          >
            <RemoveIcon style={{ color: "white" }} />
          </Fab>
        </Grid>
      )}
      <Grid item xs={6}>
        <p className="japanese_L text-2xl">{purchaseCount}個</p>
      </Grid>
      {!initialValue && (
        <Grid item xs={3}>
          <Fab
            size={"small"}
            onClick={() => {
              setPurchaseCount(purchaseCount + 1);
            }}
            style={{
              backgroundColor: "#F25F1D",
              boxShadow: "none",
            }}
          >
            <AddIcon style={{ color: "white" }} />
          </Fab>
        </Grid>
      )}
    </Grid>
  );
};

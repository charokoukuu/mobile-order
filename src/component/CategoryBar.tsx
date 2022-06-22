import { Button, Grid } from "@mui/material";
import { CategoryProp } from "../Menu";
interface CategoryBarProps {
  category: CategoryProp[];
  onClick: (category: string) => void;
}


export const CategoryBar = (props: CategoryBarProps) => {

  return (
    <div>
      <Grid container>
        {props.category.map((e, i) => {
          return (
            <Grid key={i} item xs={4}>
              <Button fullWidth onClick={() => {
                props.onClick(e);
              }}>{e}</Button>
            </Grid>

          )
        })
        }

      </Grid>
    </div>
  )
}
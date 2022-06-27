import { Button, Grid } from "@mui/material";
import { useState } from "react";
import { CategoryProp } from "../Menu";
import "../App.css";
interface CategoryBarProps {
  category: CategoryProp[];
  onClick: (category: string) => void;
}


export const CategoryBar = (props: CategoryBarProps) => {
  const [index, setIndex] = useState<number>(0);
  return (
    <div style={{ margin: "3vw 0" }}>
      <Grid container>
        {props.category.map((e, i) => {
          return (
            <Grid key={i} item xs={4}>
              <Button fullWidth onClick={() => {
                props.onClick(e);
                setIndex(i);
              }}><div className="japanese_B" style={{ color: index === i ? "#006C9B" : "#838383" }}>{e}</div></Button>
              {index === i && <div style={{ backgroundColor: "rgba(0,0,0,0.5)", width: "17vw", height: "1vw", textAlign: "center", marginLeft: "8.5vw" }}></div>}
            </Grid>

          )
        })
        }

      </Grid>
    </div>
  )
}
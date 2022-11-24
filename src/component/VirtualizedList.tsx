import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import { Button } from "@mui/material";
import { MenuData } from "../types";

interface VirtualizedListProps {
  menu: MenuData[];
  totalPrice: number;
  onDelete: (e: MenuData, i: number) => void;
}
function renderRow(props: ListChildComponentProps) {
  const { index, data } = props;

  return (
    <ListItem
      style={{
        backgroundColor: "rgba(0,0,0,0.7)",
        color: "#ffffff",
        margin: "10px 0",
        borderRadius: "5px",
        padding: "10px 0",
      }}
      key={index}
      component="div"
      disablePadding
    >
      <ListItemButton>
        <div className="japanese_L" style={{ color: "white" }}>
          {data.menu[index].title}
        </div>
      </ListItemButton>
      <div className="japanese_L" style={{ color: "white" }}>
        ¥{data.menu[index].price}
      </div>
      <Button onClick={() => data.onDelete(data.menu[index], index)}>
        <div className="japanese_R" style={{ color: "red" }}>
          削除
        </div>
      </Button>
    </ListItem>
  );
}

export default function VirtualizedList(props: VirtualizedListProps) {
  return (
    <FixedSizeList
      itemData={props}
      height={300}
      width={360}
      itemSize={46}
      itemCount={props.menu.length}
      overscanCount={5}
    >
      {renderRow}
    </FixedSizeList>
  );
}

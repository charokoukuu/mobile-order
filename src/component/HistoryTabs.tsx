import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

interface Props {
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
}
export default function HistoryTabs({ value, setValue }: Props) {
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="全て" />
        <Tab label="受取済み" />
        <Tab label="未受取" />
        <Tab label="エラー" />
      </Tabs>
    </Box>
  );
}

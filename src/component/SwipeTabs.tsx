import * as React from "react";
import SwipeableViews from "react-swipeable-views";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { FoodCard } from "./FoodCard";
import { Grid } from "@mui/material";
import { MenuData } from "../types";
import { CategoryProp } from "../views/Menu";
import styled from "@emotion/styled";

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

interface SwipeTabsProps {
  menu: MenuData[];
  category: CategoryProp[];
  setChosenMenu: (e: MenuData) => void;
  setDetailDialogOpen: (e: boolean) => void;
  appBarHeight?: number;
}

interface FilterMenuDataProps extends SwipeTabsProps {
  categoryMode: string;
}
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <div>{children}</div>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function SwipeTabs(props: SwipeTabsProps) {
  const [value, setValue] = React.useState(0);
  const menuCategoryArray: CategoryProp[] = props.category;
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  return (
    <div>
      <SwipeTabsWapper appBarHeight={props.appBarHeight || 56}>
        <Tabs
          className="pointer-events-auto bg-white text-white"
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          {menuCategoryArray.map((e, i) => {
            return <Tab key={e} label={e} {...a11yProps(i)} />;
          })}
        </Tabs>
      </SwipeTabsWapper>
      <SwipeableViews
        className="mx-auto max-w-[730px] py-1"
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        {menuCategoryArray.map((category: string, index: number) => {
          return (
            <TabPanel value={value} index={index} key={index}>
              <FilterMenuData
                menu={props.menu}
                categoryMode={category}
                setChosenMenu={props.setChosenMenu}
                setDetailDialogOpen={props.setDetailDialogOpen}
                category={props.category}
              />
            </TabPanel>
          );
        })}
      </SwipeableViews>
    </div>
  );
}

const FilterMenuData = (props: FilterMenuDataProps) => {
  return (
    <Grid padding={1.5} container spacing={1.5} justifyContent="center">
      <Spacer appBarHeight={props.appBarHeight || 56} mode={"menu"} />
      {props.menu
        .filter(
          (item: MenuData) =>
            item.category === props.categoryMode && item.isStatus
        )
        .map((menu: MenuData, index: number) => {
          return (
            <Grid item key={index} xs={6} sm={4}>
              <FoodCard
                menu={menu as MenuData}
                deleteButton={false}
                onClick={function (): void {
                  menu.isBigSize === true &&
                    props.setChosenMenu(menu as MenuData);
                  menu.isBigSize === false &&
                    props.setChosenMenu(menu as MenuData);
                  props.setDetailDialogOpen(true);
                }}
              />
            </Grid>
          );
        })}
    </Grid>
  );
};

const SwipeTabsWapper = styled.div`
  position: fixed;
  top: ${(props: { appBarHeight: number }) => props.appBarHeight}px;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
`;

const Spacer = styled.div`
  width: 100%;
  height: ${(props: { appBarHeight: number; mode: "menu" | "history" }) =>
    props.appBarHeight + (props.mode === "menu" ? 50 : 0)}px;
`;

export { Spacer };

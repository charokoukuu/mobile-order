import * as React from "react";
import SwipeableViews from "react-swipeable-views";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { FoodCard } from "./FoodCard";
import { Grid } from "@mui/material";
import { DocumentData } from "firebase/firestore";
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
  menu: DocumentData[];
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
          style={{
            backgroundColor: "#ffffff",
            color: "white",
            pointerEvents: "auto",
          }}
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
      <SwipeableViews index={value} onChangeIndex={handleChangeIndex}>
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
    <Grid container>
      <Spacer appBarHeight={props.appBarHeight || 56} mode={"menu"} />
      {props.menu
        .filter(
          (item: DocumentData) =>
            item.category === props.categoryMode && item.isStatus
        )
        .map((menu: DocumentData, index: number) => {
          return (
            <Grid
              item
              key={index}
              style={{
                margin: "3% auto",
              }}
            >
              <FoodCard
                menu={menu as MenuData}
                deleteButton={false}
                onClick={function (): void {
                  menu.isBigSize === true &&
                    props.setChosenMenu({
                      title: menu.title,
                      description: menu.description,
                      price: menu.price,
                      id: menu.id,
                      image: menu.image,
                      category: menu.category,
                      isBigSize: menu.isBigSize,
                      bigSizeDiffPrice: menu.bigSizeDiffPrice,
                      isStatus: menu.isStatus,
                      isSale: menu.isSale,
                    });
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

import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { FoodCard } from "./FoodCard";
import { Grid } from "@mui/material";
import { MenuData } from "../types";
import { CategoryProp } from "../views/Menu";
import styled from "@emotion/styled";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperCore } from "swiper";
import "swiper/css";
import { useMemo, useRef, useState } from "react";

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
  const menuCategoryArray: CategoryProp[] = props.category;
  const [value, setValue] = useState(0);
  const swiperRef = useRef<SwiperCore | null>(null);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    swiperRef.current?.slideTo(newValue);
  };
  const onSwiper = (currentSwiper: SwiperCore) => {
    const swiperInstance = currentSwiper;
    swiperRef.current = swiperInstance;
  };
  const onSlideChange = (currentSwiper: SwiperCore) => {
    setValue(currentSwiper.activeIndex);
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
            return <Tab key={i} label={e} {...a11yProps(i)} />;
          })}
        </Tabs>
      </SwipeTabsWapper>
      <Swiper
        simulateTouch={false}
        spaceBetween={50}
        slidesPerView={1}
        onSwiper={onSwiper}
        onSlideChange={onSlideChange}
      >
        {menuCategoryArray.map((category: string, index: number) => {
          return (
            <SwiperSlide key={index}>
              <TabPanel value={value} index={index}>
                <FilterMenuData
                  menu={props.menu}
                  categoryMode={category}
                  setChosenMenu={props.setChosenMenu}
                  setDetailDialogOpen={props.setDetailDialogOpen}
                  category={props.category}
                />
              </TabPanel>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

const FilterMenuData = (props: FilterMenuDataProps) => {
  const filteredMenu = useMemo(() => {
    return props.menu.filter(
      (item: MenuData) => item.category === props.categoryMode
    );
  }, [props.categoryMode, props.menu]);
  return (
    <div className="menu_box">
      <Spacer appBarHeight={props.appBarHeight || 56} mode={"menu"} />
      <Grid padding={1.5} container spacing={1.5} justifyContent="start">
        {filteredMenu.map((menu: MenuData, index: number) => {
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
    </div>
  );
};

const SwipeTabsWapper = styled.div`
  position: fixed;
  top: ${(props: { appBarHeight: number }) => props.appBarHeight}px;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  pointer-events: none;
`;

const Spacer = styled.div`
  width: 100%;
  height: ${(props: { appBarHeight: number; mode: "menu" | "history" }) =>
    props.appBarHeight + (props.mode === "menu" ? 50 : 0)}px;
`;

export { Spacer };

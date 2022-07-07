import * as React from 'react';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { FoodCard } from './FoodCard';
import { Grid } from '@mui/material';
import { DocumentData } from 'firebase/firestore';
import { MenuData } from '../Interface';
import { CategoryProp } from '../Menu';
const menuCategoryArray: CategoryProp[] = ["メイン", "ドリンク", "トッピング"];

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}
interface FilterMenuDataProps {
  menu: DocumentData[];
  categoryMode: string;
  setChosenMenu: (e: MenuData) => void;
  setDetailDialogOpen: (e: boolean) => void;
}

interface SwipeTabsProps {
  menu: DocumentData[];
  setChosenMenu: (e: MenuData) => void;
  setDetailDialogOpen: (e: boolean) => void;
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
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export default function SwipeTabs(props: SwipeTabsProps) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  return (
    <Box sx={{ bgcolor: 'background.paper' }}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Item One" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        {
          menuCategoryArray.map((category, index) => {
            return (
              <TabPanel key={category} value={value} index={index}>
                <FilterMenuData menu={props.menu} categoryMode={category} setChosenMenu={props.setChosenMenu} setDetailDialogOpen={props.setDetailDialogOpen} />
              </TabPanel>
            )
          })
        }
      </SwipeableViews>
    </Box>
  );
}

const FilterMenuData = (props: FilterMenuDataProps) => {
  return (
    <Grid container >
      {props.menu.filter((item: any) => item.category === props.categoryMode && item.isStatus).map((menu: any, index: number) => {
        return (
          <Grid item key={index} style={{
            margin: "3vw auto"
          }}>
            <FoodCard menu={menu} onClick={function (): void {
              menu.isBigSize === true && props.setChosenMenu({
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
              menu.isBigSize === false && props.setChosenMenu(menu);
              props.setDetailDialogOpen(true);
            }} />

          </Grid>
        )
      }
      )}
    </Grid>
  )
}
import { Alert, Grid } from "@mui/material";
import { DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Order } from "./component/Order";
import { CategoryBar } from "./component/CategoryBar";
import { DetailDialog } from "./component/DetailDialog";
import { FoodCard } from "./component/FoodCard";
import { MenuData } from "./Interface";
import { GetAllData, OrderSubmit } from "./SubmitGet";
import { Cart } from "./component/Cart";
import { LoadingAnimation } from "./component/LoadingAnimation";
import axios from "axios";
import { auth } from "./Firebase";
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SwipeTabs from "./component/SwipeTabs";

const apiUrl = "https://pocketmansion.tk/"
// const apiUrl = "http://localhost:3001/"
const hostUrl = "http://localhost:3000";
// const hostUrl = "https://mobile-order-4d383.web.app";
export type CategoryProp = "メイン" | "ドリンク" | "トッピング";
const menuCategoryArray: CategoryProp[] = ["メイン", "ドリンク", "トッピング"];
interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: number;
    value: number;
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

// type Mode = "menu" | "complete";
export const Menu = () => {

    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index: number) => {
        setValue(index);
    };
    const [categoryMode, setCategoryMode] = useState<CategoryProp>("メイン");
    // const [mode, setMode] = useState<Mode>("menu");
    const [detailDialogOpen, setDetailDialogOpen] = useState(false);
    const [menu, setMenu] = useState<DocumentData[]>([]);
    const [chosenMenu, setChosenMenu] = useState<MenuData | undefined>();
    const [orderData, setOrderData] = useState<MenuData[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [orderDialog, setOrderDialog] = useState<boolean>(false);
    const [isGetMenu, setIsGetMenu] = useState<boolean>(false);
    useEffect(() => {
        // window.location.href = "/register";
        (async () => {
            setMenu(await GetAllData("menu"));
            setIsGetMenu(true);
        })();
        console.log(navigator.userAgent);
    }, []);

    useEffect(() => {
        orderData.length === 0 && setOrderDialog(false);
    }, [orderData.length]);

    return (
        <div style={{ position: "relative" }}>
            {isGetMenu ? <div>
                {/* <Alert severity="error" onClick={() => {
                    window.location.href = "/history";
                }}><div className="japanese_R">未受け取りの注文があります (詳細)</div></Alert> */}
                {/* <CategoryBar category={["メイン", "ドリンク", "トッピング"]} onClick={function (category: CategoryProp): void {
                    setCategoryMode(category)
                }} /> */}

                <SwipeTabs />
                <AppBar position="static">
                    <Tabs
                        style={{
                            backgroundColor: "#fff",
                            color: "#000",
                            fontSize: "1.5rem",
                        }}
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="inherit"
                        variant="fullWidth"
                        aria-label="full width tabs example"
                    >
                        {
                            menuCategoryArray.map((category, index) => {
                                return (
                                    <Tab key={category} label={category} {...a11yProps(index)} />
                                )
                            })
                        }

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
                                    <FilterMenuData menu={menu} categoryMode={category} setChosenMenu={setChosenMenu} setDetailDialogOpen={setDetailDialogOpen} />
                                </TabPanel>
                            )
                        })
                    }
                </SwipeableViews>

                <div style={{ marginBottom: "13vw" }}>
                    <Order open={orderDialog} onDelete={(e, i) => {
                        setOrderData(orderData.filter((_, index) => index !== i))
                        setTotalPrice(totalPrice - e.price)
                    }} orderData={orderData} totalPrice={totalPrice} onPrev={() => {
                        setOrderDialog(false);
                    }} onNext={async (payment) => {
                        const orderId = await OrderSubmit({
                            user: {
                                uid: auth.currentUser?.uid || "",
                                studentName: auth.currentUser?.displayName || "",
                                mailAddress: auth.currentUser?.email || "",
                            },
                            totalPrice: totalPrice,
                            menu: orderData
                        })
                        if (payment === "paypay") {
                            const resData = await axios.post(apiUrl + "paypay?orderId=" + orderId + "&url=" + hostUrl,
                                {
                                    amount: totalPrice,
                                    orderDescription: "Test Payment" // 場合によってはここも動的に変更すると良いかも
                                })
                            window.location.href = resData.data.data.url;
                        } else if (payment === "stripe") {
                            const resData = await axios.post("http://localhost:4242/create-checkout-session",
                                {
                                    orderData: orderData,
                                    orderId: orderId,
                                }
                            )
                            window.location.href = resData.data;
                        }
                    }}

                    />
                </div>
                <DetailDialog open={detailDialogOpen} menu={chosenMenu} onNext={(e) => {
                    (e !== undefined) && setOrderData([...orderData, e]);
                    (e !== undefined) && setTotalPrice(totalPrice + e.price);
                    setDetailDialogOpen(false);
                }} onPrev={() => {
                    setDetailDialogOpen(false);
                }} />
                {orderData.length !== 0 && <Cart onClick={() => {
                    setOrderDialog(true);
                }} totalOrderItemsCount={orderData.length} totalPrice={totalPrice} />
                }
            </div> :
                <LoadingAnimation />
            }
        </div>
    );
};

interface FilterMenuDataProps {
    menu: DocumentData[];
    categoryMode: string;
    setChosenMenu: (e: MenuData) => void;
    setDetailDialogOpen: (e: boolean) => void;
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
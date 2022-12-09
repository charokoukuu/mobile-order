// anyを許容するdisable,後でPayPayやStripeのAPIのデータ構造調べて型定義する
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Dialog, Grid } from "@mui/material";
import { MenuData } from "../types";
import "../views/styles/App.css";
import { createContext, useContext, useEffect, useState } from "react";
import { MultiplePurchase } from "./MultiplePurchase";
const menuData = createContext<any>(null);
let baseMenuData: MenuData;
interface DetailDialogProps {
  open: boolean;
  menu: MenuData | undefined;
  topping?: MenuData[];
  isAddCart: boolean;
  onNext?: (menu: MenuData | undefined, purchaseCount: number) => void;
  onDelete?: () => void;
  onPrev: () => void;
  initialPurchaseCount?: number;
}

export const DetailDialog = (props: DetailDialogProps) => {
  const [menu, setMenu] = useState<MenuData | undefined>(props.menu);
  const value = { menu, setMenu };
  const [purchaseCount, setPurchaseCount] = useState<number>(1);
  useEffect(() => {
    setMenu(props.menu);
    baseMenuData = { ...(props.menu as MenuData) };
  }, [props.menu]);
  useEffect(() => {
    setPurchaseCount(props.initialPurchaseCount || 1);
  }, [props.initialPurchaseCount]);
  return (
    <div>
      <menuData.Provider value={value}>
        <Dialog
          open={props.open}
          onClose={props.onPrev}
          PaperProps={{
            style: {
              backgroundColor: "#EFEFEF",
              borderRadius: "13px",
              width: "900px",
            },
          }}
        >
          <div>
            <MaterialMenuCard />
            {props.menu?.isBigSize && props.isAddCart && (
              <MaterialSizeSelectCard />
            )}
            <MultiplePurchase
              initalValue={props.initialPurchaseCount}
              purchaseCount={purchaseCount}
              setPurchaseCount={setPurchaseCount}
            />
            <div
              className="center themeFontColor"
              style={{ margin: "1% 0", fontSize: "3.5rem" }}
            >
              {(value.menu?.price || 0) * purchaseCount}
              <span style={{ fontSize: "1.5rem" }}> 円</span>
            </div>
            {props.isAddCart && (
              <div className="center">
                {" "}
                <Button
                  style={{
                    width: "90%",
                    backgroundColor: "#006C9B",
                    height: "5vh",
                    borderRadius: "11px",
                  }}
                  variant="contained"
                  onClick={() => {
                    if (!props.initialPurchaseCount)
                      setTimeout(() => setPurchaseCount(1), 200);
                    props.onNext && props.onNext(value.menu, purchaseCount);
                  }}
                >
                  カートに追加
                </Button>
              </div>
            )}
            {!props.isAddCart && (
              <div className="center">
                {" "}
                <Button
                  style={{
                    width: "90%",
                    backgroundColor: "#DB1812",
                    height: "5vh",
                    borderRadius: "11px",
                  }}
                  variant="contained"
                  onClick={() => {
                    props.onDelete && props.onDelete();
                  }}
                >
                  カートから削除
                </Button>
              </div>
            )}
            <div
              className="center"
              style={{ textDecoration: "underline #006C9B", margin: "2% 0" }}
            >
              <Button
                style={{ color: "#006C9B" }}
                onClick={() => {
                  if (!props.initialPurchaseCount)
                    setTimeout(() => setPurchaseCount(1), 200);
                  props.onPrev();
                }}
              >
                閉じる
              </Button>
            </div>
          </div>
        </Dialog>
      </menuData.Provider>
    </div>
  );
};

const MaterialMenuCard = () => {
  const { menu } = useContext(menuData);

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        margin: "3% 3%",
        boxShadow: "0px 3px 6px #00000029",
        borderRadius: "13px",
      }}
    >
      <div style={{ textAlign: "center", margin: "2% 0", fontSize: "2rem" }}>
        <div
          className="japanese_R"
          style={{ padding: "5% 0", fontSize: "30px" }}
        >
          {menu?.title}
        </div>
        <div>
          <img
            style={{
              width: "90%",
              maxWidth: "300px",
              borderRadius: "10px",
              margin: "1% 0",
            }}
            src={menu?.image || ""}
            alt="menu"
          />
        </div>
        <div
          className="japanese_L"
          style={{
            textAlign: "center",
            fontSize: "15px",
            width: "80%",
            margin: "auto",
            paddingBottom: "7%",
          }}
        >
          {menu?.description}
        </div>
      </div>
    </div>
  );
};
const MaterialSizeSelectCard = () => {
  const { menu } = useContext(menuData);

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        margin: "0% 3%",
        boxShadow: "0px 3px 6px #00000029",
        borderRadius: "13px",
      }}
    >
      <div style={{ textAlign: "center", margin: "0% 0", fontSize: "2rem" }}>
        <div style={{ padding: "5% 0", margin: "5% 0" }}>
          {menu !== undefined && <SelectedCard />}
        </div>
      </div>
    </div>
  );
};

const SelectedCard = () => {
  const [isChecked, setIsChecked] = useState(false);
  const { setMenu } = useContext(menuData);
  useEffect(() => {
    setMenu((prevState: any) => ({
      ...prevState,
      price: isChecked
        ? baseMenuData.price + baseMenuData.bigSizeDiffPrice
        : baseMenuData.price,
      title: isChecked ? baseMenuData.title + " (大)" : baseMenuData.title,
    }));
  }, [isChecked, setMenu]);
  const defaultButton = {
    background: "#006C9B 0% 0% no-repeat padding-box",
    boxShadow: "inset 5px 5px 5px #00000029",
    color: "#ffffff",
    width: "135px",
    height: "57px",
    borderRadius: "17px",
    border: "none",
    fontSize: "1rem",
  };
  const selectedButton = {
    ...defaultButton,
    background: "#848484 0% 0% no-repeat padding-box",
    boxShadow: "none",
  };

  return (
    <Grid container>
      <Grid item xs={6}>
        <Button
          onClick={() => {
            setIsChecked(false);
          }}
          style={!isChecked ? { ...defaultButton } : { ...selectedButton }}
          variant="contained"
        >
          <div className="japanese_R" style={{ color: "#ffffff" }}>
            並
          </div>
        </Button>
      </Grid>
      <Grid item xs={6}>
        <Button
          onClick={() => {
            setIsChecked(true);
          }}
          style={isChecked ? { ...defaultButton } : { ...selectedButton }}
          variant="contained"
        >
          <div className="japanese_R" style={{ color: "#ffffff" }}>
            大 (+{baseMenuData.bigSizeDiffPrice}円)
          </div>
        </Button>
      </Grid>
    </Grid>
  );
};

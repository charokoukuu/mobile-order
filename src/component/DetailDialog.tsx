// anyを許容するdisable,後でPayPayやStripeのAPIのデータ構造調べて型定義する
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Dialog, Grid } from "@mui/material";
import { MenuData } from "../types";
import "../views/styles/App.css";
import { createContext, useContext, useEffect, useState } from "react";
import { MultiplePurchase } from "./MultiplePurchase";
import classNames from "classnames";
export const menuData = createContext<any>(null);
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
          <div className="p-[2%] text-center">
            <MaterialMenuCard />
            {props.menu?.isBigSize && props.isAddCart && (
              <MaterialSizeSelectCard />
            )}
            <div className="my-3 rounded-xl">
              <MultiplePurchase
                initialValue={props.initialPurchaseCount}
                purchaseCount={purchaseCount}
                setPurchaseCount={setPurchaseCount}
              />
            </div>
          </div>
          {props.isAddCart && (
            <div className="z-10 text-center">
              <Button
                className="h-11 w-[90%] rounded-xl bg-runticketBlue"
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
            <div className="text-center">
              <Button
                className="h-11 w-[90%] rounded-xl bg-runticketRed"
                variant="contained"
                onClick={() => {
                  props.onDelete && props.onDelete();
                }}
              >
                カートから削除
              </Button>
            </div>
          )}
          <div className="my-[2%] text-center underline ">
            <Button
              className="text-runticketBlue"
              onClick={() => {
                if (!props.initialPurchaseCount)
                  setTimeout(() => setPurchaseCount(1), 200);
                props.onPrev();
              }}
            >
              閉じる
            </Button>
          </div>
        </Dialog>
      </menuData.Provider>
    </div>
  );
};

const MaterialMenuCard = () => {
  const { menu } = useContext(menuData);

  return (
    <div className="rounded-xl bg-white shadow-md">
      <div className="text-center text-[2rem]">
        <div className="japanese_R py-[2%] text-[30px] text-runticketGrayText">
          {menu?.title}
        </div>
        <div>
          <img
            className="my-[1%] mx-auto w-[70%] max-w-[250px] rounded-[10px]"
            src={menu?.image || ""}
            alt="menu"
          />
        </div>
        <div className="mx-auto w-[80%] py-3 text-center text-[15px] text-runticketGrayText">
          {menu?.description}
          {menu?.quantity < 5 && (
            <p className="japanese_L text-right text-xs font-bold text-runticketRed opacity-60">
              △ 残りわずか
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
const MaterialSizeSelectCard = () => {
  const { menu } = useContext(menuData);

  return (
    <div className="my-[2%] rounded-xl bg-white p-3 shadow-sm">
      {menu !== undefined && <SelectedCard />}
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

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Button
          className={classNames(
            "h-[50px] w-full rounded-2xl bg-runticketBlue text-white shadow-sm",
            { "bg-runticketLightGray shadow-none": isChecked }
          )}
          onClick={() => {
            setIsChecked(false);
          }}
          variant="contained"
        >
          <p className="japanese_R text-white">並</p>
        </Button>
      </Grid>
      <Grid item xs={6}>
        <Button
          className={classNames(
            "h-[50px] w-full rounded-2xl bg-runticketBlue text-white shadow-sm",
            { "bg-runticketLightGray shadow-none": !isChecked }
          )}
          onClick={() => {
            setIsChecked(true);
          }}
          variant="contained"
        >
          <p className="japanese_R text-white">
            大 (+{baseMenuData.bigSizeDiffPrice}円)
          </p>
        </Button>
      </Grid>
    </Grid>
  );
};

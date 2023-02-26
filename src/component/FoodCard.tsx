import { Card, CardActionArea, CardMedia } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { MenuData } from "../types";
import styled from "@emotion/styled";
import classNames from "classnames";

interface FoodCardProps {
  menu: MenuData;
  onClick: () => void;
  onDelete?: () => void;
  deleteButton: boolean;
  count?: number;
  className?: string;
}
export const FoodCard = (props: FoodCardProps) => {
  const isSale: boolean = props.menu.quantity > 0;
  return (
    <Card
      className={classNames(
        "relative mx-auto max-h-[180px] max-w-[180px] rounded-xl",
        props.className
      )}
    >
      <CardActionArea
        onClick={() => {
          isSale && props.onClick();
        }}
      >
        <CardMedia
          component="img"
          image={props.menu.image}
          alt="menu image"
          className={classNames("h-[180px]", {
            "brightness-[35%]": !isSale || props.count,
          })}
        />

        {!isSale && (
          <div className="z-1 absolute top-1/2 left-1/2 w-[80%] -translate-x-1/2 -translate-y-1/2 rotate-[-20deg] transform border-[3px] border-solid border-[#FC3f46] text-center">
            <span className="font-[clamp(0.5rem_4.2vw_2rem)] text-[#FC3f46]">
              SOLD OUT
            </span>
          </div>
        )}
        {props.count && <CountText> ×{props.count} </CountText>}
        <div className="absolute right-0 bottom-0 h-[33%] w-full bg-gradient-to-t from-[rgba(0,0,0,0.9)] to-[rgba(0,0,0,0.01)]">
          <div
            className={classNames(
              "japanese_R absolute left-[12px] bottom-[15px] w-[60%] text-lg text-white",
              {
                "brightness-[55%]": !isSale || props.count,
              }
            )}
          >
            {props.menu.title}
          </div>
        </div>
        <div
          className={classNames(
            "japanese_B absolute bottom-[15px] right-[12px] text-lg text-[#FA9534]",
            {
              "brightness-[35%]": !isSale || props.count,
            }
          )}
        >
          ¥{props.menu.price}
        </div>
      </CardActionArea>
      {props.deleteButton && (
        <div
          className="z-1 absolute top-[5%] right-[5%] flex rounded-full bg-white"
          onClick={props.onDelete}
        >
          <CancelIcon className="text-{rgba(0,0,0,0.8)} text-[25px]" />
        </div>
      )}
    </Card>
  );
};

const CountText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 50px;
  font-weight: bold;
  color: #f25f1d;
  z-index: 10;
`;

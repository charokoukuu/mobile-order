import { Card, CardActionArea, CardMedia } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { MenuData } from "../types";
import styled from "@emotion/styled";

interface FoodCardProps {
  menu: MenuData;
  onClick: () => void;
  onDelete?: () => void;
  deleteButton: boolean;
  count?: number;
}
export const FoodCard = (props: FoodCardProps) => {
  return (
    <div>
      <Card
        style={{
          position: "relative",
          borderRadius: "13px",
          width: "180px",
          height: "180px",
        }}
      >
        <CardActionArea
          onClick={() => {
            props.menu.isSale && props.onClick();
          }}
        >
          <CardMedia
            component="img"
            image={props.menu.image}
            alt="menu image"
            style={{
              height: "180px",
              filter:
                !props.menu.isSale || props.count ? "brightness(35%)" : "",
            }}
          />

          {!props.menu.isSale && (
            <div
              className="japanese_B"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                fontSize: "clamp(0.5rem, 4.2vw, 2rem)",
                transform: "translate(-50%, -50%) rotate(-20deg)",
                color: "#FC3f46",
                textAlign: "center",
                width: "80%",
                borderStyle: "solid",
                borderWidth: "3px",
                zIndex: 1,
              }}
            >
              SOLD OUT
            </div>
          )}
          {props.count && <CountText> ×{props.count} </CountText>}
          <div
            style={{
              position: "absolute",
              right: "0",
              bottom: "0",
              width: "100%",
              height: "33%",
              background:
                "linear-gradient(to top, rgba(0,0,0,0.9), rgba(255,255,255,0.01))",
            }}
          ></div>
          <div
            className="japanese_R"
            style={{
              position: "absolute",
              left: "12px",
              bottom: "15px",
              color: "#ffffff",
              fontSize: "18px",
              width: "60%",
              filter:
                !props.menu.isSale || props.count ? "brightness(55%)" : "",
            }}
          >
            {props.menu.title}
          </div>
          <div
            className="japanese_B"
            style={{
              position: "absolute",
              right: "12px",
              bottom: "15px",
              color: "#FA9534",
              fontSize: "18px",
              filter:
                !props.menu.isSale || props.count ? "brightness(35%)" : "",
            }}
          >
            ¥{props.menu.price}
          </div>
        </CardActionArea>
        {props.deleteButton && (
          <div
            style={{
              display: "flex",
              position: "absolute",
              right: "5%",
              top: "5%",
              zIndex: "1",
              backgroundColor: "rgba(255,255,255,1)",
              borderRadius: "100%",
            }}
            onClick={props.onDelete}
          >
            <CancelIcon
              style={{ color: "rgba(0,0,0,0.8)", fontSize: "25px" }}
            />
          </div>
        )}
      </Card>
    </div>
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

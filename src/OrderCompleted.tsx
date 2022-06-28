import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetSpecificData } from "./SubmitGet";
import { DocumentData } from "firebase/firestore";
import { UserInfo } from "./UserInfo";
import { QRCodeSVG } from "qrcode.react";
import { Card } from "@mui/material";
import { LoadingAnimation } from "./component/LoadingAnimation";

export const OrderCompleted = () => {
  const [orderData, setOrderData] = useState<DocumentData>();
  const [isGetOrderData, setIsGetOrderData] = useState<boolean>(false);
  const params = useParams();

  useEffect(() => {
    (async () => {
      params.id && setOrderData(await GetSpecificData("order", params.id));
      setIsGetOrderData(true);
      // console.log(params.id);
    })();
  }, [params.id]);

  return (
    <div>
      {isGetOrderData ? (
        <Card
          style={{
            marginTop: "20px",
            margin: "auto",
            maxWidth: "1200px",
            width: "90vw",
          }}
        >
          <h1 style={{ textAlign: "center" }}>Order</h1>
          {UserInfo.user.uid === orderData?.user.uid ? (
            <>
              {/* <p>{orderData?.id}</p> */}
              <QRCodeSVG
                style={{
                  display: "flex",
                  margin: "0 auto",
                  height: "60vh",
                }}
                value={orderData?.id}
                size={200}
              />
            </>
          ) : (
            <p>権限ないよ</p>
          )}
        </Card>
      ) : (
        <LoadingAnimation />
      )}
    </div>
  );
};

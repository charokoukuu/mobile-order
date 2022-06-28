import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CorrectEmail, GetSpecificData } from "./SubmitGet";
import { DocumentData } from "firebase/firestore";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "./Firebase";
import { UserInfo } from "./UserInfo";
import { QRCodeSVG, QRCodeCanvas } from "qrcode.react";
import { Card, CardMedia, Paper } from "@mui/material";
import { width } from "@mui/system";

export const OrderCompleted = () => {
  const [orderData, setOrderData] = useState<DocumentData>();
  const params = useParams();
  const [user, setUser] = useState<User>();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (!CorrectEmail(user?.email || ""))
          window.location.href = "/register";
        UserInfo.user = user;
        setUser(user);
        // setIsLogin(true);
      } else {
        window.location.href = "/register";
      }
    });
  }, []);
  useEffect(() => {
    (async () => {
      params.id && setOrderData(await GetSpecificData("order", params.id));
      // console.log(params.id);
    })();
  }, [params.id]);

  // useEffect(() => {
  //   console.log(orderData);
  // }, [orderData]);
  return (
    <Card
      style={{
        marginTop: "20px",
        margin: "auto",
        maxWidth: "1200px",
        width: "90vw",
      }}
    >
      <h1 style={{ textAlign: "center" }}>Order</h1>
      {user?.uid === orderData?.user.uid ? (
        <>
          {/* <p>{orderData?.id}</p> */}
          <QRCodeSVG
            style={{
              display: "flex",
              margin: "0 auto",
              height: "60vh",
            }}
            value={orderData?.id}
            size={300}
          />
        </>
      ) : (
        <p>権限ないよ</p>
      )}
    </Card>
  );
};

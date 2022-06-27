import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CorrectEmail, GetSpecificData } from "./SubmitGet";
import { DocumentData } from "firebase/firestore";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "./Firebase";
import { UserInfo } from "./UserInfo";
export const OrderCompleted = () => {
  const [orderData, setOrderData] = useState<DocumentData>();
  const params = useParams();
  const [user, setUser] = useState<User>();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
          if (!CorrectEmail(user?.email || "")) window.location.href = "/register";
          UserInfo.user = user;
          setUser(user);
          // setIsLogin(true);
      } else {
          window.location.href = "/register"
      }
  });
  }, [])
  useEffect(() => {
    (async () => {
      params.id && setOrderData(await GetSpecificData("order", params.id));
      console.log(params.id);
    })();
  }, [params.id]);

  useEffect(() => {
    console.log(orderData);
  }, [orderData]);
  return (
    <div>
      <h1>Order</h1>

      {user?.uid === orderData?.user.uid ? 
        <p>
        {orderData?.id}
      </p>
      : <p>
        権限ないよ
      </p>
      }

    </div>
  );
};

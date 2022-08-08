import { Button } from "@mui/material";
import { deleteUser } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "../Firebase";

interface IllegalEmailAddressProps {
  email: string;
  onClick: () => void;
}

export const IllegalEmailAddress = (props: IllegalEmailAddressProps) => {
  useEffect(() => {
    const DeleteUserRedirect = () => {
      if (auth.currentUser) {
        deleteUser(auth.currentUser);
      }
    };
    DeleteUserRedirect();
    console.log(auth.currentUser);
  }, []);
  return (
    <div style={{  padding: "2vw", borderRadius: "8px", width: "90%", margin: "2% auto" }}>
      <div style={{ textAlign: "left", margin: "5% auto", width: "80%" }}>
        <h2 style={{ fontSize: "2rem" }}>
          本サービスは個人用アカウントでのご利用を許可しておりません。
          <br />
          申し訳ございませんが、組織内アカウント(@oit.ac.jp)で
          ログインし直してください。
        </h2>
        <div style={{ textAlign: "center" }}>
          <Button onClick={props.onClick} variant="contained" color="primary">
            再ログイン
          </Button>
        </div>
        <p>
          ※何度もこの画面が表示される場合はご利用ブラウザのログイン情報を確認してください。
        </p>
      </div>
    </div>
  );
};

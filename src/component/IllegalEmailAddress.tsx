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
    <div style={{ textAlign: "center", margin: "5vw 0" }}>
      <h2 style={{ fontSize: "5vw" }}>
        大学アカウントで
        <br />
        ログインしてください。
      </h2>
      <Button onClick={props.onClick} variant="outlined" color="error">
        再ログイン
      </Button>
      <p>
        何度もこの画面が表示される場合はブラウザのアカウントをご確認ください。
      </p>
    </div>
  );
};

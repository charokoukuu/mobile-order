import { Button } from "@mui/material";
import { deleteUser } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "../api/Firebase";

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
  }, []);
  return (
    <div className="my-[5%] mx-auto w-[80%] text-left">
      <h2 className="text-[2rem]">
        本サービスは個人用アカウントでのご利用を許可しておりません。
        <br />
        申し訳ございませんが、組織内アカウント(@oit.ac.jp)で
        ログインし直してください。
      </h2>
      <div className="text-center">
        <Button onClick={props.onClick} variant="contained" color="primary">
          再ログイン
        </Button>
      </div>
      <p>
        ※何度もこの画面が表示される場合はご利用ブラウザのログイン情報を確認してください。
      </p>
    </div>
  );
};

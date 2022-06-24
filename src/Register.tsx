import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { auth } from "./Firebase";
import { IllegalEmailAddress } from "./component/IllegalEmailAddress";
import App from "./App";
const theme = createTheme();
const provider = new GoogleAuthProvider();
export const Register = () => {
  const [user, setUser] = useState<string>("e1xxx@oit.ac.jp");
  const [isLogin, setIsLogin] = useState<boolean>(false);

  const correctEmail = (email: string) => {
    const regex = /^e[a-zA-Z0-9._-]+@oit.ac.jp$/;
    return regex.test(email);
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        // const uid = user.uid;
        setUser(user.email || "");
        setIsLogin(true);
        // ...
      } else {

      }
    });

  }, []);

  const sendAsycEmail = async () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential?.accessToken;
        const user = result.user;
        console.log(user.email);
        setUser(user.email || "");
        setIsLogin(true);
        // ...
      }).catch((error) => {
        console.log(error);
      });
  };

  // SIGIN IN押したときの処理
  const handleSubmit = () => {
    // 正規表現で大工大生かどうかチェック

    sendAsycEmail()
  };


  return (
    <ThemeProvider theme={theme}>
      {(correctEmail(user) && !isLogin) ?
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1 }}
        >

          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSubmit}
          >
            Sign In
          </Button>
        </Box>
        : (correctEmail(user) && isLogin) ? <App /> : <IllegalEmailAddress email={""} onClick={function (): void {
          handleSubmit();
        }} />}
    </ThemeProvider>
  );
};

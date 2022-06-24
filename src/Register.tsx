import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ChangeEvent, useEffect, useState } from "react";
import { GoogleAuthProvider, sendSignInLinkToEmail, signInWithPopup } from "firebase/auth";
import { auth } from "./Firebase";
import { IllegalEmailAddress } from "./component/IllegalEmailAddress";
import { Menu } from "@mui/material";
import App from "./App";
const theme = createTheme();
const provider = new GoogleAuthProvider();
export const Register = () => {
  const [email, setEmail] = useState("");
  const [user, setUser] = useState<string>("e1xxx@oit.ac.jp");
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [isAddress, setIsAddress] = useState(false);

  // 認証セッティング
  const actionCodeSettings = {
    // リダイレクト先としたいURL。
    // URL は、Firebase Console の authorized domains list に含まれている必要があります。
    url: "http://mobile-order-4d383.web.app",
    // This must be true.
    handleCodeInApp: true,

  };
  const correctEmail = (email: string) => {
    const regex = /^e[a-zA-Z0-9._-]+@oit.ac.jp$/;
    return regex.test(email);
  }
  // 正規表現でemailをチェック
  useEffect(() => {
    const regex = /^e[a-zA-Z0-9._-]+@oit.ac.jp$/;
    setIsAddress(regex.test(email));
  }, [email]);
  provider.setCustomParameters({
    'login_hint': 'user@oit.ac.jp'
  });
  const sendAsycEmail = async () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(user.email);
        setUser(user.email || "");
        setIsLogin(true);
        // ...
      }).catch((error) => {
        // Handle Errors here.
        console.log(error);
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  // SIGIN IN押したときの処理
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(email);
    // 正規表現で大工大生かどうかチェック
    isAddress ? sendAsycEmail() : console.log("no");
  };

  return (
    <ThemeProvider theme={theme}>
      {(correctEmail(user) && !isLogin) ? <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <p>{isAddress ? "" : "大学メールアドレスを入力してください．"}</p>
          </Box>
        </Box>
      </Container> : (correctEmail(user) && isLogin) ? <App /> : <IllegalEmailAddress email={""} onClick={function (): void {
        window.location.reload();
      }} />}
    </ThemeProvider>
  );
};

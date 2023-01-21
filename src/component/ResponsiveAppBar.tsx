import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import { useRef } from "react";

const settings = ["ログアウト"];
const toLink = ["/logout"];

interface ResponsiveAppBarProps {
  photoURL: string;
  onClick: () => void;
  setAppBarHeight: (height: number) => void;
}
const ResponsiveAppBar = (props: ResponsiveAppBarProps) => {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  // aapBerの高さを取得, これを使ってスペーサーを設定するためのdisable
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const appBar = useRef<any>(null);

  React.useEffect(() => {
    if (appBar.current) {
      props.setAppBarHeight(appBar.current.clientHeight);
    }
  }, [appBar, props]);
  return (
    <AppBar
      ref={appBar}
      position="static"
      className="bg-runticketBlue"
      elevation={0}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters className="mx-auto max-w-[800px]">
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={props.onClick}
              color="default"
            >
              <MenuIcon className="text-white" />
            </IconButton>
          </Box>
          <Button
            onClick={() => {
              window.location.href = "/";
            }}
            className="absolute left-1/2 -translate-x-1/2 transform text-2xl text-white"
          >
            <img
              src="https://firebasestorage.googleapis.com/v0/b/mobile-order-4d383.appspot.com/o/runticket.png?alt=media&token=f27edb3e-3806-43bf-b1fb-2179dcc23f07"
              alt="RunTicket"
            />
          </Button>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={props.onClick}
              color="default"
            >
              <MenuIcon className="text-white" />
            </IconButton>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={props.photoURL} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={() => {
                setAnchorElUser(null);
              }}
            >
              {settings.map((setting, index: number) => (
                <MenuItem
                  key={setting}
                  component={Link}
                  to={toLink[index]}
                  onClick={() => {
                    setAnchorElUser(null);
                  }}
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;

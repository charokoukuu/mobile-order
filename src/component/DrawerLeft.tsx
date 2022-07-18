import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import HistoryIcon from '@mui/icons-material/History';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import { useState } from 'react';
type Anchor = 'top' | 'left' | 'bottom' | 'right';

interface TemporaryDrawerProps {
    open: boolean;
    setIsmenu: (ismenu: boolean) => void;
    onClick: (item: string) => void;
}
export default function TemporaryDrawer(props: TemporaryDrawerProps) {
    const [state, setState] = useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer =
        (anchor: Anchor, open: boolean) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                if (
                    event.type === 'keydown' &&
                    ((event as React.KeyboardEvent).key === 'Tab' ||
                        (event as React.KeyboardEvent).key === 'Shift')
                ) {
                    return;
                }

                setState({ ...state, [anchor]: open });
            };

    const list = (anchor: Anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={() => {
                props.setIsmenu(false);
                toggleDrawer(anchor, false)
            }}
            onKeyDown={() => {
                props.setIsmenu(false);
                toggleDrawer(anchor, false)
            }}
        >
            <List>
                {['メニュー', "注文履歴"].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon onClick={() => {
                                props.onClick(text)
                            }} >
                                {text === "メニュー" && <RestaurantMenuIcon />}
                                {text === "注文履歴" && <HistoryIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} onClick={() => {
                                props.onClick(text)
                            }} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {["ヘルプ", "利用規約","プライバシー","お問い合わせ"].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {text === "ヘルプ" && <HelpOutlineIcon />}
                                {text === "利用規約" && <InboxIcon />}
                                {text === "プライバシー" && <PrivacyTipIcon />}
                                {text === "お問い合わせ" && <ContactPageIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} onClick={() => {
                                props.onClick(text)
                            }} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>

        </Box>
    );

    return (
        <div>

            <Drawer
                anchor={"left"}
                open={props.open}
                onClose={() => {
                    props.setIsmenu(false);
                    toggleDrawer("left", false)
                }}
            >
                {list("left")}
            </Drawer>
        </div>
    );
}

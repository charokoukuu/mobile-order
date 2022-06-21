import { Button, TextField } from "@mui/material";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "./Firebase";
import { MenuData } from "./Interface";
export const TestData = () => {

    const [menu, setMenu] = useState<MenuData>({
        title: "string",
        description: "string",
        price: 0,
        id: "",
        image: "string",
        category: "string",
        isBigSize: false,
        isStatus: true


    });
    const RandomID = () => {
        var S = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        var N = 16
        return Array.from(crypto.getRandomValues(new Uint8Array(N))).map((n) => S[n % S.length]).join('')
    }
    const PostData = async () => {
        let rand = RandomID();
        setMenu({ ...menu, id: rand });
        await setDoc(doc(db, "menu", rand), menu);
        console.log(`success! ${rand}`);
    }

    return (
        <div>
            <TextField label="title" fullWidth onChange={(e) => {
                setMenu({ ...menu, title: e.target.value });
            }} />
            <TextField label="description" fullWidth onChange={(e) => {
                setMenu({ ...menu, description: e.target.value });
            }
            } />
            <TextField label="price" fullWidth onChange={(e) => {
                setMenu({ ...menu, price: Number(e.target.value) });
            }
            } />
            <TextField label="image" fullWidth onChange={(e) => {
                setMenu({ ...menu, image: e.target.value });
            }
            } />
            <TextField label="category" fullWidth onChange={(e) => {
                setMenu({ ...menu, category: e.target.value });
            }
            } />

            <Button onClick={() => {
                PostData();
            }}>データの追加</Button>
        </div>
    );
}

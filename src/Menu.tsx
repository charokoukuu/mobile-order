import { DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Order } from "./component/Order";
import { DetailDialog } from "./component/DetailDialog";
import { MenuData } from "./Interface";
import { OrderSubmit } from "./SubmitGet";
import { Cart } from "./component/Cart";
import { LoadingAnimation } from "./component/LoadingAnimation";
import { auth } from "./Firebase";
import SwipeTabs from "./component/SwipeTabs";
import IntegrationNotistack from "./component/IntegrationNotistack";

export type CategoryProp = "メイン" | "ドリンク" | "トッピング";
const menuCategoryArray: CategoryProp[] = ["メイン", "ドリンク", "トッピング"];

// type Mode = "menu" | "complete";
export const Menu = () => {
    // const [mode, setMode] = useState<Mode>("menu");
    const [detailDialogOpen, setDetailDialogOpen] = useState(false);
    const [menu, setMenu] = useState<DocumentData[]>([]);
    const [chosenMenu, setChosenMenu] = useState<MenuData | undefined>();
    const [orderData, setOrderData] = useState<MenuData[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [orderDialog, setOrderDialog] = useState<boolean>(false);
    const [isGetMenu, setIsGetMenu] = useState<boolean>(false);
    useEffect(() => {
        // window.location.href = "/register";
        (async () => {
            setMenu([
                {
                    "title": "白ごはん",
                    "id": "6ZjdzBMSKW9pRYDVCI6q",
                    "image": "https://www.kikkoman.co.jp/homecook/search/recipe/img/00005991.jpg",
                    "price": 100,
                    "description": "美味しコシヒカリ",
                    "bigSizeDiffPrice": 0,
                    "isBigSize": false,
                    "isStatus": true,
                    "isSale": false,
                    "category": "トッピング"
                },
                {
                    "description": "外はサクサク中はジューシーな唐揚げ",
                    "isStatus": true,
                    "title": "唐揚げ定食",
                    "image": "https://www.ootoya.com/menu/uploads/7.jpg",
                    "price": 430,
                    "category": "メイン",
                    "bigSizeDiffPrice": 0,
                    "isBigSize": false,
                    "id": "IlFA85Ya3p9st4iC3Gn5",
                    "isSale": true
                },
                {
                    "image": "https://media.delishkitchen.tv/article/349/xcfzfecwdzh.jpeg?version=1599726116",
                    "price": 100,
                    "title": "紅茶",
                    "description": "スリランカ産希少茶葉使用",
                    "id": "KD5rDV4C8zL3be2TzShl",
                    "isSale": true,
                    "bigSizeDiffPrice": 0,
                    "isBigSize": false,
                    "isStatus": true,
                    "category": "ドリンク"
                },
                {
                    "isBigSize": false,
                    "id": "LV2JRQSS2Lhn1D3jrFVp",
                    "image": "https://image.delishkitchen.tv/recipe/195135085039583654/1.jpg?version=1554856381",
                    "title": "ネギトロ丼",
                    "isStatus": true,
                    "isSale": true,
                    "category": "メイン",
                    "bigSizeDiffPrice": 0,
                    "description": "兵庫県産マグロ",
                    "price": 420
                },
                {
                    "category": "メイン",
                    "id": "VzQk5jNwTq1EHPAKUXlt",
                    "description": "日替わり定食です",
                    "title": "菜の花定食",
                    "isSale": true,
                    "isBigSize": false,
                    "bigSizeDiffPrice": 0,
                    "image": "https://www.taharakankou.gr.jp/nanohana/images/dish_sweets/dish_02.jpg",
                    "isStatus": true,
                    "price": 490
                },
                {
                    "bigSizeDiffPrice": 0,
                    "title": "オレンジジュース",
                    "category": "ドリンク",
                    "image": "https://www.freshnessburger.co.jp/images/menu/orange_juice.jpg",
                    "isStatus": true,
                    "id": "Z1BErhKQZGOZv2dtbc1B",
                    "description": "100％オレンジ",
                    "isBigSize": false,
                    "isSale": true,
                    "price": 100
                },
                {
                    "title": "コーヒー",
                    "id": "ZA30qVvezVv06YCFiIzI",
                    "price": 100,
                    "isSale": true,
                    "isBigSize": false,
                    "category": "ドリンク",
                    "bigSizeDiffPrice": 0,
                    "isStatus": true,
                    "description": "ブルーマウンテン100％",
                    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/235px-A_small_cup_of_coffee.JPG"
                },
                {
                    "image": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMSEhUQEhIWFhUWFhcWFhgVFxUXFxUXGBUWFhUXFxUYHSggGBolGxUXITEiJSktLi8uGB8zODMtNygtLisBCgoKDg0OGxAQGy0lICYtLS0tLS0vLS0tMi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAOEA4QMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAAEAAECAwUGB//EADwQAAEDAgQDBgQFAgUFAQAAAAEAAhEDIQQSMUEFUWETInGBkaEysdHwFEJSweEG8SNicpKiU1RjgsIW/8QAGQEAAwEBAQAAAAAAAAAAAAAAAAIDAQQF/8QALxEAAQMCBAMIAgMBAQAAAAAAAQACEQMhEjFBUWFx8AQTIoGRobHB0eEUMvFSQv/aAAwDAQACEQMRAD8A9nhKFOFGE0rFGElKE0IlCikpQlCEKCoxLgBdEQhMa0FSruhhKZuayHOLndFfUq2+SnVogABXU8HLTO+nRedSpvuBnnKu5wCbh1Xumdj8/wCyJqPgShsNhy3NOkK+gZbB2t9PZd1LFgDXWMKLomQqaWIvBRSFrUEwxAbAOiym9zPC9aQDcIo6FBVK8TG6LdcHqg34d21lPtIfMtErWRqg+wzGSVp4Y92OVkFGU3TmqdrLm7PWbTPzune0uC0FFCYXEkkA/dkYvTp1A8S1Qc0jNMolSlRKdYkmTpihCZMnTIQmTJ0xQhJJMkhC3IShPCULFqaEylCUIQq4SIUyFCELFEhQc0HVWkJiFpEoWdVp94TojAZTvYDqqm0ADMlTazCTGqYmVF77whH1chO86KRJLizn7JqWDP5iubE6pJaD+E8AZqAFR14jxV78ODMoiFFdLaLW8eaQvJWfmdSN7t+SNa4ESNE72giCoU6WVuUeKILcskSCqsS4blD4hpcYbpHkqOIOuURwypLcvJccio8sOsKv9RKtwuGy66/JXu0spJLuaxrRhGSiSTcqqkyB8/FOVNQKYLCkmSSQhMmTpkITJipJihCiknSQhb5CUJ4ShKtUYTKUJQtQoEJipkKJCEKCYhTKiUIUCg685rSjioEJajMYhAMLOwMl7ydf5KLe8DUqYaNeaqrUQQlYw02YRfP5laSCZKj+JbzTh4OhlZjsKZIzBSZTNMzKg3tNSfEy26csEWK0U5QmFxWYlpRa6mPDxIUyCDBWdicGTMJsFhnMM+RHTmFoFD1MSAo9zTY7HkU+JxEK1xhDuxE2aoYmoS0Rv+6toYcNEalBc6o6BYb/AIRAAkpsPMGedvQfvKtUky6AIEKZUSEykVFCEyZOkhCiknTIQmSTpIQugSSSSrUlEqSSEKJTFPCRC1CgVFTKiUIUCmKkVB/RCxMVB4soOqxqFE4i6m6swZlNhKzcZTcDKrwrXOMu+Ee606zgQZCzK+J/KFwPptD8UyNuKqCSIV2Fc1r3bSLeWqNp1Q7RYTqlyN49FdwqqWuIO6el2oB4YBa9+KHU7Sth4sfRZ9SkJhFdteDp+6Ec+KgnS4VqsPPVkrZCMpNECFYmYBFkwfsukECApp0ycpkyxRKZSKihCZMnKihCSZOmQhJJJJCF0CSSSVakkkkhCSYp0xQhRKYqRUStQoFUmsOasqskLNr4dwuo1XuYJAlM0A6ouqwEeOir7EDTVRbiWAS97W2gSQPSVB1bRwMg7jcKTiwjGQPxx9bpgDkqsdewQLMLaTqVoGpI8Nf2KFe8kWC5yWPuddOtk4BFkJiiG39VT2kXVWKJGpuqsE3M4B2n8TC841iahptbGUcDx+VfAMMkrVZVloduUsb8U9VCs72Q5rm87i3su3vMMB3ry/JUsM5I5vELwrKDyXZjYQVhMJLiQjaZc6BNz7JKHbHPMm97LX0gLLYdWG1/BTBQ+Dw5ZMmZRS9hmIiXW4LlMaKKYqRUSnWKJTKRUEISUVJJCEySdJCFvpJILF8TpUvjeJ5C59AkJAzTAE5I1Jcnjf6t/LSZfm65/wBoQ2LpY6pAfmhxA7pbDZ/UGbBRNdv/AJBPJWFB3/ogc11dbGU2Wc8SBJAuYGpgXhQoY9rxmaHZdiRlB8Ab+cQgMBgxRZkBkySXGxJ6DYWCtyl4uSAQRIInlaVM9pIcGxfr2G6XAI6+FmN/qSpUqijSptkuIzSXiBq60SIBK2X1bm+3qqMJhqdFhFNoaN9yfEm5Qb8SQSefyUanaRSAxnO/l+zEb+SfAHHwiEPxTh9VwLmV3kye4XGPAGbeaCwoe5n4MgteX5nF2zIBnroPZaNKoXHKDqUbRplpJIE5YneJ08Fz0qwrwWg7HUfpUxFog8x11zWZxLhuZjKTHfDeXzLjEC+wuVp0cCKdMUwSSNSdzvA2HRRpuBN9ArH4kGYPK3iqte2CTF+oSkkwEGx+Vxk7R9ETYEtiwQnFhAJCHxWMPdcN2ifGPqpiq2gXB2Qg+pM/kowl4BCAx9QOcSNNFRSeW97+yd5GhUsJVDXjkbHz/leG2oX1cZsSfRdmEBsBa2Ey1BJOnxIbiNE/EB3bR4/YVTcaZcBoSI8BKODy9rfT3+i9hlRtalgm+piNY+wfNcpBa6dEG2i4NBIjRMMO+ZcMoNwSflCtx0gxsqDUKaA3wkZIB1VlPF1hbMbfqAPurGcZd+ZoPhI+qGa4lF4ajTcYLRpa5HyKuyo+Ya4+aDgzc30V9PjDD8Qc3xEj1CJp4hrvhcD539NVgYiiWXIsTAmL+hVYg6/f0VB2p7f7D6QezsIlp+11CZYVHFPbo4+Drj3RlLiezm+bfoV0M7Uw52UXdncMro9JQp1muu0g/t4jZSXTKiUkkklixZGP4/UqSAco5N/crFeSbrYw3BzPfePBsk+sQPdajeBU5BEgDUTObp0Xmlr33K9AVKbLBDYPhdGnD47QkAgujKJEghunrK0RUJKuOHaIAFhaAoGh4/NLUDwYblw+5+yoTNyfVV1H2T0SXEagBOGdD6/RQrVTEMHlv5DdRcCLucYGgFzGm/ktHBX4msBYix9FlYirMnc/cIutTdDZ2aM2hOl7blWPLWgFsdDvcapO00nV5BOEDrfSTwumYQ28Snp0gwQ3lcnU/TwT1KhteOZQXbXUokbmfZUDhgimLRaP1foysi91b3d3hQa1je9JMX5DorDhWiD+b3siG1WgQSAd7jXdK3swLpe1oOky75IvlZBfAtPwsjF4nNMjwVDxaVqV6DTchB1ajWMLQLT5lc9bslRxJqOEe/XnbiqMqNiwWRXco0gDraEW2ozUC7QT0vMeaGzh0gG5XEOzxeRebcP9V8ciLqbQDpvZdAxgaB0+i5nDSx8uEge/ULbOIzNzN++a7+wvaA7FY7clGu24jJUY590O26uDSTYKFWmGyZ291SXPJcMkggWVzXgCLQeSpY6CgXYzK6xg7q0VbqDavignJULIE7rZfhqZaO0EnxPr0VdWMuVsNbyGvrzQr8TYNUwzMNdx6b+a73vkeHrmoAEZqNeiBlA1gA9fLmoVKLm/EI91PEvIeOvJX4glwgkiQdbJmtBJT94QAgQNwY5f3RdHHuFniRz3/lA0iRZ2o+/NXgrGlzDaydwDs1ofj6f6vYpILJ09klf+Q/Ydeal3DOPXkt2jSdrAaPf0+qk/EgEAba/fNTIMET+1kPVLQA2R1PNQ7Q6oBDDHE77aDnsN5CRoBKtOIAuqKuMJtEKbGtdAABv8X38lc2i34iLg6nX+FgFapk4Rw6+44rfCNFRhu8NdLIio0CABc2QuIqB1g4i9zy8E78SAOnPn5rWECWWsBf8AV4jfK6DuoVm96zo5zf05FNWpAgkE2PNUU3Co4gGIE+9vvop0a7WuLXEQROY256qTGsMyBhJjhP16ZhMZHNC/hSfhdEaTck8kZw5xLZfA1t9eSWMrsbpE7/eizKtQvd3XZWlwJF+UeYm8KWKn2d8C52B9OAjKycTUF/VbOHqB0i8bHmOiHxFBk963mrWOgZz/AOvQRqhH1Jl50ggfVdNSHNDHgO5jTeNtvKSptEGRZNWrMDYacvgJHosnFkyO9mG39lGrU19fRBMq9ranLoJ06df3XmdofjOAN2ynPaMvZdVNkX69f2ovfAd932/dU4eqQZNkRSwZqh0vyhtoiSXcyOWyangzBa6P2Kl3bjDgOSrLQIK0xUGSXaKGHxDyGtptzCTfYKrCYE1AKYdGUwNTsL891umm2kwMboOW53JXUKTqpxmwAz1N8uHmoFzW2zMqrDUcjSCZcbuO3gEHjg0MLnHkR15SnrYwRlVOJrNf3I23GllcGnhItYQMz1zm6leZQFEtccwE+Uk8lKu9zSAQQSJA39ERgqDabiQNRY7DnHJRNEF3aPMnQAaAbD+/NcgpnDx9oVy5s8FaynbO6cxEAddieqVPFFog6qnFkZmiwtP0+SIwrCGmTIJJ0srNBxQ3Tz0zOufpspnKSiqDg4tcXaXEa6XBV1QsOonz+UaLPNO/dsoVq2iuyrgHiGSQsk2KnWpBrpB7p0F7W5lXMKAZig67hLdiLjzGoN0bhyDpMc+Ssx4eJCa4sVdbl80lPNT5f8ikngdA/hLjWtmO5Fx93QNQSY39VdiyABGg0QuFxDgHOJtp4XiVxVmtLsDsrmc9JOfysZMSEdg6JDcosZJcTOu3siTUhsEydysSvxF9IkG7Sd/qtDDODmiodCJAIIJ6noqdmrMnAwEECCDkB8eee6x7D/Y5HVCVvG03VWKxjYjQAeQVuMOZwaIGbQDfr4IN9DI/K8d085AdChUdgLi0C5AJ04TsNefEhUY2YlE4bGA0g4NIDSW5uZmCQeU2VFeiXzD9RAJvHmjsX3aTouCNtuqyMFhH1DN2t1zXg+HNFcuxNpEYpGluHKIjOOa2mBd4tfn0erImk17WBr8rz8ILZBPKQd/NEu4Pvnjyt81U3DAEE1SYMxH8rQGLEgSPeZ6JmUqT5FUCLR4vwfvRK57gZb8KGKcevkFn18YIygGfu62K97EwSPJc/i8C5pkfDIm9wCb+Kt2kVRLmGd+H4P3CWlhJAKrGEeWuytnO0tzGwEiCfC6IwWCFNgaIn8xk38uSMx2NpgBsxoOgmwlYmNe5swkc2nTyvG0Wm59fXimDnOEZStWtERmOkfYWT28GDqLFUcPxwe7KXeu/QdVrMwlOSXOb7COW8rHTWEstz60W4e7MOCuoDsmdpE1HWtfKNb8vsKZDg2HOudjt57q3DMY2cpmdbkrO4jimkObFgLHw2W1KYpgOcdIAkxxJMAkmMyIGyxpxGB1/iCxT4dA1WfV4mW1OxIuRM9In9k1XElhgAExvssvE0y54e4PL7AECw5WHiuIOsbkH4XWymCb5LfoYibFH0Hwb7rMq4fs4OzueoKNwuVwa7OI2EaFUohzXQcx8f5/ijUgiRkr8XhWvvAn79FChLAGnQCJUhjGOOXTx2QtTiBDsoBEc9+vgr1HU2nvAfRI0PIwkLSkggtEg+yA4jRe490am56ckRhq1iTYa3VVTFkg5b8vHZO5zS2DN+rcErZBsqKTmMimWw51oAOw1I2HUqOJlt/xApsuMrgASf9Tj4bI/AC5qvBDjaDYgC1uUqGK7MfExpaTrG4veN1VsYOh6xCMXi6+1jds3/unejfonWn29D9Dff6pJu7bw90+LgfZb9J5cCHCI0PMKvhzAXPpyCCD5TYqGMwb6rcvaOYCLwyCfMut6LD4Pg62GxIJu15LC7YzOQk6AzHqpulj2yLZTz4D720StYHNdBvstgYwUnsw7v8R7pIhtxFoi51ButZzcwkmCOfNVZsjXOIGckguGpbNhOsdOa58cZqNqy8ZaTQTJIOY8somBE3UjWZRIpuPlttJJknXOflYGGpdov88lr4EjtrDNeM2wka+qK4i6ATyv6KmljSXt7rgCQO8C3XxF9VZxNwILTIkRZXotDKT2tOp0i50vfbO6m6S4EhZtHHlzi0tOUg3Am/KB0lRwtStWlrjBaNCC23W0ozhlDLT6A6neLSVbicXBgX+7qQpudTaajzxGUz56G45py4AkNb1+1mDAimCBVEkkmAbk9Z8vBX8PwRnO4792CCYGp6fNZ2LrSbJ6eNcyIO+h36LmIoMcHFpgbEn5N+uCeXutNytjieJgHwWJV4oxlPM46W3JvYQACStjEMztuNdjeFhY5rGn4b6dOltl1Vw9r8YNo669klPCRBCsptDmnM2ZHsoUK4qhzfzsMOG/MHzCGxfFnkNp0wMxGVoFy4xsEZw7hXYjPUeXVHDvGd+XUD0sp0Q02ZkLE5Df2PWqq4Q2XeWqN4JhGsYXNaASTJ3106Doh8Se8W7XPmSf7+aN4VVBa9oJsQfURb091m8RMXHh6qzi3uht5ealcvMobBMg53RldYdLwCVtuwmVhgXcMscpsszicMoATAGWfXMfkrhxkvoMe3UjvdCLFSYKfZwQbQJtneZ65p34qkO4/wCIPiXC2tg9pf8ATFp6FV8Logv6Xv0CP4fSDxUe4TYNv1MnzsEPQZ2b3NGkCPAn+ErWtJa4CAfqR9aeiC4wWk3RuLrgAwNBY7+qyH12yXb7xrPOFdixnblzFsnURNuUobB8AAMio8Xnb7C2qHVDET1+EMwtEkqGLfSfBcSBzBIPqFo4fsntAL5jmRI81YeH0xBNyT4T4xqqalFpc7s2tOWAZJF9YmDsgUnNmQ0zpeUF4IgSpUG5jADsvUG58eSvcadESBc6CZ+eip4fiqj35OzygfEZkAeNpJNlfxPBh41yuGjgL+B5qjaYwYmXOhIj0+tN0pPih2SDqcRk94xyHRCcY4jADWhpnmYvt13ROGwUGW02j/PU77z4D8vkfJU8c4l+Ha105i52UANHImZ2/lYA/CST15kH62TjDiAA691h9vV/8f8Atd9UyP8A/wBUf01PvzSTYR/17D8qsn/j3/S6dvFn16opsYQJ7znwIaNSBz/hatZzQIztyi1zbxd0Q+KwtoBidCPqFiP4MS6XPcQLgEyJ2snL6jJBGInyHKNuiohjHRBgDzXV1+HZmwXunpA9jK4avwHGDEhrsz6BJJILBIgw0zeZjRdnwzFHs8v5miI8Nx0QFZ1Qu+IBx+ETr4ra1Om+HBpPWs+2qWlUfTJFvP5CJcXtAmO6BoZNtJ+qtxbJaASM0X/uhqVct+OD1GijiMRJmU2Ft5Jvop30QePxz2gMiP3U6TnNZ3ozEX6DknrVLSdAZWFxjjAaxxmJtPLqubu8Di5ziduHWSq2XQ1oRLH5yWi60aNGlTGZzhm/zbeAWJ/T3aRLmOLdWuykOG41+IHn85XTVcD2rQXy2RoLEHmQRy2SUuzi72tBdxBH+dQtqOg4SbcFDh+Pc+qMolomY2kGCfNZ9fh8ve55imJcTPmR0hFdsyg0U2CAL31J3cTuSheL4iXGkLh2oC1zhhh5xEGeEuGXK1+N1jf7eGw/GqEHFWU57GifGACR1Jur+HVKmIcHOADZ05jrupBsNIyxtotilhWUGBjRGgvJJJgSfMqjKT3HxusNBYcOaHPbFhffNVUqFOkYYIkQTJPzJWVxDuuGcgNJHjM6Qtiphmsa4kkujU6eIA091n0ezaTiHkOLPhnY6S0HQ7eZWvpmA0gN1zsBrO/r5pWuvOfz1xT8S4VTqXrlxZENptJaSf8AMQZ5Wt15KngOFp4dppFxe57nO70OyNOjfQAE7lAnGVMRUytBvvPwjckxDQFoCjTpNDR3nbvOpPTkOnqlZVLnF7QAJzOv3PoG807gWtwE+XXvqUQGCiwUxzLj4n6CB5IEP7QmPJQxVZz3BkwXaOMxr92RWDxoo917SXk5QWiWnwdtpodIQILoyaLfrrNLB5lU1OH1ZFgANyRHpr7JNzxp7hDcd421pl7oAOk+g6ndNw/irHgOyuvzsPZaHsBIB/fsjC6AYVtas6IOxn5qzC95hLdZJPid0Him5pAqFrhoCGlsbA2npMoBnb02Pe2m5zosGEHMdhY2WAOx7rbELosLxBkBggH5nQlZnHf6hZQc1rw45gS2GkgwQP3XnYxVftBUdnlrpDSSANiI9Qup4ji2YltFv6TJtJaCBIMfLfKE+MhsHQKncBrhsUVgOJ4nFOy0aeRu9Spo3/1BuegP1WnxTC0aTAKr3ve4928S6NcrRECdTPirsLxOjRp5WNcYFgBLnH9vNB0MK57vxFeM50b+Vg1A6nqnEBsWJ9glAOKYge5QX4UcvZJav4yn+tn+5v1SS90zo/tVxvW12zmaXHIpNxjCYILT7K6tTQGIoLqdSjJcrXg5otzPzNN9QWmfsLFxuAqOf2naPzC4IMJn5mmQSPBIcTeNYd4iD6hctSlOYXQwwbInDYyo21RhcP1NifNtvUeitrYrCxNR728wGvE/8VQ3i1I/EHN8bj6phUpvs17T5gH0KzE4CLHn1++KwsBMwRy6Kx+KcbE5MM0GllIOYvzFx0ILpgDl8lkYOvWFYPcwGmRlc3Uj/M08+m66StggL5R6KrIBsuZz3TJhXa1kQF0P9PYMMa6qCYdlFNps1rQLlo628IsnrcUDXkHcEDxt/ZZmK4jWFNrGRYakkH1uuexVHEOdmzNsAIJJFpMxzvsuh9cAAMt1JXO2gXGXI7j2Pyw46OdHhYn9o81TguJVS/tKbmSf1SdbbaR4qGM7V7Aw0qR6kuM+LY/dY4/p0EEHfWCQD5SoEMDpB4236KsynLYK9Ko03CtShzXscHOcY0gWI6XCXGaujQbmIHgZk8gsOhxQ0x2bW5KbKTWttmPdyta1obJiPkFrcPotdRbXJJLgTLpEXI0Oi657xpY3IzechYW15bTwvyOYWQ5yq4pxenTDpOd8RAsJjlsPHZcjgcc6q7IG5ryTPdbfUqn+reJmnXLW37oNrwbxN4iwWXwn+pq9Nx7UGqx0WADXM1+CIB8/VI9uN/jOWX7VmMIZLRnx+l3dJwptyt31OklCYjERcqvgeLbi6j2tzNp0wC5zgATm0AHkfRVcc4rhn1QxrgG0+7YiCQb/AE8kVGy23IdbKbQQ6COaRxoeMuaOR5J6vEHA5GXIAOY2G+g3XJmi4V6lSgf8NzgYcCJsJ8LzdH/45cHEtAAIAjmQZJm5t81LC0GSeCsWHQWR9PCszZ3gOcJ7zoJvcxy8kdh6wcYbfnGg81zuI4UatqlR7hynK3/a3XzR3D+Hmm0ta94B2LifQm4Wg0wtNN51VXGcbW7RzWlg2zNJdGuxAh3qo4CpiGjL+IeQRF2s+eqOZgGME6dT+5KrqcQos/MCeTb/ACsFmNxNlQMAEJsPgwNpPMwT6rSw+EAuTCxKvHDpTZHV1/8AiPqh6lWpV+NxI5begsmZSnRDnwM10OJ4xSpWZ33cm6ebtFm1sVVrfGcrf0t/fn5oahQA2RlNq6m0t1zmpsq/wrUkTlSVcA2U8Z3Xob2oerTRZCrc1dMLmBWVXoSszE4VdDUpoerRUyxOHLla1Fw39boKqY1b6Lqq2FWdXwSk6kCrNqLCbiy34aj2+ZA9rK9vFqv6mv8AENPuIKuxGA6LMr8P6KRoApxVWgOO1BZ1Jp8C4fOVIccZ+am8eBafosGphnDRzh5lDvNUfmnxAUzQTioF0x41QOpe3xYf2lO3iNA6VR55h8wuSdiag1a0+RH7qs4529Mev8JT2ZaKoC7Q8SoGYrM83D91OtjqT2BhxAgbCpHyK4Q47/xn1Cgca3/pn2WfxijvWrqHYbDAznYfGoD8ypg0AL1KYH+pv1XI/jG/9M+31T/jB+g+yP4p4p++C7WlxCg1rmds0NdBOV4ExOsHqgXYjCDQjyDz8gVy34s/oT/iHfp9/wCFv8YlL3wXTHidAaZj4NP/ANQq38bZ+Wm4+JaB7SudzvPL3Ugxx3TDswWd8FtP44/8rGjxLj9EPU4vVP54/wBIA/n3QTcOTzRFPCpxQalNYqsku1Jd/qJPzV1Oir6dBE06KoKYCQ1CVVSpIunTU2U1exiphUsSixquaFJlNEU6BK2FmJUwmRv4VJNhS4l3JCiQrCoFWUFW5qqcxEwokLIWyg300O+gtIsVRpowrcSyauFQdbBdFvupqp1FLhTY1y1bAdEHW4f0XXvw6HfhVmFbjXF1eHdEJU4d0XbVMEhn4DoswJu8XFP4d0VTuHrs38P6Kl3D+izAjGuOOAS/ArrTw/ooHh/RGBGNcr+CUhg1054f0TfgOiMCMa51uEVzMKt4YDopDAowIxrGbhlY3DrZbgeiuZgei3AsxrHZh1czDraZgFa3BLcKXGsdmGRVPCrTZhVc3DrcKzGs2nhUXToIxtFWNpJoSyg+wSR/ZpIhYtlygUkkyxMmKSSEJKJSSQhQcqnJJIWqJVTkkliFS5VuSSWIVL1W5JJCFWUzkySEKJSSSQhOFJqZJCFY1XMSSWoVjVMpJIQnarQkktWKTVMJJLEJ0kklq1f/2Q==",
                    "isSale": true,
                    "price": 70,
                    "isBigSize": false,
                    "category": "トッピング",
                    "description": "ナチュラルチーズ",
                    "bigSizeDiffPrice": 0,
                    "isStatus": true,
                    "title": "チーズ",
                    "id": "cmk9c0rZGd22l9WaJQVx"
                },
                {
                    "price": 380,
                    "description": "100年前のカレーを再現",
                    "isStatus": true,
                    "title": "100年カレー",
                    "isSale": true,
                    "image": "https://www.muji.com/public/media/img/item/4547315277384_1260.jpg",
                    "bigSizeDiffPrice": 0,
                    "isBigSize": false,
                    "category": "メイン",
                    "id": "hUASzdfjauyZLzIy9jNx"
                },
                {
                    "isBigSize": false,
                    "id": "kRG6vZQTI0hwxWfre7JP",
                    "title": "鳥マヨ丼",
                    "image": "https://img.kewpie.co.jp/recipes_src/recipe/img/large/QP10000127_1L.jpg",
                    "description": "唐揚げが乗った丼ものです。",
                    "isSale": true,
                    "category": "メイン",
                    "isStatus": true,
                    "price": 430,
                    "bigSizeDiffPrice": 0
                },
                {
                    "title": "うどん",
                    "isBigSize": true,
                    "isSale": true,
                    "description": "100%小麦粉を使っており、もちもちとした食感が味わい深いです。",
                    "bigSizeDiffPrice": 100,
                    "image": "https://www.kamada.co.jp/storage/images/cfiles/72/YnCj3G3z2nJof17nEaezEoII44u71MXtaAuWiTPL_640.jpeg",
                    "price": 430,
                    "isStatus": true,
                    "category": "メイン",
                    "id": "maTpiPKDJHL8qp6Va84A"
                },
                {
                    "isSale": true,
                    "id": "u6ekWFep5AfkeEL9By5B",
                    "isBigSize": false,
                    "title": "唐揚げ",
                    "category": "トッピング",
                    "price": 150,
                    "isStatus": true,
                    "description": "唐揚げ定食の唐揚げ",
                    "image": "https://video.kurashiru.com/production/articles/38eb9a8c-ce4b-4a3f-abbd-9cbd3a4e8d93/image_large.jpg?1553476035",
                    "bigSizeDiffPrice": 0
                },
                {
                    "title": "温泉たまご",
                    "id": "wKcxj1a3ysnsEjc2uhky",
                    "bigSizeDiffPrice": 0,
                    "isSale": true,
                    "description": "有馬温泉から毎日直送する温泉卵",
                    "isBigSize": false,
                    "isStatus": true,
                    "price": 100,
                    "image": "https://www.kai-group.com/contents_file/fun/recipe/detail/waki4_onsentamago/materials_photo.jpg",
                    "category": "トッピング"
                }
            ]);
            setIsGetMenu(true);
        })();
        console.log(navigator.userAgent);

    }, []);

    useEffect(() => {
        orderData.length === 0 && setOrderDialog(false);
    }, [orderData.length]);

    return (
        <div style={{ position: "relative" }}>
            {isGetMenu ? <div>
                <IntegrationNotistack message="公開テストモード" variant="warning" />
                <SwipeTabs category={menuCategoryArray} menu={menu} setChosenMenu={setChosenMenu} setDetailDialogOpen={setDetailDialogOpen} />

                <div style={{ marginBottom: "13vw" }}>
                    <Order open={orderDialog} onDelete={(e, i) => {
                        setOrderData(orderData.filter((_, index) => index !== i))
                        setTotalPrice(totalPrice - e.price)
                    }} orderData={orderData} totalPrice={totalPrice} onPrev={() => {
                        setOrderDialog(false);
                    }} onNext={async (payment, setIsLoad) => {
                        const orderId = await OrderSubmit({
                            user: {
                                uid: auth.currentUser?.uid || "",
                                studentName: auth.currentUser?.displayName || "",
                                mailAddress: auth.currentUser?.email || "",
                            },
                            totalPrice: totalPrice,
                            menu: orderData,
                            payment: payment,
                        })
                        setTimeout(() => {
                            window.location.href = "/order/" + orderId + "/success";
                        }, 1000)

                    }}

                    />
                </div>
                <DetailDialog open={detailDialogOpen} menu={chosenMenu} onNext={(e) => {
                    (e !== undefined) && setOrderData([...orderData, e]);
                    (e !== undefined) && setTotalPrice(totalPrice + e.price);
                    setDetailDialogOpen(false);
                }} onPrev={() => {
                    setDetailDialogOpen(false);
                }} />
                {orderData.length !== 0 && <Cart onClick={() => {
                    setOrderDialog(true);
                }} totalOrderItemsCount={orderData.length} totalPrice={totalPrice} />
                }
            </div> :
                <LoadingAnimation type={"jelly"} />
            }
        </div>
    );
};
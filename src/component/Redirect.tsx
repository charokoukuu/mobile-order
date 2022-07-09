import { signOut } from "firebase/auth";
import { useEffect } from "react"
import { auth } from "../Firebase";
import { LoadingAnimation } from "./LoadingAnimation"

interface RedirectProps {
    url?: string;
    logout?: boolean;
}
export const Redirect = (props: RedirectProps) => {
    useEffect(() => {
        props.url && window.open(props.url);
        props.logout && signOut(auth);
        window.location.href = "/";
        //eslint-disable-next-line
    }, [])
    return (
        <div><LoadingAnimation type={"jelly"} /></div>
    )
}
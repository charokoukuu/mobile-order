interface UserProps {
    uid: string;
    displayName: string;
    email: string;
    photoURL: string;
}
export class UserInfo {
    static user: UserProps = {
        uid: "runticket21",
        displayName: "TestUser",
        email: "example.oit.ac.jp",
        photoURL: "https://t4.ftcdn.net/jpg/03/11/74/55/360_F_311745570_R5lVMe8izhaC3jasrDkI9BZhGzFRnG14.jpg"
    }
}
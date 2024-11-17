import styles from "./profile.module.scss";
import { GetUser } from "@/api/data/user";

export default async function Profile() {
    const user = await GetUser();
    
    return (
        <p>Profile of {user.name}</p>
    )
}
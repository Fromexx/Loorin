import styles from "./profile.module.scss";
import { authConfig } from "../../../configs/auth";
import { getServerSession } from "next-auth";

export default async function Profile() {
    const session = await getServerSession(authConfig);

    return (
        <p>Profile of {session?.user?.name}</p>
    )
}
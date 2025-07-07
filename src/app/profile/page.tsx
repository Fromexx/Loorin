'use client'

import styles from "./profile.module.scss";
import Loading from "../loading";
import { Logout } from "@/utils/helpers/Logout";
import { GetUser } from "@/api/data/user";
import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Profile() {
    const [user, SetUser] = useState(null);
    const pathname = usePathname();
    const previousPath = pathname.slice(0, pathname.lastIndexOf('/'));

    useEffect(() => {
        async function getUser() {
            SetUser(await GetUser());
        }

        getUser();
    }, []);

    if (!user) return <Loading/>;

    return (
        <main>
            <div className={styles.upperPanel} >
                <div className={styles.backButtonContainer} >
                    <Link href={`/${previousPath}`} ><img className={styles.backButton} src="/images/Back.png" /></Link>
                </div>

                <div className={styles.pageNameContainer} ><p className={styles.pageName} >Профиль</p></div>
            </div>

            <div className={styles.profile}>
                <div className={styles.mainInfoContainer}>
                    <img className={styles.avatar} src="images/AuthorizedUserImage.jpg"/>

                    <div className={styles.mainInfo}>
                        <p className={styles.name}>{user.name}</p>

                        <div className={styles.emailContainer}>
                            <p className={styles.email}>{user.email}</p>
                            <button className={styles.emailConfirmButton}>Подтвердить</button>
                        </div>
                        
                        <hr className={styles.horizontalLine}></hr>

                        <div className={styles.deliveryAddress}>
                            <p className={styles.addressHeader}>Адрес доставки:</p>

                            <div className={styles.addressContainer}>
                                <div className={styles.addressField}>
                                    <p className={styles.address}>...</p>
                                </div>

                                <button className={styles.saveAddress}>✅</button>
                            </div>
                        </div>
                    </div>

                    <button className={styles.logout} onClick={() => {
                        signOut();
                        Logout();
                    }} ><img className={styles.logoutImage} src="/images/Logout.png"/></button>
                </div>
            </div>
        </main>
    )
}
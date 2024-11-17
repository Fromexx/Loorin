'use client'

import Products from "@/components/Products/Products";
import styles from "./homeLayout.module.scss";
import React, { useState } from "react";
import Link from "next/link";
import { ClothesTypesEnum } from "@/utils/helpers/ClothesTypesEnum";
import { Recommendations } from "@/utils/data/RecommendationsBase";
import { TShirts } from "@/utils/data/TShirtsBase";
import { Hoodies } from "@/utils/data/HoodiesBase";
import { useComponentWillMount } from "@/utils/helpers/ComponentWillMount";
import { ProductsBaseType } from "@/utils/helpers/Types";
import { Modal } from "../AccountEnterModal/AccountEnterModal";

let productsBase: ProductsBaseType;
const BURGER_MENU_ID = "burgerMenu";

export default function Homelayout({ params }: {
    params: { productsSection: string };
}) {
    const [burgerMenuActive, setBurgerMenuActive] = useState(false);
    const [isModalActive, SetModalActive] = useState(false);

    const Init = () => {
        if(params.productsSection == "Рекомендации") productsBase = Recommendations;
        else if(params.productsSection == ClothesTypesEnum["T-Shirts"]) productsBase = TShirts;
        else if(params.productsSection == ClothesTypesEnum.Hoodies) productsBase = Hoodies;
    }

    const burgerMenuClicked = () => {
        const element = document.getElementById(BURGER_MENU_ID);

        if(burgerMenuActive) {
            element?.setAttribute('style', 'right: -20%');
        }
        else {
            element?.setAttribute('style', 'right: 0;');
        }

        setBurgerMenuActive(!burgerMenuActive);
    }

    const onClose = () => {
        SetModalActive(false);
    }

    useComponentWillMount(Init);

    return (
        <main>
            <Modal onClose={onClose} isActive={isModalActive} />

            <div className={styles.header}>
                <Link href={"/"} className={styles.titleLink} ><h1 className={styles.title}>Loorin</h1></Link>
            </div>
            
            <div className={styles.mainPanel} >
                <Link href={"/cart"} className={styles.cartDiv} >
                    <img className={styles.cart} src="/images/Cart.png" />
                </Link>

                <div className={styles.userAvatarDiv} onClick={() => {SetModalActive(true)}} >
                    <img className={styles.userAvatar} src="/images/UserAvatar.png" />
                </div>

                <div className={styles.search} >
                    <img className={styles.searchIcon} src="/images/Search.png" />

                    <div className={styles.searchField} >
                        <p>...</p>
                    </div>
                </div>

                <div className={burgerMenuActive ? styles.burgerMenuButtonActive : styles.burgerMenuButtonInactive} onClick={burgerMenuClicked} >
                    <span className={styles.bar} />
                    <span className={styles.bar} />
                    <span className={styles.bar} />
                </div>
                
                <nav className={styles.burgerMenu} id={`${BURGER_MENU_ID}`} >
                    {React.Children.toArray(Object.entries(ClothesTypesEnum).map(([key, value]) => (
                        <Link href={`/${key}`} className={styles.burgerMenuItem} >{value}</Link>
                    )))}
                </nav>
            </div>

            <h2 className={styles.ProductsSection} >{params.productsSection}</h2>

            <Products params={{productsBase: productsBase!}} />
        </main>
    )
}
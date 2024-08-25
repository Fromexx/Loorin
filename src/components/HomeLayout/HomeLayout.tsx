'use client'

import Products from "@/components/Products/Products";
import styles from "./homeLayout.module.scss";
import React, { useState } from "react";
import Link from "next/link";
import { ClothesTypes } from "@/utils/data/ClothesTypesBase";
import { Recommendations } from "@/utils/data/RecommendationsBase";
import { TShirts } from "@/utils/data/TShirtsBase";
import { Hoodies } from "@/utils/data/HoodiesBase";

export default function Homelayout({ params }: {
    params: { productsSection: string };
}) {
    const [burgerMenuActive, setBurgerMenuActive] = useState(false);

    const burgerMenuClicked = () => {
        const element = document.getElementById("headerMenu");

        if(burgerMenuActive) {
            element?.setAttribute('style', 'right: -20%');
        }
        else {
            element?.setAttribute('style', 'right: 0;');
        }

        setBurgerMenuActive(!burgerMenuActive);
    }

    const clothesTypes = [];

    for(let element of ClothesTypes) {
        clothesTypes.push(<Link href={`/${element[0]}`} className={styles.headerMenuItem} >{element[1]}</Link>);
    }

    let productsBase;

    if(params.productsSection == "Рекомендации") productsBase = Recommendations;
    else if(params.productsSection == "Футболки") productsBase = TShirts;
    else if(params.productsSection == "Худи") productsBase = Hoodies;

    return (
        <main className={styles.main} >
            <div className={styles.header}>
                <h1 className={styles.title}>Loorin</h1>
            </div>
            
            <div className={styles.mainPanel} >
                <div className={styles.cartDiv} >
                    <img className={styles.cart} src="/images/Cart.png" />
                </div>

                <div className={styles.userAvatarDiv} >
                    <img className={styles.userAvatar} src="/images/UserAvatar.png" />
                </div>

                <div className={styles.search} >
                    <img className={styles.searchIcon} src="/images/Search.png" />

                    <div className={styles.searchField} >
                        <p>...</p>
                    </div>
                </div>

                <div className={burgerMenuActive ? styles.burgerMenuActive : styles.burgerMenuInactive} onClick={burgerMenuClicked} >
                    <span className={styles.bar} />
                    <span className={styles.bar} />
                    <span className={styles.bar} />
                </div>
                
                <nav className={styles.headerMenu} id="headerMenu" >
                    {clothesTypes}
                </nav>
            </div>

            <h2 className={styles.ProductsSection} >{params.productsSection}</h2>

            <Products params={{productsBase: productsBase!}} />
        </main>
    )
}
'use client'

import styles from "./product.module.scss";
import { notFound, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { ClothesTypesEnum } from "@/utils/helpers/ClothesTypesEnum";
import { GetEnumKey } from "@/utils/helpers/EnumHelpers";
import { TShirts } from "@/utils/data/TShirtsBase";
import { Hoodies } from "@/utils/data/HoodiesBase";
import React from "react";

export default function ProductPage({ params }: {
    params: {product: number};
}) {
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    let productData;

    if(isClient) {
        productData = GetProductData(window.location.pathname);

        if(productData == undefined) {
            notFound();
        }
    }

    const router = useRouter();

    return (
        <main className={styles.main} >
            <div className={styles.upperPanel} >
                <img onClick={() => router.back()} className={styles.backButton} src="/images/Back.png" />
            </div>

            <img src="/images/BlackTShirt.jpg" className={styles.productImage} />

            <table className={styles.productInfoTable} >
                <tbody>
                    <tr>
                        <td className={styles.dataName} >Название</td>
                        <td>{productData?.title}</td>
                    </tr>
                    <tr>
                        <td className={styles.dataName} >Цена</td>
                        <td>{productData?.price} р.</td>
                    </tr>
                    <tr>
                        <td className={styles.dataName} >Состав</td>
                        <td>{productData?.material}</td>
                    </tr>
                    <tr>
                        <td className={styles.dataName} >Размер</td>
                        <td>{React.Children.toArray(productData?.sizes.map(size => size + ";"))}</td>
                    </tr>
                    <tr>
                        <td className={styles.dataName} >Цвет</td>
                        <td>{React.Children.toArray(productData?.colors.map(color => color + ";"))}</td>
                    </tr>
                    <tr>
                        <td className={styles.dataName} >Оценка</td>
                        <td>4,9</td>
                    </tr>
                </tbody>
            </table>
        </main>
    )
}

export function GetProductData(pagePathName: string) {
    let pagesNames = pagePathName.split("/");
    pagesNames.shift();

    if(!(pagesNames[0] in ClothesTypesEnum)) return undefined;

    if(pagesNames[0] == GetEnumKey(ClothesTypesEnum, ClothesTypesEnum["T-Shirts"]))
        return TShirts.find((product) => product.art == pagesNames[1]);
    else if(pagesNames[0] == GetEnumKey(ClothesTypesEnum, ClothesTypesEnum.Hoodies))
        return Hoodies.find((product) => product.art == pagesNames[1]);

    return undefined;
}
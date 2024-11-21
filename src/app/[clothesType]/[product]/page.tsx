'use client'

import styles from "./product.module.scss";
import { notFound, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { ClothesTypesEnum } from "@/utils/helpers/ClothesTypesEnum";
import { GetEnumKey } from "@/utils/helpers/EnumHelpers";
import { TShirts } from "@/utils/data/TShirtsBase";
import { Hoodies } from "@/utils/data/HoodiesBase";
import React from "react";
import Link from "next/link";
import { ProductCartAdding } from "@/services/ProductCartAdding";
import { ProductDataType } from "@/utils/helpers/Types";

let selectedSize: string;
let selectedColor: string;
let selectedSizeElement: HTMLElement | null;
let selectedColorElement: HTMLElement | null;
let productData: ProductDataType;

const SizeOptionClicked = (size: string, id: string) => {
    selectedSizeElement?.setAttribute('style', 'border: 1px solid black');

    selectedSize = size;
    selectedSizeElement = document.getElementById(id);

    selectedSizeElement?.setAttribute('style', 'border: 2px solid black');
}

const ColorOptionClicked = (color: string, id: string) => {
    selectedColorElement?.setAttribute('style', 'border: 1px solid black');
    
    selectedColor = color;
    selectedColorElement = document.getElementById(id);

    selectedColorElement?.setAttribute('style', 'border: 2px solid black');
}

export default function ProductPage() {
    const [isClient, SetIsClient] = useState(false)
    const pathname = usePathname();
    const previousPath = pathname.slice(0, pathname.lastIndexOf('/'));

    useEffect(() => {
        SetIsClient(true)
    }, [])


    if(isClient) {
        productData = GetProductData(window.location.pathname);

        if(productData == undefined) {
            notFound();
        }
    }

    return (
        <main>
            <div className={styles.upperPanel} >
                <div className={styles.backButtonContainer} >
                    <Link href={previousPath} ><img className={styles.backButton} src="/images/Back.png" /></Link>
                </div>

                <div className={styles.productTitleContainer} ><p className={styles.productTitle} >{productData?.title}</p></div>
            </div>

            <img src="/images/BlackTShirt.jpg" className={styles.productImage} />

            <table className={styles.productInfoTable} >
                <tbody>
                    <tr>
                        <td className={styles.dataName} >Цена</td>
                        <td className={styles.dataValue} >{productData?.price} р.</td>
                    </tr>
                    <tr>
                        <td className={styles.dataName} >Состав</td>
                        <td className={styles.dataValue} >{productData?.material}</td>
                    </tr>
                    <tr>
                        <td className={styles.dataName} >Размер</td>
                        <td className={styles.dataOptionValue} >
                            <div className={styles.options} >
                                {React.Children.toArray(productData?.sizes.map(size =>
                                    <div className={styles.productOption} id={`${size}Option`} onClick={() => {
                                        let id = size + "Option";
                                        SizeOptionClicked(size, id)}} >
                                        {size}
                                    </div>
                                ))}
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className={styles.dataName} >Цвет</td>
                        <td className={styles.dataOptionValue} >
                            <div className={styles.options} >
                                {React.Children.toArray(productData?.colors.map(color =>
                                    <div className={styles.productOption} id={`${color}Option`} onClick={() => {
                                        let id = color + "Option";
                                        ColorOptionClicked(color, id)}} >
                                        {color}
                                    </div>
                                ))}
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className={styles.dataName} >Оценка</td>
                        <td className={styles.dataValue} >4,9</td>
                    </tr>
                </tbody>
            </table>

            <button className={styles.addToCartButton} onClick={() => {
                if(selectedSize == undefined || selectedColor == undefined) return;
                ProductCartAdding(productData, selectedSize, selectedColor);
            }} >В корзину</button>
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
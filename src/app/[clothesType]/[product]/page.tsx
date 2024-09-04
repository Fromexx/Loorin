'use client'

import styles from "./product.module.scss";
import { notFound, useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { ClothesTypesEnum } from "@/utils/helpers/ClothesTypesEnum";
import { GetEnumKey } from "@/utils/helpers/EnumHelpers";
import { TShirts } from "@/utils/data/TShirtsBase";
import { Hoodies } from "@/utils/data/HoodiesBase";
import React from "react";
import Link from "next/link";

let selectedSize;
let selectedColor;
let selectedSizeElement: HTMLElement | null;
let selectedColorElement: HTMLElement | null;

export default function ProductPage() {
    const [isClient, setIsClient] = useState(false)
    const router = useRouter()
    const pathname = usePathname();

    const previousPath = pathname.slice(0, pathname.lastIndexOf('/'));
    console.log(previousPath);

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

    return (
        <main className={styles.main} >
            <div className={styles.upperPanel} >
                <Link href={previousPath} ><img className={styles.backButton} src="/images/Back.png" /></Link>
            </div>

            <img src="/images/BlackTShirt.jpg" className={styles.productImage} />

            <table className={styles.productInfoTable} >
                <tbody>
                    <tr>
                        <td className={styles.dataName} >Название</td>
                        <td className={styles.dataValue} >{productData?.title}</td>
                    </tr>
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
                                    SizeOptionClicked(size, id)
                                }} >{size}</div>))}
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
                                    ColorOptionClicked(color, id)
                                }} >{color}</div>))}
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className={styles.dataName} >Оценка</td>
                        <td className={styles.dataValue} >4,9</td>
                    </tr>
                </tbody>
            </table>

            <button className={styles.addToCartButton} >В корзину</button>
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
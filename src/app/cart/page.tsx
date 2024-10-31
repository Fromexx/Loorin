'use client'

import styles from "./cart.module.scss";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { OrdersBase } from "@/utils/data/OrdersBase";
import React, { useState, useEffect } from "react";

const BUY_BUTTON_ID = "buyButton";

export default function CartPage() {
    const [elementDeleting, SetElementDeleting] = useState(false);
    const pathname = usePathname();

    const previousPath = pathname.slice(0, pathname.lastIndexOf('/'));

    useEffect(() => {
        let element = document.getElementById(BUY_BUTTON_ID);

        if(OrdersBase.length == 0) element?.setAttribute('style', 'display: none');
        else element?.setAttribute('style', 'display: block');
    });

    return (
        <main>
            <div className={styles.upperPanel} >
                <div className={styles.backButtonContainer} >
                    <Link href={`/${previousPath}`} ><img className={styles.backButton} src="/images/Back.png" /></Link>
                </div>

                <div className={styles.pageNameContainer} ><p className={styles.pageName} >Корзина</p></div>
            </div>

                {React.Children.toArray(OrdersBase.map(order => (
                    <div className={styles.productOrder} >
                        <div className={styles.deleteProductButton} onClick={() => {
                            OrdersBase.splice(OrdersBase.indexOf(order), 1);
                            SetElementDeleting(!elementDeleting);
                        }} ><img className={styles.deleteProductImage} src="/images/Cross.png" /></div>

                        <div className={styles.productCard} >
                            <div className={styles.productImageContainer} ><img className={styles.productImage} src={order.image} /></div>

                            <table className={styles.productInfoTable} >
                                <tbody>
                                    <tr style={{'borderTop': 0, 'borderLeft': 0}} >
                                        <td className={styles.dataName} >Цена</td>
                                        <td className={styles.dataValue} >{order.price} р.</td>
                                    </tr>
                                    <tr style={{'borderLeft': 0}} >
                                        <td className={styles.dataName} >Состав</td>
                                        <td className={styles.dataValue} >{order.material}</td>
                                    </tr>
                                    <tr style={{'borderLeft': 0}} >
                                        <td className={styles.dataName} >Размер</td>
                                        <td className={styles.dataValue} >{order.size}</td>
                                    </tr>
                                    <tr style={{'borderLeft': 0, 'borderBottom': 0}} >
                                        <td className={styles.dataName} >Цвет</td>
                                        <td className={styles.dataValue} >{order.color}</td>
                                    </tr>
                                </tbody>
                            </table>

                            <div className={styles.designDescription} >{order.description}</div>
                        </div>
                    </div>
                )))}

            <div className={styles.wrapper} id={BUY_BUTTON_ID} ><button className={styles.buyButton} >Заказать</button></div>
        </main>
    )
}
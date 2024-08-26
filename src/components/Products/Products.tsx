import Link from "next/link";
import styles from "./products.module.scss";
import React from "react";

export default function Products({ params }: {
    params: { productsBase: { title: string; image: string; price: number; }[] }; 
}) {

    return (
        <div className={styles.ProductsContainer}>
            {React.Children.toArray(params.productsBase.map(product => (
                <Link href={""} className={styles.ProductCart} >
                    <p className={styles.ProductTitle} >{product.title}</p>
                    <img className={styles.ProductImage} src={product.image} />
                    <p className={styles.ProductPrice} >{product.price} р.</p>
                </Link>
            )))}
        </div>
    )
}
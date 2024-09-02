import Link from "next/link";
import styles from "./products.module.scss";
import React from "react";
import { ClothesTypesEnum } from "@/utils/helpers/ClothesTypesEnum";
import { GetEnumKey } from "@/utils/helpers/EnumHelpers";
import { Recommendations } from "@/utils/data/RecommendationsBase";

export default function Products({ params }: {
    params: { productsBase:  typeof Recommendations};
}) {
    return (
        <div className={styles.ProductsContainer}>
            {React.Children.toArray(params.productsBase.map(product => (
                <Link href={`/${GetEnumKey(ClothesTypesEnum, product.type)}/${product.art}`} className={styles.ProductCart} >
                    <p className={styles.ProductTitle} >{product.title}</p>
                    <img className={styles.ProductImage} src={product.image} />
                    <p className={styles.ProductPrice} >{product.price} р.</p>
                </Link>
            )))}
        </div>
    )
}
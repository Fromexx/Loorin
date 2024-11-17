import Link from "next/link";
import styles from "./products.module.scss";
import React from "react";
import { ClothesTypesEnum } from "@/utils/helpers/ClothesTypesEnum";
import { GetEnumKey } from "@/utils/helpers/EnumHelpers";
import { ProductsBaseType } from "@/utils/helpers/Types";

export default function Products({ params }: {
    params: { productsBase: ProductsBaseType};
}) {
    return (
        <div className={styles.ProductsContainer}>
            {React.Children.toArray(params.productsBase.map(product => (
                <Link href={`/${GetEnumKey(ClothesTypesEnum, product.type)}/${product.art}`} className={styles.ProductCard} >
                    <p className={styles.ProductTitle} >{product.title}</p>
                    <img className={styles.ProductImage} src={product.image} />
                    <p className={styles.ProductPrice} >{product.price} р.</p>
                </Link>
            )))}
        </div>
    )
}
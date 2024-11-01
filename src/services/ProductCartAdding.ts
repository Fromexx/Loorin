import { ConcreteProductType, ProductDataType } from "@/utils/helpers/Types";
import { OrdersBase } from "@/utils/data/OrdersBase";

export function ProductCartAdding(productData: ProductDataType, size: string, color: string) {
    let concreteProductData = {} as ConcreteProductType;
    concreteProductData.title = productData.title;
    concreteProductData.image = productData.image;
    concreteProductData.price = productData.price;
    concreteProductData.type = productData.type;
    concreteProductData.art = productData.art;
    concreteProductData.material = productData.material;
    concreteProductData.size = size;
    concreteProductData.color = color;
    concreteProductData.description = productData.description;

    OrdersBase.push(concreteProductData);
}
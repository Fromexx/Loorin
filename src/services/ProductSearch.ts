import { TShirts } from "@/utils/data/TShirtsBase";
import { Hoodies } from "@/utils/data/HoodiesBase";
import { ProductDataType } from "@/utils/helpers/Types";

export function Search(searchRequest: string) {
    let result: Array<ProductDataType> = [];

    TShirts.map((product) => {
        if(product.title.includes(searchRequest)) result.push(product);
    });

    Hoodies.map((product) => {
        if(product.title.includes(searchRequest)) result.push(product);
    });

    return result;
}
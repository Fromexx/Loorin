import { ClothesTypesEnum } from "./ClothesTypesEnum"

export type ProductsBaseType = {
    title: string;
    image: string;
    price: number;
    type: ClothesTypesEnum;
    art: string;
    material: string;
    sizes: string[];
    colors: string[];
    description: string;
}[];

export type ProductDataType = {
    title: string;
    image: string;
    price: number;
    type: ClothesTypesEnum;
    art: string;
    material: string;
    sizes: string[];
    colors: string[];
    description: string;
};

export type ConcreteProductType = {
    title: string;
    image: string;
    price: number;
    type: ClothesTypesEnum;
    art: string;
    material: string;
    size: string;
    color: string;
    description: string;
};

export type ConcreteUserType = {
    name: string;
    email: string;
}
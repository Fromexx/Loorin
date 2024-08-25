import Homelayout from "@/components/HomeLayout/HomeLayout";
import { notFound } from "next/navigation";
import { ClothesTypes } from "@/utils/data/ClothesTypesBase";

export default function ClothesTypePage({ params }: {
    params: { clothesType: string };
}) {
    if(!ClothesTypes.has(params.clothesType)) notFound();

    return (
        <Homelayout params={{productsSection: ClothesTypes.get(params.clothesType)!}} />
    )
}
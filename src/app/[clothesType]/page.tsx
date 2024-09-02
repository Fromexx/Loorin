import Homelayout from "@/components/HomeLayout/HomeLayout";
import { notFound } from "next/navigation";
import { ClothesTypesEnum } from "@/utils/helpers/ClothesTypesEnum";
import { GetEnumValue } from "@/utils/helpers/EnumHelpers";

export default function ClothesTypePage({ params }: {
    params: { clothesType: string };
}) {
    if(!(params.clothesType in ClothesTypesEnum)) notFound();

    return (
        <Homelayout params={{productsSection: GetEnumValue(ClothesTypesEnum, params.clothesType)!}} />
    )
}
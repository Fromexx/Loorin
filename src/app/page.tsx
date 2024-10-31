import Homelayout from "@/components/HomeLayout/HomeLayout";
import { Providers } from "@/components/Providers";

export default function Home() {
    return (
        <Providers>
            <Homelayout params={{productsSection:"Рекомендации"}} />
        </Providers>
    )
}
import type { AuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import YandexProvder from "next-auth/providers/yandex";
import VkProvider from "next-auth/providers/vk";

export const authConfig: AuthOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),
        YandexProvder({
            clientId: process.env.YANDEX_ID,
            clientSecret: process.env.YANDEX_SECRET
        }),
        VkProvider({
            clientId: process.env.VK_ID,
            clientSecret: process.env.VK_SECRET,
            // authorization: {
            //     params: { 
            //         scope: "email"
            //     }
            // }
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
}

/*
@media screen and (min-width: 480px) {
    
}

@media screen and (min-width: 600) {
    
}

@media screen and (min-width: 768) {
    
}

@media screen and (min-width: 1024) {
    
}
*/
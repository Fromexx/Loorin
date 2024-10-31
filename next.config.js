/** @type {import('next').NextConfig} */

module.exports = {
    reactStrictMode: true,
    experimental: {
        serverActions: {
            serverActionsBodySizeLimit: "4mb"
        }
    }
}
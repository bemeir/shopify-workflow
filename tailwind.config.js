module.exports = {
    content: ["./src/**/*.{html,js,liquid}"],
    theme: {

        container: {
            screens: {
                sm: '640px',
                md: '768px',
                lg: '1024px',
                xl: '1280px',
                '2xl': '1440px'
            },
        },
        extend: {
            colors: {
                'theme-brown': '#634939',
                'theme-grey': '#DFDFDF',
                'theme-light-grey': '#F8F8F8'

            }
        },
    },
    plugins: [],
}
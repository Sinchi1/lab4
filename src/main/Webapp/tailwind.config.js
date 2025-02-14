/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            screens: {
                'sm': '703px',
                'lg': '1219px',
            },
        },
    },
    plugins: [],
}
import {Config} from 'tailwindcss';

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx}', // Scan pages in the src/pages folder
        './src/components/**/*.{js,ts,jsx,tsx}', // Scan components in the src/components folder
        './src/app/**/*.{js,ts,jsx,tsx}', // Scan app directory (if using App Router)
        './src/types/**/*.{ts}',
    ],
    theme: {
        extend: {
            fontSize: {
                'xxs': '0.625rem', // 10px
            },
            fontFamily: {
                caveat: ['Caveat', 'cursive'],
                fredoka: ['Fredoka One', 'cursive'],
                graduate: ['Graduate', 'cursive'],
                gravitas: ['Gravitas One', 'cursive'],
                playfair: ['Playfair Display', 'serif'],
                poppins: ['Poppins', 'sans-serif'],
                georgia: ['Georgia', 'serif'],
                helvetica: ['Helvetica', 'sans-serif'],
            },
            animation: {
                'spin-slow': 'spin 5s linear infinite', // Slower spinning animation
                'spin-medium': 'spin 2s linear infinite', // Medium speed
                'spin-fast': 'spin 1s linear infinite', // Fast spinning
            },
        },
    },

    plugins: [],
};

export default config;

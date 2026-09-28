export default {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx,astro}'],
    theme: {
        extend: {
            colors: {
                gold: {
                    light: '#FDF1B8',
                    DEFAULT: '#D4AF37',
                    dark: '#997A15',
                },
                dark: {
                    DEFAULT: '#020202',
                    surface: '#0A0A0A',
                    glass: 'rgba(5, 5, 5, 0.6)',
                },
                orion: {
                    bg: '#0a0d14',
                    border: '#1a1f2e',
                    orange: '#FF5B00',
                },
            },
            fontFamily: {
                heading: ['Cinzel', 'serif'],
                sans: ['Inter', 'sans-serif'],
                montserrat: ['Montserrat', 'sans-serif'],
            },
            letterSpacing: {
                widest: '.25em',
            },
        },
    },
    plugins: [],
};

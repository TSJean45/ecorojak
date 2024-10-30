/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter-Regular', 'sans-serif'],
        bold: ['Inter-Bold'],   
        semibold: ['Inter-Semibold'],   
      },
      colors: {
        tiffany: '#73D1C0',    
        chat: 'rgba(115,209,192,0.5)',    
        green: '#1F8B65',  
        celeste: '#ACF2EC',     
        white: '#F8FFFF',     
        peach: '#E3CA93',  
        tomato: '#E86349',     
        tangerine: '#F38F37',         
        brown: '#56534A',     
        black: '#0B1418',  
        gray: '#9A9A9A',
        textInput: '#F8FAFC',    
        textBorder: '#EDEDED',
      },
    },
  },
  plugins: [],
};

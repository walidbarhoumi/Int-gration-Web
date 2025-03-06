/** @type {import('tailwindcss').Config} */
module.exports = {
<<<<<<< HEAD
    content: ["./**/*.{html,js}"],
    theme: {
        extend: {
            colors: {

            },
            fontFamily: {

            },
        },
    },
    plugins: [],
} 
=======
  content: ["./*.html", "./src/**/*.html"],
  theme: {
    extend: {
      colors: {
        primary: "#E63946",  // Rouge de ta bannière
        secondary: "#457B9D", // Bleu optionnel si besoin
        background: "#F7F9FC", // Couleur de fond de la maquette
        textDark: "#333333", // Texte sombre si besoin
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"], // Police moderne, à adapter si ta maquette a une autre typo
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
    },
  },
  plugins: [],
}
>>>>>>> fc8309c (Ajout du projet LunchBox Pro)

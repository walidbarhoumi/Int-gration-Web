// Configuration du site LunchBox Pro
const config = {
    siteName: 'LunchBox Pro',
    currency: '€',
    taxRate: 0.2,
    shippingThreshold: 50, // Livraison gratuite à partir de 50€
    shippingCost: 4.99,
    carouselAutoplay: true,
    carouselInterval: 5000, // 5 secondes entre chaque slide
};

// Produits disponibles
const products = [
    {
        id: 1,
        name: 'Set de couverts nomades',
        description: 'Un set complet de couverts réutilisables incluant couteau, cuillère et sets de baguettes. Une solution compacte et hygiénique.',
        price: 14.99,
        image: 'couverts.jpg',
        stock: 25,
        category: 'accessoires'
    },
    {
        id: 2,
        name: 'Pochette isotherme',
        description: 'Pochette isotherme en matériau résistant et doublure thermique. Conserve vos repas chauds ou froids pendant plusieurs heures. Facile à transporter.',
        price: 19.99,
        image: 'pochette.jpg',
        stock: 18,
        category: 'accessoires'
    },
    {
        id: 3,
        name: 'Pack de séparateurs',
        description: 'Lot de 3 séparateurs amovibles et ajustables en silicone alimentaire, idéals pour compartimenter votre repas et éviter le mélange des odeurs dans votre lunch box.',
        price: 9.99,
        image: 'separateurs.jpg',
        stock: 32,
        category: 'accessoires'
    },
    {
        id: 4,
        name: 'Sangle de transport',
        description: 'Sangle élastique résistante avec fermeture antidérapante permettant de sécuriser votre lunch box pendant le transport. Compatible avec différents formats.',
        price: 7.99,
        image: 'sangle.jpg',
        stock: 40,
        category: 'accessoires'
    }
];

// Panier d'achat
let cart = [];

// Fonctions du site
document.addEventListener('DOMContentLoaded', function() {
    // Gestion du carousel
    const productContainer = document.querySelector('.product-container');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const dots = document.querySelectorAll('.dot');
    
    let currentSlide = 0;
    const slideWidth = document.querySelector('.product-card').offsetWidth + 16; // 16px de gap
    
    // Fonction pour naviguer dans le carousel
    function goToSlide(slideIndex) {
        if (slideIndex < 0) {
            slideIndex = 0;
        } else if (slideIndex > products.length - 1) {
            slideIndex = products.length - 1;
        }
        
        currentSlide = slideIndex;
        productContainer.style.transform = `translateX(-${slideIndex * slideWidth}px)`;
        
        // Mise à jour des dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === Math.floor(slideIndex / 2));
        });
    }
    
    // Event listeners pour les boutons du carousel
    prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
    nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));
    
    // Event listeners pour les dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index * 2));
    });
    
    // Autoplay du carousel si activé
    let carouselInterval;
    if (config.carouselAutoplay) {
        carouselInterval = setInterval(() => {
            const nextSlide = (currentSlide + 1) % products.length;
            goToSlide(nextSlide);
        }, config.carouselInterval);
        
        // Arrêter l'autoplay au survol
        productContainer.addEventListener('mouseenter', () => {
            clearInterval(carouselInterval);
        });
        
        // Reprendre l'autoplay quand la souris quitte
        productContainer.addEventListener('mouseleave', () => {
            carouselInterval = setInterval(() => {
                const nextSlide = (currentSlide + 1) % products.length;
                goToSlide(nextSlide);
            }, config.carouselInterval);
        });
    }
    
    // Gestion des boutons "Ajouter au pack"
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    addToCartButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const product = products[index];
            
            // Vérifier si le produit est déjà dans le panier
            const existingProductIndex = cart.findIndex(item => item.id === product.id);
            
            if (existingProductIndex !== -1) {
                // Incrémenter la quantité
                cart[existingProductIndex].quantity += 1;
            } else {
                // Ajouter le produit au panier
                cart.push({
                    ...product,
                    quantity: 1
                });
            }
            
            // Afficher une notification
            alert(`${product.name} ajouté au panier !`);
            
            // Mettre à jour l'affichage du panier (à implémenter)
            updateCartDisplay();
        });
    });
    
    // Fonction pour mettre à jour l'affichage du panier
    function updateCartDisplay() {
        console.log('Panier actuel:', cart);
        // Implémentation à venir pour afficher le panier dans l'interface
    }
    
    // Calcul du total du panier
    function calculateCartTotal() {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }
    
    // Calcul des frais de livraison
    function calculateShipping() {
        const subtotal = calculateCartTotal();
        return subtotal >= config.shippingThreshold ? 0 : config.shippingCost;
    }
});
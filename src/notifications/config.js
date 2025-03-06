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

// Notifications
const notifications = [
    {
        id: 1,
        title: 'Votre commande est en route',
        content: 'Votre Lunch Box Électrique Pro a été expédiée. Livraison prévue demain.',
        time: '2 heures',
        type: 'commande',
        icon: '📦',
        read: false,
        action: {
            text: 'Suivre la livraison',
            url: '#'
        },
        group: 'Aujourd\'hui'
    },
    {
        id: 2,
        title: 'Promotion exclusive',
        content: '-20% sur tous les accessoires pour votre Lunch Box !',
        time: '4 heures',
        type: 'promotion',
        icon: '🏷️',
        read: false,
        action: {
            text: 'Voir l\'offre',
            url: '#'
        },
        group: 'Aujourd\'hui'
    },
    {
        id: 3,
        title: 'Donnez votre avis',
        content: 'Comment trouvez-vous votre nouvelle Lunch Box Électrique ?',
        time: '3 jours',
        type: 'avis',
        icon: '⭐',
        read: true,
        action: {
            text: 'Laisser un avis',
            url: '#'
        },
        group: 'Cette semaine'
    }
];

// Panier d'achat
let cart = [];

// Fonctions du site
document.addEventListener('DOMContentLoaded', function() {
    // Vérifier si nous sommes sur la page d'accueil (index.html)
    const isHomePage = !window.location.pathname.includes('notifications.html');
    
    if (isHomePage) {
        initializeHomePage();
    } else {
        initializeNotificationsPage();
    }
    
    // Fonction pour initialiser la page d'accueil
    function initializeHomePage() {
        // Gestion du carousel
        const productContainer = document.querySelector('.product-container');
        const prevBtn = document.querySelector('.prev');
        const nextBtn = document.querySelector('.next');
        const dots = document.querySelectorAll('.dot');
        
        if (!productContainer || !prevBtn || !nextBtn) return;
        
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
    }
    
    // Fonction pour initialiser la page de notifications
    function initializeNotificationsPage() {
        const tabButtons = document.querySelectorAll('.tab-btn');
        const markAllReadBtn = document.querySelector('.mark-read-btn');
        const notificationItems = document.querySelectorAll('.notification-item');
        
        // Gestion des onglets
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Retirer la classe active de tous les onglets
                tabButtons.forEach(btn => btn.classList.remove('active'));
                
                // Ajouter la classe active à l'onglet cliqué
                button.classList.add('active');
                
                // Filtrer les notifications selon l'onglet
                const tabType = button.textContent.toLowerCase();
                
                // Logique de filtrage des notifications
                filterNotifications(tabType);
            });
        });
        
        // Fonction pour filtrer les notifications
        function filterNotifications(tabType) {
            notificationItems.forEach(item => {
                // Logique de filtrage selon le type d'onglet
                // Pour l'exemple, on affiche toutes les notifications
                item.style.display = 'flex';
                
                // Exemple de filtrage (à adapter selon vos besoins)
                if (tabType === 'non lues') {
                    // Afficher uniquement les notifications non lues
                    // Pour l'exemple, on cache la dernière notification
                    if (item === notificationItems[notificationItems.length - 1]) {
                        item.style.display = 'none';
                    }
                } else if (tabType === 'commandes') {
                    // Afficher uniquement les notifications de commande
                    // Pour l'exemple, on cache la deuxième notification
                    if (item === notificationItems[1]) {
                        item.style.display = 'none';
                    }
                } else if (tabType === 'promotions') {
                    // Afficher uniquement les notifications de promotion
                    // Pour l'exemple, on cache la première et la dernière notification
                    if (item === notificationItems[0] || item === notificationItems[2]) {
                        item.style.display = 'none';
                    }
                }
            });
        }
        
        // Marquer toutes les notifications comme lues
        markAllReadBtn.addEventListener('click', () => {
            notificationItems.forEach(item => {
                // Ajouter une classe pour indiquer que la notification a été lue
                item.classList.add('read');
                
                // Mettre à jour le statut des notifications dans le tableau
                notifications.forEach(notification => {
                    notification.read = true;
                });
            });
            
            // Afficher un message de confirmation
            alert('Toutes les notifications ont été marquées comme lues.');
        });
        
        // Gestion des actions sur les notifications
        notificationItems.forEach(item => {
            item.addEventListener('click', event => {
                // Empêcher le clic sur les liens d'action de déclencher le clic sur la notification
                if (event.target.closest('.action-link')) {
                    return;
                }
                
                // Marquer la notification comme lue
                item.classList.add('read');
                
                // Rediriger vers la page correspondante (à implémenter)
                // window.location.href = 'page-details.html';
            });
        });
    }
    
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
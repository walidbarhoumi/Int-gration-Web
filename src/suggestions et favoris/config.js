document.addEventListener('DOMContentLoaded', function() {
    // Gestion des onglets
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Retirer la classe active de tous les boutons
            tabBtns.forEach(b => b.classList.remove('active'));
            // Ajouter la classe active au bouton cliqué
            this.classList.add('active');
            
            // Masquer tous les contenus d'onglets
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Afficher le contenu correspondant
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Gestion des filtres
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Retirer la classe active de tous les boutons de filtre
            filterBtns.forEach(b => b.classList.remove('active'));
            // Ajouter la classe active au bouton cliqué
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // Afficher tous les produits si le filtre est "all"
            if (filter === 'all') {
                productCards.forEach(card => {
                    card.style.display = 'block';
                });
            } else {
                // Sinon, filtrer les produits
                productCards.forEach(card => {
                    if (card.getAttribute('data-category') === filter) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            }
        });
    });
    
    // Gestion du panier
    const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
    const cartCount = document.querySelector('.cart-count');
    let cartItems = 0;
    
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Incrémenter le compteur du panier
            cartItems++;
            cartCount.textContent = cartItems;
            
            // Animation du bouton
            this.textContent = 'Ajouté !';
            this.style.backgroundColor = '#4CAF50';
            
            // Récupérer les informations du produit
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = productCard.querySelector('.price').textContent;
            
            // Afficher un message de confirmation
            setTimeout(() => {
                alert(`${productName} (${productPrice}) a été ajouté à votre panier !`);
                this.textContent = 'Ajouter au panier';
                this.style.backgroundColor = '#ff6b6b';
            }, 1000);
            
            // Sauvegarder le panier dans le localStorage (simulation)
            const cart = JSON.parse(localStorage.getItem('cart') || '[]');
            cart.push({
                name: productName,
                price: productPrice,
                quantity: 1
            });
            localStorage.setItem('cart', JSON.stringify(cart));
        });
    });
    
    // Initialisation du compteur de panier depuis le localStorage
    const initCart = () => {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        cartItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = cartItems;
    };
    
    // Initialisation
    initCart();
    
    // Gestion de la newsletter
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            if (email && /^\S+@\S+\.\S+$/.test(email)) {
                alert(`Merci de vous être inscrit à notre newsletter avec l'adresse : ${email}`);
                emailInput.value = '';
            } else {
                alert('Veuillez entrer une adresse email valide.');
            }
        });
    }
});
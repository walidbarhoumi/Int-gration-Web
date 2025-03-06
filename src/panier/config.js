// Formatage du numéro de carte
document.addEventListener('DOMContentLoaded', function() {
    const cardNumberInput = document.getElementById('card-number');
    const expiryInput = document.getElementById('expiry');
    const cvvInput = document.getElementById('cvv');
    
    // Formatage du numéro de carte avec des espaces tous les 4 chiffres
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
            let formattedValue = '';
            
            for (let i = 0; i < value.length; i++) {
                if (i > 0 && i % 4 === 0) {
                    formattedValue += ' ';
                }
                formattedValue += value[i];
            }
            
            e.target.value = formattedValue;
        });
    }
    
    // Formatage de la date d'expiration (MM/AA)
    if (expiryInput) {
        expiryInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length > 0) {
                if (value.length <= 2) {
                    e.target.value = value;
                } else {
                    e.target.value = value.slice(0, 2) + '/' + value.slice(2, 4);
                }
                
                // Validation du mois (01-12)
                let month = parseInt(value.slice(0, 2));
                if (month > 12) {
                    e.target.value = '12' + e.target.value.slice(2);
                }
                if (month === 0) {
                    e.target.value = '01' + e.target.value.slice(2);
                }
            }
        });
    }
    
    // Validation des boutons de paiement
    const paymentButtons = document.querySelectorAll('.payment-buttons button');
    
    paymentButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Vérification des champs
            const cardNumber = cardNumberInput ? cardNumberInput.value.replace(/\s+/g, '') : '';
            const expiry = expiryInput ? expiryInput.value : '';
            const cvv = cvvInput ? cvvInput.value : '';
            
            let isValid = true;
            let errorMessage = '';
            
            if (cardNumber.length !== 16) {
                isValid = false;
                errorMessage = 'Numéro de carte invalide';
            } else if (expiry.length !== 5) {
                isValid = false;
                errorMessage = 'Date d\'expiration invalide';
            } else if (cvv.length !== 3) {
                isValid = false;
                errorMessage = 'CVV invalide';
            }
            
            if (isValid) {
                alert('Paiement effectué avec succès !');
            } else {
                alert('Erreur : ' + errorMessage);
            }
        });
    });
    
    // Calcul du total (simulation)
    const updateTotal = () => {
        const productPrice = 89.99;
        const shippingPrice = 5.99;
        const total = productPrice + shippingPrice;
        
        const totalElements = document.querySelectorAll('.total span:last-child');
        totalElements.forEach(el => {
            el.textContent = total.toFixed(2) + ' €';
        });
    };
    
    // Initialisation
    updateTotal();
});
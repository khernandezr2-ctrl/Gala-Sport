// ===== Products Data =====
const products = [
    {
        id: 1,
        name: "Camiseta Colombia Local Masculina 2026",
        category: "colombia",
        price: 100000,
        image: "https://698522d3d75ce97092feb515.imgix.net/WhatsApp%20Image%202026-02-05%20at%205.29.53%20PM.jpeg",
        description: "Camiseta oficial de Colombia, diseño local con colores tradicionales amarillo, azul y rojo."
    },
    {
        id: 2,
        name: "Camiseta Colombia Local Femenina 2026",
        category: "colombia",
        price: 100000,
        image: "https://698522d3d75ce97092feb515.imgix.net/1.jpeg",
        description: "Camiseta oficial de visitante, diseño moderno con detalles únicos."
    },
    {
        id: 3,
        name: "Camiseta Real Madrid Local",
        category: "clubes",
        price: 249900,
        image: "https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aae?w=400",
        description: "Camiseta oficial del Real Madrid, color blanco tradicional con detalles dorados."
    },
    {
        id: 4,
        name: "Camiseta Barcelona Local",
        category: "clubes",
        price: 249900,
        image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=400",
        description: "Camiseta icónica del FC Barcelona con rayas azulgrana."
    },
    {
        id: 5,
        name: "Camiseta España Local 2026",
        category: "internacional",
        price: 120000,
        image: "https://698522d3d75ce97092feb515.imgix.net/Espa%C3%B1a.jpeg",
        description: "Camiseta del Manchester United con el clásico rojo del Old Trafford."
    },
    {
        id: 6,
        name: "Camiseta Portugal Local 2026",
        category: "internacional",
        price: 120000,
        image: "https://698522d3d75ce97092feb515.imgix.net/Portugal.jpeg",
        description: "Camiseta del Paris Saint-Germain con diseño azul marino y detalles rojos."
    },
    {
        id: 7,
        name: "Camiseta Argentina Local 2026",
        category: "internacional",
        price: 120000,
        image: "https://698522d3d75ce97092feb515.imgix.net/Argentina.jpeg",
        description: "Camiseta de Argentina con las tres estrellas de campeón mundial."
    },
    {
        id: 8,
        name: "Camiseta Atlético Nacional",
        category: "clubes",
        price: 169900,
        image: "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=400",
        description: "Camiseta del rey de copas colombiano, Atlético Nacional."
    },
    {
        id: 9,
        name: "Camiseta Millonarios FC",
        category: "clubes",
        price: 169900,
        image: "https://images.unsplash.com/photo-1553778263-73a83bab9b0c?w=400",
        description: "Camiseta embajadora del equipo más grande de Colombia."
    },
    {
        id: 10,
        name: "Camiseta Alemania Local 2026",
        category: "internacional",
        price: 120000,
        image: "https://698522d3d75ce97092feb515.imgix.net/Alemania.jpeg",
        description: "Camiseta del gigante bávaro, Bayern Munich con rojo intenso."
    },
    {
        id: 11,
        name: "Camiseta Brasil Selección",
        category: "internacional",
        price: 199900,
        image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400",
        description: "Camiseta amarilla y verde del pentacampeón del mundo."
    },
    {
        id: 12,
        name: "Camiseta Liverpool FC",
        category: "internacional",
        price: 239900,
        image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400",
        description: "Camiseta roja del Liverpool con el escudo de Anfield."
    }
];

// ===== State Management =====
let cart = [];
let currentFilter = 'all';

// ===== Theme Toggle =====
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

// Load theme from localStorage
const savedTheme = localStorage.getItem('theme') || 'dark';
htmlElement.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// ===== Products Rendering =====
function renderProducts(filter = 'all') {
    const productsGrid = document.getElementById('productsGrid');
    const filteredProducts = filter === 'all' 
        ? products 
        : products.filter(p => p.category === filter);
    
    productsGrid.innerHTML = filteredProducts.map(product => `
        <div class="product-card" data-category="${product.category}">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <p class="product-category">${getCategoryName(product.category)}</p>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-footer">
                    <span class="product-price">$${formatPrice(product.price)}</span>
                    <button class="add-to-cart" onclick="addToCart(${product.id})">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M12 5v14M5 12h14"/>
                        </svg>
                        Agregar
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function getCategoryName(category) {
    const categories = {
        'colombia': 'Selección Colombia',
        'clubes': 'Clubes Colombianos',
        'internacional': 'Internacional'
    };
    return categories[category] || category;
}

function formatPrice(price) {
    return price.toLocaleString('es-CO');
}

// ===== Filter Functionality =====
const filterButtons = document.querySelectorAll('.filter-btn');
filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');
        currentFilter = filter;
        renderProducts(filter);
    });
});

// ===== Cart Functionality =====
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCart();
    showNotification('Producto agregado al carrito');
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCart();
        }
    }
}

function updateCart() {
    const cartItems = document.getElementById('cartItems');
    const cartCount = document.getElementById('cartCount');
    const totalAmount = document.getElementById('totalAmount');
    
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    cartCount.textContent = totalItems;
    totalAmount.textContent = `$${formatPrice(total)}`;
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="empty-cart">Tu carrito está vacío</div>';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">$${formatPrice(item.price)}</div>
                    <div class="cart-item-controls">
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                        <button class="remove-item" onclick="removeFromCart(${item.id})">Eliminar</button>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
}

// ===== Cart Sidebar =====
const cartButton = document.getElementById('cartButton');
const cartSidebar = document.getElementById('cartSidebar');
const closeCart = document.getElementById('closeCart');

cartButton.addEventListener('click', () => {
    cartSidebar.classList.add('open');
});

closeCart.addEventListener('click', () => {
    cartSidebar.classList.remove('open');
});

// Close cart when clicking outside
document.addEventListener('click', (e) => {
    if (!cartSidebar.contains(e.target) && !cartButton.contains(e.target)) {
        cartSidebar.classList.remove('open');
    }
});

// ===== Checkout Modal =====
const checkoutButton = document.getElementById('checkoutButton');
const checkoutModal = document.getElementById('checkoutModal');
const closeModal = document.getElementById('closeModal');
const checkoutForm = document.getElementById('checkoutForm');

checkoutButton.addEventListener('click', () => {
    if (cart.length === 0) {
        showNotification('Tu carrito está vacío');
        return;
    }
    
    updateOrderSummary();
    checkoutModal.classList.add('open');
    cartSidebar.classList.remove('open');
});

closeModal.addEventListener('click', () => {
    checkoutModal.classList.remove('open');
});

function updateOrderSummary() {
    const orderSummary = document.getElementById('orderSummary');
    const orderTotal = document.getElementById('orderTotal');
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    orderSummary.innerHTML = cart.map(item => `
        <div class="summary-item">
            <span>${item.name} x${item.quantity}</span>
            <span>$${formatPrice(item.price * item.quantity)}</span>
        </div>
    `).join('');
    
    orderTotal.textContent = `$${formatPrice(total)}`;
}

// ===== Form Submission =====
checkoutForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('customerName').value,
        email: document.getElementById('customerEmail').value,
        phone: document.getElementById('customerPhone').value,
        address: document.getElementById('customerAddress').value,
        paymentMethod: document.getElementById('paymentMethod').value,
        items: cart,
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        date: new Date().toISOString()
    };
    
    // Save order to localStorage
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push(formData);
    localStorage.setItem('orders', JSON.stringify(orders));
    
    // Clear cart
    cart = [];
    updateCart();
    
    // Show success modal
    checkoutModal.classList.remove('open');
    document.getElementById('successModal').classList.add('open');
    
    // Reset form
    checkoutForm.reset();
});

// ===== Success Modal =====
const closeSuccess = document.getElementById('closeSuccess');
const successModal = document.getElementById('successModal');

closeSuccess.addEventListener('click', () => {
    successModal.classList.remove('open');
});

// ===== Notifications =====
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--secondary-color);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.3);
        z-index: 4000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===== Navigation =====
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', () => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCart();
    }
    
    // Render initial products
    renderProducts();
    
    console.log('Gala Sport loaded successfully!');

});






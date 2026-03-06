// ==============================
//  Organic Food Hub – script.js
// ==============================

// ---- Mobile Menu ----
function toggleMenu() {
    const menu = document.getElementById('mobileMenu');
    menu.classList.toggle('open');
}

// ---- Cart State ----
let cart = [];

// ---- Add to Cart ----
function addToCart(productName) {
    const prices = {
        'Organic Tomatoes': 50,
        'Fresh Broccoli': 80,
        'Farm Carrots': 40,
        'Sweet Corn': 25,
        'Baby Spinach': 35,
        'Red Onions': 30,
        'Fresh Lemons': 30,
        'Kashmiri Apples': 120,
        'Alphonso Mangoes': 200,
        'Black Grapes': 90,
        'Organic Wheat': 60,
        'Brown Rice': 75,
        'Organic Milk': 60,
        'Farm Paneer': 90
    };

    const existing = cart.find(item => item.name === productName);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ name: productName, qty: 1, price: prices[productName] || 50 });
    }

    showToast(`✅ ${productName} added to cart!`);
    updateCartSidebar();
}

// ---- Show Toast ----
function showToast(msg) {
    const toast = document.getElementById('cartToast');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2800);
}

// ---- Update Cart Sidebar (Products page) ----
function updateCartSidebar() {
    const sidebar = document.getElementById('cartSidebar');
    if (!sidebar) return;

    const countEl = document.getElementById('cartCount');
    const itemsEl = document.getElementById('cartItems');
    const totalEl = document.getElementById('cartTotal');

    const totalQty = cart.reduce((sum, i) => sum + i.qty, 0);
    const totalPrice = cart.reduce((sum, i) => sum + i.qty * i.price, 0);

    countEl.textContent = totalQty;
    totalEl.textContent = totalPrice;

    itemsEl.innerHTML = cart.length === 0
        ? '<p style="color:#aaa;padding:8px 0;">Cart is empty</p>'
        : cart.map(i => `<div class="cart-item">🛒 ${i.name} × ${i.qty} — ₹${i.qty * i.price}</div>`).join('');

    if (totalQty > 0) {
        sidebar.classList.add('active');
    } else {
        sidebar.classList.remove('active');
    }
}

// ---- Clear Cart ----
function clearCart() {
    cart = [];
    updateCartSidebar();
    showToast('🗑️ Cart cleared');
}

// ---- Filter Products ----
function filterProducts(category, btn) {
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Show/hide cards
    document.querySelectorAll('.product-card').forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
}

// ---- Contact Form ----
function sendMessage() {
    const name    = document.getElementById('cName')?.value.trim();
    const email   = document.getElementById('cEmail')?.value.trim();
    const message = document.getElementById('cMessage')?.value.trim();

    if (!name || !email || !message) {
        showToast('⚠️ Please fill in all required fields');
        return;
    }
    if (!email.includes('@')) {
        showToast('⚠️ Please enter a valid email');
        return;
    }

    // Show success
    const successEl = document.getElementById('formSuccess');
    if (successEl) {
        successEl.classList.add('show');
        setTimeout(() => successEl.classList.remove('show'), 5000);
    }

    // Clear form
    ['cName','cEmail','cPhone','cSubject','cMessage'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
    });

    showToast('📩 Message sent successfully!');
}

// ---- FAQ Toggle ----
function toggleFaq(item) {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(el => el.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
}

// ---- Scroll animations ----
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeUp 0.6s ease both';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.feature-card, .product-card, .testi-card, .value-card, .team-card').forEach(el => {
        observer.observe(el);
    });
}

// ---- Init ----
document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    updateCartSidebar();
});

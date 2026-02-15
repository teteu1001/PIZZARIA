// Menu Mobile Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
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

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Form submission
const orderForm = document.getElementById('orderForm');
if (orderForm) {
    orderForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = this.querySelector('input[type="text"]').value;
        const phone = this.querySelector('input[type="tel"]').value;
        const address = this.querySelector('input[placeholder="Endereço de entrega"]').value;
        const pizza = this.querySelector('select').value;
        const observations = this.querySelector('textarea').value;
        
        // Create order object
        const order = {
            name,
            phone,
            address,
            pizza,
            observations,
            timestamp: new Date().toISOString()
        };
        
        // Store in localStorage (simulating order processing)
        let orders = JSON.parse(localStorage.getItem('pizzaOrders') || '[]');
        orders.push(order);
        localStorage.setItem('pizzaOrders', JSON.stringify(orders));
        
        // Show success message
        showNotification('Pedido realizado com sucesso! Entraremos em contato em breve.', 'success');
        
        // Reset form
        this.reset();
        
        // Log order to console (for demonstration)
        console.log('Novo pedido:', order);
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : '#17a2b8'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
        font-family: 'Poppins', sans-serif;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    // Animate feature cards
    document.querySelectorAll('.feature-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Animate menu items
    document.querySelectorAll('.menu-item').forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(item);
    });
    
    // Animate stats
    document.querySelectorAll('.stat').forEach(stat => {
        stat.style.opacity = '0';
        stat.style.transform = 'scale(0.8)';
        stat.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(stat);
    });
});

// Pizza animation on hover
document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        const img = this.querySelector('.menu-item-image img');
        if (img) {
            img.style.transform = 'scale(1.1)';
        }
    });
    
    item.addEventListener('mouseleave', function() {
        const img = this.querySelector('.menu-item-image img');
        if (img) {
            img.style.transform = 'scale(1)';
        }
    });
});

// Phone number formatting
document.querySelector('input[type="tel"]')?.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 0) {
        if (value.length <= 2) {
            value = `(${value}`;
        } else if (value.length <= 7) {
            value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
        } else {
            value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7, 11)}`;
        }
    }
    e.target.value = value;
});

// Loading animation for page load
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Console Easter egg
console.log('%c🍕 Pizza Express - O melhor sabor da Itália! 🍕', 'font-size: 20px; color: #d63384; font-weight: bold;');
console.log('%cFaça seu pedido agora: (11) 1234-5678', 'font-size: 14px; color: #666;');

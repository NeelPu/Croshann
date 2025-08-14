// ===== CROSH ANN WEBSITE JAVASCRIPT =====
// CUSTOMIZATION GUIDE FOR EASY UPDATES

/* ===== PRODUCT DATA CUSTOMIZATION =====
   CUSTOMIZATION TIP: This is where you add/edit products
   
   TO ADD A NEW PRODUCT:
   1. Copy an existing product object
   2. Change the id to a unique number
   3. Update name, category, price, priceINR, image, and description
   4. Save the file
   
   TO UPDATE PRICES:
   - Change 'priceINR' for Indian Rupee price
   - Change 'price' for USD price
   
   TO CHANGE IMAGES:
   - Replace the 'image' URL with your product photo URL
   - Recommended image size: 400x400 pixels minimum
   - Use high-quality, well-lit photos showing the product clearly
   
   CATEGORY OPTIONS (keep consistent for filtering):
   - "Animal Keychains"
   - "Flower Keychains" 
   - "Food Keychains"
   - "Bag Charms"
   - Add new categories as needed
*/

const products = [
    {
        id: 1,
        name: "Cute Elephant Keychain", // CUSTOMIZE: Product name
        category: "Animal Keychains",   // CUSTOMIZE: Category (must match filter buttons)
                           // CUSTOMIZE: USD price
        priceINR: 999,                 // CUSTOMIZE: INR price
        image: "elephant.png", // CUSTOMIZE: Product image URL
        description: "Adorable crocheted elephant keychain in soft gray yarn with intricate details" // CUSTOMIZE: Product description
    },
    {
        id: 2,
        name: "Sweet Cat Keychain",
        category: "Animal Keychains",
        
        priceINR: 799,
        image: "cat.jpeg",
        description: "Cute crocheted cat keychain with sweet expression and soft texture"
    },
    {
        id: 3,
        name: "Teddy Bear Keychain",
        category: "Animal Keychains",
        
        priceINR: 899,
        image: "teddy.jpg",
        description: "Cuddly crocheted teddy bear keychain in warm brown tones"
    },
    {
        id: 4,
        name: "Sunflower Charm",
        category: "Flower Keychains",
        
        priceINR: 649,
        image: "sunflower.png",
        description: "Bright and cheerful crocheted sunflower charm with vibrant colors"
    },
    {
        id: 5,
        name: "Rose Keychain",
        category: "Flower Keychains",
       
        priceINR: 729,
        image: "rose.jpg",
        description: "Elegant crocheted rose keychain in soft romantic pink"
    },
    {
        id: 6,
        name: "Strawberry Charm",
        category: "Food Keychains",
        
        priceINR: 489,
        image: "strawberry.jpeg",
        description: "Adorable crocheted strawberry keychain in bright red with green top"
    },
    {
        id: 7,
        name: "Evil Eye Charm",
        category: "Bag Charms",
        
        priceINR: 1199,
        image: "evileye.png",
        description: "Protective crocheted evil eye charm in traditional blue and white"
    },
    {
        id: 8,
        name: "Heart Bag Charm",
        category: "Bag Charms",
        priceINR: 999,
        image: "heart.png",
        description: "Lovely crocheted heart charm in soft romantic colors"
    }
    // CUSTOMIZATION TIP: Add more products here by copying the format above
    // Remember to increment the id number for each new product
];

/* ===== CONTACT INFORMATION CUSTOMIZATION =====
   CUSTOMIZATION TIP: Update these contact details for your business
*/
const contactInfo = {
    whatsapp: "+919653174705",           // CUSTOMIZE: Your WhatsApp number (include country code)
    email: "neelpujari65@gmail.com",         // CUSTOMIZE: Your business email
    instagram: "@croshann_",             // CUSTOMIZE: Your Instagram handle
    facebook: "CroshAnnHandmade"         // CUSTOMIZE: Your Facebook page name
};

// Global variables for DOM elements
let hamburger, navMenu, productsGrid, searchInput, filterBtns, contactForm;

// Initialize app when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeDOM();
    renderProducts(products);
    setupEventListeners();
    console.log('✅ Crosh Ann website loaded successfully!');
});

// ===== DOM INITIALIZATION =====
function initializeDOM() {
    // Get references to important page elements
    hamburger = document.getElementById('hamburger');
    navMenu = document.querySelector('.nav-menu');
    productsGrid = document.getElementById('productsGrid');
    searchInput = document.getElementById('searchInput');
    filterBtns = document.querySelectorAll('.filter-btn');
    contactForm = document.getElementById('contactForm');
}

// ===== EVENT LISTENERS SETUP =====
function setupEventListeners() {
    console.log('🔧 Setting up event listeners...');
    
    // Mobile navigation toggle
    if (hamburger) {
        hamburger.addEventListener('click', toggleMobileMenu);
    }
    
    // Product filtering buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            filterProducts(e.target.dataset.filter);
        });
    });
    
    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', searchProducts);
    }
    
    // Contact form submission
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                if (navMenu && navMenu.classList.contains('active')) {
                    toggleMobileMenu();
                }
            }
        });
    });
    
    // Keyboard navigation (accessibility)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            // Close mobile menu on escape
            if (navMenu && navMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        }
    });
}

// ===== MOBILE NAVIGATION =====
function toggleMobileMenu() {
    if (hamburger && navMenu) {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    }
}

// ===== PRODUCT DISPLAY FUNCTIONS =====
/* CUSTOMIZATION TIP: The product display is automatically generated from the products array above.
   To change how products look, you can modify the HTML template in createProductCard function.
*/

function renderProducts(productsToRender) {
    if (!productsGrid) {
        console.error('❌ Products grid element not found');
        return;
    }
    
    console.log(`📦 Rendering ${productsToRender.length} products`);
    productsGrid.innerHTML = '';
    
    if (productsToRender.length === 0) {
        productsGrid.innerHTML = `
            <div class="no-products">
                <p>🔍 No products found matching your search.</p>
                <p>Try different keywords or browse all products.</p>
            </div>`;
        return;
    }
    
    productsToRender.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

function createProductCard(product) {
    // Create product card element
    const card = document.createElement('div');
    card.className = 'product-card';
    
    // CUSTOMIZATION TIP: This HTML template defines how each product looks
    // You can modify the structure here if needed
    card.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}" loading="lazy" onerror="handleImageError(this)">
        </div>
        <div class="product-info">
            <h3 class="product-name">${product.name}</h3>
            <p class="product-category">${product.category}</p>
            <div class="product-price">
                <span class="price-inr">₹${product.priceINR}</span>
            </div>
            <button class="contact-order" data-product-id="${product.id}">
                📱 Contact for Order
            </button>
        </div>
    `;
    
    // Add click event to contact button
    const contactBtn = card.querySelector('.contact-order');
    contactBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        contactForOrder(product);
    });
    
    // Add click event to card for viewing details
    card.addEventListener('click', function(e) {
        if (!e.target.classList.contains('contact-order')) {
            showProductDetails(product);
        }
    });
    
    return card;
}

// ===== PRODUCT FILTERING =====
function filterProducts(category) {
    console.log(`🔍 Filtering products by category: ${category}`);
    
    // Update active filter button styling
    filterBtns.forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.querySelector(`[data-filter="${category}"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
    
    // Filter products by category
    let filteredProducts;
    if (category === 'all') {
        filteredProducts = products;
    } else {
        filteredProducts = products.filter(product => product.category === category);
    }
    
    renderProducts(filteredProducts);
}

// ===== PRODUCT SEARCH =====
function searchProducts() {
    if (!searchInput) return;
    
    const searchTerm = searchInput.value.toLowerCase().trim();
    console.log(`🔍 Searching products for: "${searchTerm}"`);
    
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );
    
    renderProducts(filteredProducts);
    
    // Reset filter buttons to show "All Products" as active
    filterBtns.forEach(btn => btn.classList.remove('active'));
    const allBtn = document.querySelector('[data-filter="all"]');
    if (allBtn) {
        allBtn.classList.add('active');
    }
}

// ===== CONTACT/ORDER FUNCTIONS =====
/* CUSTOMIZATION TIP: This function handles when someone wants to order a product.
   It creates a WhatsApp message with product details.
   You can modify the message format below.
*/

function contactForOrder(product) {
    console.log(`📱 Contact for order: ${product.name}`);
    
    // Create WhatsApp message with product details
    // CUSTOMIZATION TIP: Modify this message template as needed
    const message = `Hi! I'm interested in ordering the *${product.name}* 
    
🏷️ *Product Details:*
• Name: ${product.name}
• Category: ${product.category}  
• Price: ₹${product.priceINR} (${product.price} USD)
• Description: ${product.description}

I would like to know more about availability and ordering process. Thank you! 🧶✨`;
    
    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);
    
    // Create WhatsApp URL
    // CUSTOMIZATION TIP: Update the phone number in contactInfo object at the top
    const whatsappURL = `https://wa.me/${contactInfo.whatsapp.replace(/[^0-9]/g, '')}?text=${encodedMessage}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappURL, '_blank');
    
    // Show confirmation message
    showNotification(`Opening WhatsApp to order ${product.name}! 📱`);
}

function showProductDetails(product) {
    // Simple alert showing product details
    // CUSTOMIZATION TIP: You could create a modal here instead if preferred
    const details = `🧶 ${product.name}
    
📝 Description: ${product.description}
🏷️ Category: ${product.category}
💰 Price: ₹${product.priceINR} (${product.price} USD)

Ready to order? Click the "Contact for Order" button!`;
    
    alert(details);
}

// ===== CONTACT FORM HANDLING =====
function handleContactForm(e) {
    e.preventDefault();
    console.log('📧 Processing contact form submission...');
    
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    
    if (!nameInput || !emailInput || !messageInput) {
        console.error('❌ Contact form elements not found');
        return;
    }
    
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();
    
    // Basic validation
    if (name && email && message) {
        console.log('✅ Contact form data valid, creating WhatsApp message...');
        
        // Create WhatsApp message for general inquiry
        // CUSTOMIZATION TIP: Modify this message template
        const whatsappMessage = `*New Contact Form Message*

👤 *Name:* ${name}
📧 *Email:* ${email}
💬 *Message:* ${message}

Please respond to this inquiry. Thank you! 🙏`;
        
        const encodedMessage = encodeURIComponent(whatsappMessage);
        const whatsappURL = `https://wa.me/${contactInfo.whatsapp.replace(/[^0-9]/g, '')}?text=${encodedMessage}`;
        
        // Open WhatsApp
        window.open(whatsappURL, '_blank');
        
        // Show success message and reset form
        showNotification('Message sent via WhatsApp! We\'ll get back to you soon. 📱');
        e.target.reset();
    } else {
        showNotification('Please fill in all fields before sending. ⚠️', 'error');
    }
}

// ===== UTILITY FUNCTIONS =====

function showNotification(message, type = 'success') {
    console.log(`📢 Notification: ${message}`);
    
    const notification = document.createElement('div');
    notification.className = 'notification show';
    
    // Set background color based on type
    if (type === 'error') {
        notification.style.background = 'var(--color-error)';
    } else {
        notification.style.background = 'var(--color-primary)';
    }
    
    notification.style.cssText += `
        position: fixed;
        top: 100px;
        right: 20px;
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        z-index: 9999;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 350px;
        font-size: 14px;
        font-weight: 500;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Handle image loading errors
function handleImageError(img) {
    console.warn(`⚠️ Image failed to load: ${img.src}`);
    // Replace with a fallback image that should work
    img.src = 'https://images.unsplash.com/photo-1551063943-2f81a9c2478a?w=400&h=400&fit=crop&crop=center&auto=format';
    img.alt = 'Handcrafted crochet item';
    
    // If that also fails, use a simple placeholder
    img.onerror = function() {
        this.style.display = 'none';
        const placeholder = document.createElement('div');
        placeholder.style.cssText = `
            width: 100%;
            height: 280px;
            background: linear-gradient(45deg, #f0f0f0 25%, transparent 25%),
                        linear-gradient(-45deg, #f0f0f0 25%, transparent 25%),
                        linear-gradient(45deg, transparent 75%, #f0f0f0 75%),
                        linear-gradient(-45deg, transparent 75%, #f0f0f0 75%);
            background-size: 20px 20px;
            background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #666;
            font-size: 14px;
            text-align: center;
            border-radius: 8px;
        `;
        placeholder.textContent = '🧶 Crochet Product Image';
        this.parentNode.replaceChild(placeholder, this);
    };
}

// ===== NAVBAR SCROLL EFFECT =====
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        }
    }
});

// ===== ERROR HANDLING =====
// Global error handler for images
document.addEventListener('error', (e) => {
    if (e.target.tagName === 'IMG') {
        handleImageError(e.target);
    }
}, true);

// Console welcome message
console.log(`
🧶 ===== CROSH ANN WEBSITE =====
✨ Handcrafted with Love, Crocheted with Care
📱 Contact: ${contactInfo.whatsapp}
📧 Email: ${contactInfo.email}
🔧 Ready for customization!

📝 CUSTOMIZATION TIPS:
1. Update products array (line 25) to add/modify products
2. Change contact info in contactInfo object (line 95)  
3. Modify WhatsApp message templates in contactForOrder function (line 260)
4. Update social media links in contactInfo object
5. Replace placeholder images with your actual product photos

🚀 All cart functionality removed as requested
📱 All order buttons now redirect to WhatsApp
💝 Website optimized for mobile and desktop
💝 "Made with Love & Care" feature is now properly centered!
`);

/* ===== CUSTOMIZATION SUMMARY =====

🎯 KEY AREAS TO CUSTOMIZE:

1. PRODUCTS (Lines 25-93):
   - Add new products to the 'products' array
   - Update names, descriptions, prices, categories
   - Replace image URLs with your product photos
   - Keep image dimensions 400x400px minimum for best quality

2. CONTACT INFORMATION (Lines 95-100):
   - Update WhatsApp number (include country code)
   - Change email address
   - Update social media handles

3. WHATSAPP MESSAGES (Lines 260+ and 315+):
   - Customize the message templates sent to WhatsApp
   - Add or modify product inquiry format
   - Change contact form message format

4. STYLING:
   - Colors and fonts are in style.css
   - Logo images are set in HTML img src attributes
   - Hero section content can be modified in HTML

5. CATEGORIES:
   - Update filter buttons in HTML if you add new categories
   - Make sure product categories match filter button data-filter values

🔧 NO CART FUNCTIONALITY:
- All shopping cart code has been removed as requested
- Products now have "Contact for Order" buttons
- Orders are processed through WhatsApp messaging
- Prices are displayed but no checkout process

📱 MOBILE OPTIMIZED:
- Responsive design works on all screen sizes
- Touch-friendly buttons and navigation
- WhatsApp integration opens mobile app automatically

💝 CENTERED "MADE WITH LOVE & CARE":
- The fourth feature card now has proper centering
- Uses CSS Grid for responsive layout
- Maintains balance with other features
- Works perfectly on all screen sizes

*/
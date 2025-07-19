document.addEventListener('DOMContentLoaded', function() {
    
    const preloader = document.querySelector('.preloader');
    window.addEventListener('load', () => {
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    });

    function showToast(message, isError = false) {
        const toast = document.querySelector('.toast');
        toast.textContent = message;
        toast.style.backgroundColor = isError ? 'var(--error-color)' : 'var(--success-color)';
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        navItems.forEach(item => {
            item.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    const searchIcon = document.querySelector('.fa-search');
    const searchBox = document.querySelector('.search-box');

    if (searchIcon && searchBox) {
        searchIcon.addEventListener('click', () => {
            searchBox.classList.toggle('active');
            if (searchBox.classList.contains('active')) {
                searchBox.querySelector('input').focus();
            }
        });
    }

    const heroSlider = document.querySelector('.hero-slider');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');
    const dotsContainer = document.querySelector('.slider-dots');
    let currentSlide = 0;
    const slideCount = slides.length;

    if (heroSlider && slides.length > 0) {
       
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('slider-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });

        const dots = document.querySelectorAll('.slider-dot');

        function goToSlide(slideIndex) {
            slides[currentSlide].classList.remove('active');
            dots[currentSlide].classList.remove('active');
            
            currentSlide = (slideIndex + slideCount) % slideCount;
            
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        }

        function nextSlide() {
            goToSlide(currentSlide + 1);
        }

        function prevSlide() {
            goToSlide(currentSlide - 1);
        }

        if (prevBtn && nextBtn) {
            nextBtn.addEventListener('click', nextSlide);
            prevBtn.addEventListener('click', prevSlide);

            let slideInterval = setInterval(nextSlide, 5000);

            heroSlider.addEventListener('mouseenter', () => {
                clearInterval(slideInterval);
            });

            heroSlider.addEventListener('mouseleave', () => {
                slideInterval = setInterval(nextSlide, 5000);
            });
        }
    }

    const testimonialSlider = document.querySelector('.testimonial-slider');
    const testimonials = document.querySelectorAll('.testimonial');
    const testimonialDotsContainer = document.querySelector('.testimonial-dots');
    let currentTestimonial = 0;
    const testimonialCount = testimonials.length;

    if (testimonialSlider && testimonials.length > 0) {
        testimonials.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('testimonial-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToTestimonial(index));
            testimonialDotsContainer.appendChild(dot);
        });

        const testimonialDots = document.querySelectorAll('.testimonial-dot');

        function goToTestimonial(testimonialIndex) {
            testimonials[currentTestimonial].classList.remove('active');
            testimonialDots[currentTestimonial].classList.remove('active');
            
            currentTestimonial = (testimonialIndex + testimonialCount) % testimonialCount;
            
            testimonials[currentTestimonial].classList.add('active');
            testimonialDots[currentTestimonial].classList.add('active');
        }

        let testimonialInterval = setInterval(() => {
            goToTestimonial(currentTestimonial + 1);
        }, 5000);

        testimonialSlider.addEventListener('mouseenter', () => {
            clearInterval(testimonialInterval);
        });

        testimonialSlider.addEventListener('mouseleave', () => {
            testimonialInterval = setInterval(() => {
                goToTestimonial(currentTestimonial + 1);
            }, 5000);
        });
    }

    const products = [
        {
            id: 1,
            name: "Wireless Headphones",
            category: "Electronics",
            price: 99.99,
            oldPrice: 129.99,
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            rating: 4.5,
            reviews: 120,
            badge: "New"
        },
        {
            id: 2,
            name: "Leather Sneakers",
            category: "Footwear",
            price: 79.99,
            oldPrice: 99.99,
            image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            rating: 4.2,
            reviews: 85,
            badge: "Sale"
        },
        {
            id: 3,
            name: "Designer Sunglasses",
            category: "Accessories",
            price: 149.99,
            oldPrice: 199.99,
            image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            rating: 4.8,
            reviews: 200,
            badge: "Popular"
        }
    ];

    const productGrid = document.querySelector('.product-grid');
    if (productGrid) {
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.innerHTML = `
                ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                    <div class="product-actions">
                        <div class="product-action add-to-wishlist" data-id="${product.id}">
                            <i class="fas fa-heart"></i>
                        </div>
                        <div class="product-action quick-view" data-id="${product.id}">
                            <i class="fas fa-eye"></i>
                        </div>
                    </div>
                </div>
                <div class="product-info">
                    <span class="product-category">${product.category}</span>
                    <h3 class="product-title">${product.name}</h3>
                    <div class="product-price">
                        <span class="current-price">$${product.price.toFixed(2)}</span>
                        ${product.oldPrice ? `<span class="old-price">$${product.oldPrice.toFixed(2)}</span>` : ''}
                    </div>
                    <div class="product-rating">
                        ${'<i class="fas fa-star"></i>'.repeat(Math.floor(product.rating))}
                        ${product.rating % 1 >= 0.5 ? '<i class="fas fa-star-half-alt"></i>' : ''}
                        <span>(${product.reviews})</span>
                    </div>
                    <button class="add-to-cart" data-id="${product.id}">
                        <i class="fas fa-shopping-bag"></i> Add to Cart
                    </button>
                </div>
            `;
            productGrid.appendChild(productCard);
        });
    }

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartSidebar = document.querySelector('.cart-sidebar');
    const cartOverlay = document.querySelector('.cart-overlay');
    const cartIcon = document.querySelector('.cart-icon');
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartCount = document.querySelector('.cart-count');
    const closeCartBtn = document.querySelector('.close-cart');
    const subtotalPrice = document.querySelector('.subtotal-price');
    const totalPrice = document.querySelector('.total-price');
    const checkoutBtn = document.querySelector('.checkout-btn');

    function updateCartUI() {
        cartItemsContainer.innerHTML = '';
        let subtotal = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        } else {
            cart.forEach(item => {
                const product = products.find(p => p.id === item.id);
                if (product) {
                    const cartItem = document.createElement('div');
                    cartItem.classList.add('cart-item');
                    cartItem.innerHTML = `
                        <img src="${product.image}" alt="${product.name}">
                        <div class="cart-item-details">
                            <h4 class="cart-item-title">${product.name}</h4>
                            <p class="cart-item-price">$${product.price.toFixed(2)}</p>
                            <div class="cart-item-quantity">
                                <button class="quantity-btn decrease" data-id="${product.id}">-</button>
                                <span>${item.quantity}</span>
                                <button class="quantity-btn increase" data-id="${product.id}">+</button>
                            </div>
                        </div>
                        <i class="fas fa-trash remove-item" data-id="${product.id}"></i>
                    `;
                    cartItemsContainer.appendChild(cartItem);
                    subtotal += product.price * item.quantity;
                }
            });
        }

        cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
        subtotalPrice.textContent = `$${subtotal.toFixed(2)}`;
        totalPrice.textContent = `$${subtotal.toFixed(2)}`; 
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    function addToCart(productId) {
        const product = products.find(p => p.id === productId);
        if (product) {
            const cartItem = cart.find(item => item.id === productId);
            if (cartItem) {
                cartItem.quantity += 1;
            } else {
                cart.push({ id: productId, quantity: 1 });
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartUI();
            showToast(`${product.name} added to cart!`);
        }
    }

    if (cartIcon) {
        cartIcon.addEventListener('click', () => {
            cartSidebar.classList.add('active');
            cartOverlay.classList.add('active');
        });
    }

    if (closeCartBtn) {
        closeCartBtn.addEventListener('click', () => {
            cartSidebar.classList.remove('active');
            cartOverlay.classList.remove('active');
        });
    }

    if (cartOverlay) {
        cartOverlay.addEventListener('click', () => {
            cartSidebar.classList.remove('active');
            cartOverlay.classList.remove('active');
        });
    }

    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart') || e.target.parentElement.classList.contains('add-to-cart')) {
            const productId = parseInt(e.target.closest('.add-to-cart').dataset.id);
            addToCart(productId);
        }

        if (e.target.classList.contains('quantity-btn')) {
            const productId = parseInt(e.target.dataset.id);
            const cartItem = cart.find(item => item.id === productId);
            if (cartItem) {
                if (e.target.classList.contains('increase')) {
                    cartItem.quantity += 1;
                } else if (e.target.classList.contains('decrease') && cartItem.quantity > 1) {
                    cartItem.quantity -= 1;
                }
                updateCartUI();
            }
        }

        if (e.target.classList.contains('remove-item')) {
            const productId = parseInt(e.target.dataset.id);
            cart = cart.filter(item => item.id !== productId);
            updateCartUI();
            showToast('Item removed from cart!');
        }
    });

    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.length === 0) {
                showToast('Your cart is empty!', true);
                return;
            }
            const order = {
                id: Date.now(),
                date: new Date().toLocaleDateString(),
                status: 'Processing',
                items: cart.map(item => {
                    const product = products.find(p => p.id === item.id);
                    return {
                        id: item.id,
                        name: product.name,
                        quantity: item.quantity,
                        price: product.price,
                        image: product.image
                    };
                }),
                total: cart.reduce((sum, item) => {
                    const product = products.find(p => p.id === item.id);
                    return sum + product.price * item.quantity;
                }, 0),
                paymentMethod: 'Credit Card',
                deliveryAddress: JSON.parse(localStorage.getItem('primaryAddress')) || {
                    line1: '123 Luxury Lane',
                    city: 'Khammam',
                    state: 'Telangana',
                    country: 'India',
                    zip: '507003'
                }
            };
            let orders = JSON.parse(localStorage.getItem('orders')) || [];
            orders.push(order);
            localStorage.setItem('orders', JSON.stringify(orders));
            cart = [];
            updateCartUI();
            cartSidebar.classList.remove('active');
            cartOverlay.classList.remove('active');
            showToast('Order placed successfully!');
            renderOrderHistory();
        });
    }

    updateCartUI();

    const personalInfoForm = document.getElementById('personal-info-form');
    const passwordForm = document.getElementById('password-form');
    const addressForm = document.getElementById('address-form');
    const addAddressBtn = document.getElementById('add-address');
    const profilePicUpload = document.getElementById('profile-pic-upload');
    const profilePic = document.getElementById('profile-pic');
    const orderList = document.getElementById('order-list');
    const wishlistItems = document.getElementById('wishlist-items');
    const paymentMethodsList = document.getElementById('payment-methods-list');
    const addPaymentMethodBtn = document.getElementById('add-payment-method');
    const preferencesForm = document.getElementById('preferences-form');

    function loadProfileData() {
        const profile = JSON.parse(localStorage.getItem('profile')) || {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            phone: '+91 9876543210',
            dob: '',
            gender: '',
            profilePic: 'https://randomuser.me/api/portraits/men/32.jpg'
        };
        if (personalInfoForm) {
            document.getElementById('first-name').value = profile.firstName;
            document.getElementById('last-name').value = profile.lastName;
            document.getElementById('email').value = profile.email;
            document.getElementById('phone').value = profile.phone;
            document.getElementById('dob').value = profile.dob;
            document.getElementById('gender').value = profile.gender;
            profilePic.src = profile.profilePic;
        }
    }

    if (personalInfoForm) {
        personalInfoForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const profile = {
                firstName: document.getElementById('first-name').value,
                lastName: document.getElementById('last-name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                dob: document.getElementById('dob').value,
                gender: document.getElementById('gender').value,
                profilePic: profilePic.src
            };
            localStorage.setItem('profile', JSON.stringify(profile));
            showToast('Personal information updated!');
        });
    }

    if (profilePicUpload && profilePic) {
        profilePicUpload.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    profilePic.src = event.target.result;
                    const profile = JSON.parse(localStorage.getItem('profile')) || {};
                    profile.profilePic = event.target.result;
                    localStorage.setItem('profile', JSON.stringify(profile));
                    showToast('Profile picture updated!');
                };
                reader.readAsDataURL(file);
            }
        });
    }

    if (passwordForm) {
        passwordForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const currentPassword = document.getElementById('current-password').value;
            const newPassword = document.getElementById('new-password').value;
            const confirmPassword = document.getElementById('confirm-password').value;

            if (newPassword !== confirmPassword) {
                showToast('Passwords do not match!', true);
                return;
            }
            if (newPassword.length < 6) {
                showToast('New password must be at least 6 characters!', true);
                return;
            }
            showToast('Password changed successfully!');
            passwordForm.reset();
        });
    }

    function renderAddresses() {
        const addressForm = document.getElementById('address-form');
        const primaryAddress = JSON.parse(localStorage.getItem('primaryAddress')) || {
            line1: '123 Luxury Lane',
            line2: '',
            city: 'Khammam',
            state: 'Telangana',
            country: 'India',
            zip: '507003'
        };
        let additionalAddresses = JSON.parse(localStorage.getItem('additionalAddresses')) || [];

        const addressCards = addressForm.querySelectorAll('.address-card:not(:first-child)');
        addressCards.forEach(card => card.remove());

        const primaryCard = addressForm.querySelector('.address-card');
        primaryCard.querySelector('#address-line1').value = primaryAddress.line1;
        primaryCard.querySelector('#address-line2').value = primaryAddress.line2;
        primaryCard.querySelector('#city').value = primaryAddress.city;
        primaryCard.querySelector('#state').value = primaryAddress.state;
        primaryCard.querySelector('#country').value = primaryAddress.country;
        primaryCard.querySelector('#zip').value = primaryAddress.zip;

        additionalAddresses.forEach((address, index) => {
            const addressCard = document.createElement('div');
            addressCard.classList.add('address-card');
            addressCard.innerHTML = `
                <h4>Additional Address ${index + 1}</h4>
                <div class="form-group">
                    <label for="address-line1-${index}">Address Line 1</label>
                    <input type="text" id="address-line1-${index}" value="${address.line1}" required>
                </div>
                <div class="form-group">
                    <label for="address-line2-${index}">Address Line 2 (Optional)</label>
                    <input type="text" id="address-line2-${index}" value="${address.line2}">
                </div>
                <div class="form-group">
                    <label for="city-${index}">City</label>
                    <input type="text" id="city-${index}" value="${address.city}" required>
                </div>
                <div class="form-group">
                    <label for="state-${index}">State</label>
                    <input type="text" id="state-${index}" value="${address.state}" required>
                </div>
                <div class="form-group">
                    <label for="country-${index}">Country</label>
                    <input type="text" id="country-${index}" value="${address.country}" required>
                </div>
                <div class="form-group">
                    <label for="zip-${index}">ZIP/Postal Code</label>
                    <input type="text" id="zip-${index}" value="${address.zip}" required>
                </div>
                <button type="button" class="btn btn-outline remove-address">Remove Address</button>
            `;
            addressForm.insertBefore(addressCard, addAddressBtn);
        });

        document.querySelectorAll('.remove-address').forEach(btn => {
            btn.addEventListener('click', () => {
                const index = Array.from(addressForm.querySelectorAll('.address-card')).indexOf(btn.closest('.address-card')) - 1;
                additionalAddresses.splice(index, 1);
                localStorage.setItem('additionalAddresses', JSON.stringify(additionalAddresses));
                renderAddresses();
            });
        });
    }

    if (addAddressBtn) {
        addAddressBtn.addEventListener('click', () => {
            const additionalAddresses = JSON.parse(localStorage.getItem('additionalAddresses')) || [];
            additionalAddresses.push({
                line1: '',
                line2: '',
                city: '',
                state: '',
                country: '',
                zip: ''
            });
            localStorage.setItem('additionalAddresses', JSON.stringify(additionalAddresses));
            renderAddresses();
        });
    }

    if (addressForm) {
        addressForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const primaryAddress = {
                line1: document.getElementById('address-line1').value,
                line2: document.getElementById('address-line2').value,
                city: document.getElementById('city').value,
                state: document.getElementById('state').value,
                country: document.getElementById('country').value,
                zip: document.getElementById('zip').value
            };
            const additionalAddresses = [];
            const addressCards = addressForm.querySelectorAll('.address-card:not(:first-child)');
            addressCards.forEach((card, index) => {
                additionalAddresses.push({
                    line1: card.querySelector(`#address-line1-${index}`).value,
                    line2: card.querySelector(`#address-line2-${index}`).value,
                    city: card.querySelector(`#city-${index}`).value,
                    state: card.querySelector(`#state-${index}`).value,
                    country: card.querySelector(`#country-${index}`).value,
                    zip: card.querySelector(`#zip-${index}`).value
                });
            });
            localStorage.setItem('primaryAddress', JSON.stringify(primaryAddress));
            localStorage.setItem('additionalAddresses', JSON.stringify(additionalAddresses));
            showToast('Addresses updated!');
        });
        renderAddresses();
    }

    function renderOrderHistory() {
        if (orderList) {
            orderList.innerHTML = '';
            const orders = JSON.parse(localStorage.getItem('orders')) || [];
            if (orders.length === 0) {
                orderList.innerHTML = '<p>No orders placed yet.</p>';
                return;
            }
            orders.forEach(order => {
                const orderCard = document.createElement('div');
                orderCard.classList.add('order-card');
                orderCard.innerHTML = `
                    <h4>Order #${order.id}</h4>
                    <div class="order-details">
                        <p><strong>Date:</strong> ${order.date}</p>
                        <p><strong>Status:</strong> ${order.status}</p>
                        <p><strong>Total:</strong> $${order.total.toFixed(2)}</p>
                        <p><strong>Payment Method:</strong> ${order.paymentMethod}</p>
                        <p><strong>Delivery Address:</strong> ${order.deliveryAddress.line1}, ${order.deliveryAddress.city}, ${order.deliveryAddress.state}, ${order.deliveryAddress.country} ${order.deliveryAddress.zip}</p>
                    </div>
                    ${order.items.map(item => `
                        <div class="order-item">
                            <img src="${item.image}" alt="${item.name}">
                            <div>
                                <h5>${item.name}</h5>
                                <p>Quantity: ${item.quantity}</p>
                                <p>Price: $${item.price.toFixed(2)}</p>
                            </div>
                        </div>
                    `).join('')}
                    <div class="order-actions">
                        <button class="btn btn-outline reorder" data-order-id="${order.id}">Reorder</button>
                        <button class="btn btn-outline track-order">Track Order</button>
                    </div>
                `;
                orderList.appendChild(orderCard);
            });

            document.querySelectorAll('.reorder').forEach(btn => {
                btn.addEventListener('click', () => {
                    const orderId = parseInt(btn.dataset.orderId);
                    const order = orders.find(o => o.id === orderId);
                    if (order) {
                        order.items.forEach(item => {
                            const cartItem = cart.find(ci => ci.id === item.id);
                            if (cartItem) {
                                cartItem.quantity += item.quantity;
                            } else {
                                cart.push({ id: item.id, quantity: item.quantity });
                            }
                        });
                        updateCartUI();
                        showToast('Items added to cart for reorder!');
                    }
                });
            });

            document.querySelectorAll('.track-order').forEach(btn => {
                btn.addEventListener('click', () => {
                    showToast('Tracking information not available in demo.');
                });
            });
        }
    }

    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    function renderWishlist() {
        if (wishlistItems) {
            wishlistItems.innerHTML = '';
            if (wishlist.length === 0) {
                wishlistItems.innerHTML = '<p>No items in your wishlist.</p>';
                return;
            }
            wishlist.forEach(itemId => {
                const product = products.find(p => p.id === itemId);
                if (product) {
                    const wishlistItem = document.createElement('div');
                    wishlistItem.classList.add('wishlist-item');
                    wishlistItem.innerHTML = `
                        <img src="${product.image}" alt="${product.name}">
                        <div>
                            <h5>${product.name}</h5>
                            <p>$${product.price.toFixed(2)}</p>
                            <button class="btn btn-outline add-to-cart" data-id="${product.id}">Add to Cart</button>
                            <button class="btn btn-outline remove-wishlist" data-id="${product.id}">Remove</button>
                        </div>
                    `;
                    wishlistItems.appendChild(wishlistItem);
                }
            });

            wishlistItems.querySelectorAll('.add-to-cart').forEach(btn => {
                btn.addEventListener('click', () => {
                    const productId = parseInt(btn.dataset.id);
                    addToCart(productId);
                });
            });

            wishlistItems.querySelectorAll('.remove-wishlist').forEach(btn => {
                btn.addEventListener('click', () => {
                    const productId = parseInt(btn.dataset.id);
                    wishlist = wishlist.filter(id => id !== productId);
                    localStorage.setItem('wishlist', JSON.stringify(wishlist));
                    renderWishlist();
                    showToast('Item removed from wishlist!');
                });
            });
        }
    }

    document.addEventListener('click', (e) => {
        if (e.target.closest('.add-to-wishlist')) {
            const productId = parseInt(e.target.closest('.add-to-wishlist').dataset.id);
            if (!wishlist.includes(productId)) {
                wishlist.push(productId);
                localStorage.setItem('wishlist', JSON.stringify(wishlist));
                renderWishlist();
                showToast('Item added to wishlist!');
            } else {
                showToast('Item already in wishlist!', true);
            }
        }
    });

    let paymentMethods = JSON.parse(localStorage.getItem('paymentMethods')) || [];
    function renderPaymentMethods() {
        if (paymentMethodsList) {
            paymentMethodsList.innerHTML = '';
            if (paymentMethods.length === 0) {
                paymentMethodsList.innerHTML = '<p>No saved payment methods.</p>';
                return;
            }
            paymentMethods.forEach((method, index) => {
                const paymentItem = document.createElement('div');
                paymentItem.classList.add('payment-method-item');
                paymentItem.innerHTML = `
                    <img src="${method.image}" alt="${method.type}">
                    <div>
                        <p><strong>${method.type}</strong> ending in ${method.last4}</p>
                        <p>Expires: ${method.expiry}</p>
                        <button class="btn btn-outline remove-payment" data-index="${index}">Remove</button>
                    </div>
                `;
                paymentMethodsList.appendChild(paymentItem);
            });

            paymentMethodsList.querySelectorAll('.remove-payment').forEach(btn => {
                btn.addEventListener('click', () => {
                    const index = parseInt(btn.dataset.index);
                    paymentMethods.splice(index, 1);
                    localStorage.setItem('paymentMethods', JSON.stringify(paymentMethods));
                    renderPaymentMethods();
                    showToast('Payment method removed!');
                });
            });
        }
    }

    if (addPaymentMethodBtn) {
        addPaymentMethodBtn.addEventListener('click', () => {
            const newMethod = {
                type: 'Credit Card',
                last4: Math.floor(1000 + Math.random() * 9000).toString(),
                expiry: `${(new Date().getMonth() + 1).toString().padStart(2, '0')}/${new Date().getFullYear() + 3}`,
                image: './Images/Visa.png'
            };
            paymentMethods.push(newMethod);
            localStorage.setItem('paymentMethods', JSON.stringify(paymentMethods));
            renderPaymentMethods();
            showToast('Payment method added!');
        });
    }

    if (preferencesForm) {
        const savedPreferences = JSON.parse(localStorage.getItem('preferences')) || {
            emailNotifications: true,
            smsNotifications: false,
            promoOffers: true,
            language: 'en',
            currency: 'INR'
        };
        document.getElementById('email-notifications').checked = savedPreferences.emailNotifications;
        document.getElementById('sms-notifications').checked = savedPreferences.smsNotifications;
        document.getElementById('promo-offers').checked = savedPreferences.promoOffers;
        document.getElementById('language').value = savedPreferences.language;
        document.getElementById('currency').value = savedPreferences.currency;

        preferencesForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const preferences = {
                emailNotifications: document.getElementById('email-notifications').checked,
                smsNotifications: document.getElementById('sms-notifications').checked,
                promoOffers: document.getElementById('promo-offers').checked,
                language: document.getElementById('language').value,
                currency: document.getElementById('currency').value
            };
            localStorage.setItem('preferences', JSON.stringify(preferences));
            showToast('Preferences updated!');
        });
    }

    if (document.querySelector('.profile')) {
        loadProfileData();
        renderOrderHistory();
        renderWishlist();
        renderPaymentMethods();
    }
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showToast('Message sent successfully!');
            contactForm.reset();
        });
    }

    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showToast('Subscribed successfully!');
            newsletterForm.reset();
        });
    }

    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
});
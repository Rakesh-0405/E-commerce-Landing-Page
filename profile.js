document.addEventListener('DOMContentLoaded', function() {
    function showToast(message, isError = false) {
        const toast = document.querySelector('.toast');
        toast.textContent = message;
        toast.style.backgroundColor = isError ? 'var(--error-color)' : 'var(--success-color)';
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    const personalInfoForm = document.getElementById('personal-info-form');
    const profilePicUpload = document.getElementById('profile-pic-upload');
    const profilePic = document.getElementById('profile-pic');

    function loadProfileData() {
        const profile = JSON.parse(localStorage.getItem('profile')) || {
            firstName: 'Rakesh',
            lastName: 'Bhukya',
            email: 'bhukyarakesh094@gmail.com',
            phone: '+91 7702355938',
            profilePic: './images/rakesh.jpg'
        };
        document.getElementById('first-name').value = profile.firstName;
        document.getElementById('last-name').value = profile.lastName;
        document.getElementById('email').value = profile.email;
        document.getElementById('phone').value = profile.phone;
        profilePic.src = profile.profilePic;
    }

    if (personalInfoForm) {
        personalInfoForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const profile = {
                firstName: document.getElementById('first-name').value,
                lastName: document.getElementById('last-name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
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

    const addressForm = document.getElementById('address-form');
    const addAddressBtn = document.getElementById('add-address');

    function renderAddresses() {
        const primaryAddress = JSON.parse(localStorage.getItem('primaryAddress')) || {
            line1: 'Khammam, Telangana, India',
            line2: 'Khammam',
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
                showToast('Address removed!');
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
            showToast('New address added!');
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

    const orderList = document.getElementById('order-list');
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
                    const orders = JSON.parse(localStorage.getItem('orders')) || [];
                    const order = orders.find(o => o.id === orderId);
                    if (order) {
                        let cart = JSON.parse(localStorage.getItem('cart')) || [];
                        order.items.forEach(item => {
                            const cartItem = cart.find(ci => ci.id === item.id);
                            if (cartItem) {
                                cartItem.quantity += item.quantity;
                            } else {
                                cart.push({ id: item.id, quantity: item.quantity });
                            }
                        });
                        localStorage.setItem('cart', JSON.stringify(cart));
                        showToast('Items added to cart for reorder!');
                        window.dispatchEvent(new Event('cartUpdated'));
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

    const wishlistItems = document.getElementById('wishlist-items');
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    function renderWishlist() {
        if (wishlistItems) {
            wishlistItems.innerHTML = '';
            if (wishlist.length === 0) {
                wishlistItems.innerHTML = '<p>No items in your wishlist.</p>';
                return;
            }
            wishlist.forEach(itemId => {
                const product = window.products.find(p => p.id === itemId);
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
                    let cart = JSON.parse(localStorage.getItem('cart')) || [];
                    const cartItem = cart.find(ci => ci.id === productId);
                    if (cartItem) {
                        cartItem.quantity += 1;
                    } else {
                        cart.push({ id: productId, quantity: 1 });
                    }
                    localStorage.setItem('cart', JSON.stringify(cart));
                    showToast('Item added to cart!');
                    window.dispatchEvent(new Event('cartUpdated'));
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

    loadProfileData();
    renderOrderHistory();
    renderWishlist();
});
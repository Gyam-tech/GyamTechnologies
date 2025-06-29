    // Product data with image and price
    const products = {
        "IoT Sensor Kit": {
            price: 4999,
            image: "img/iot-sensor-kit.jpg"
        },
        "Smart Home Automation Kit": {
            price: 7999,
            image: "img/smart-home-kit.jpg"
        },
        "Robotics Starter Kit": {
            price: 11499,
            image: "img/robotics-kit.jpg"
        }
    };

    let cart = {};

    function updateCartCount() {
        const count = Object.values(cart).reduce((sum, item) => sum + item.qty, 0);
        document.getElementById('cart-count').textContent = count;
    }

    function renderCart() {
        const cartItemsContainer = document.getElementById('cart-items');
        cartItemsContainer.innerHTML = '';

        let total = 0;
        for (const [productName, item] of Object.entries(cart)) {
            const subtotal = item.price * item.qty;
            total += subtotal;

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>
                    <div class="d-flex align-items-center">
                        <img src="${item.image}" alt="${productName}" style="width: 60px; height: auto; margin-right: 10px;">
                        <div>${productName}</div>
                    </div>
                </td>
                <td>₹${item.price.toLocaleString()}</td>
                <td>
                    <div class="input-group input-group-sm" style="max-width: 110px;">
                        <button class="btn btn-outline-secondary btn-decrease" data-product="${productName}">-</button>
                        <input type="text" class="form-control text-center" value="${item.qty}" readonly>
                        <button class="btn btn-outline-secondary btn-increase" data-product="${productName}">+</button>
                    </div>
                </td>
                <td>₹${subtotal.toLocaleString()}</td>
                <td><button class="btn btn-danger btn-sm btn-remove" data-product="${productName}"><i class="fa fa-trash"></i></button></td>
            `;
            cartItemsContainer.appendChild(tr);
        }

        document.getElementById('cart-total').textContent = total.toLocaleString();
        document.getElementById('checkout-btn').disabled = total === 0;
        updateCartCount();

        // Event listeners
        document.querySelectorAll('.btn-increase').forEach(btn => {
            btn.onclick = () => {
                const product = btn.dataset.product;
                cart[product].qty++;
                renderCart();
            };
        });

        document.querySelectorAll('.btn-decrease').forEach(btn => {
            btn.onclick = () => {
                const product = btn.dataset.product;
                if (cart[product].qty > 1) {
                    cart[product].qty--;
                } else {
                    delete cart[product];
                }
                renderCart();
            };
        });

        document.querySelectorAll('.btn-remove').forEach(btn => {
            btn.onclick = () => {
                const product = btn.dataset.product;
                delete cart[product];
                renderCart();
            };
        });
    }

    // Add to cart buttons
    document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('.add-to-cart').forEach(btn => {
            btn.addEventListener('click', () => {
                const productCard = btn.closest('.bg-white');
                const productName = productCard.querySelector('h4').textContent.trim();

                if (cart[productName]) {
                    cart[productName].qty++;
                } else {
                    cart[productName] = {
                        price: products[productName].price,
                        image: products[productName].image,
                        qty: 1
                    };
                }

                renderCart();
            });
        });

        const cartModal = document.getElementById('cartModal');
        if (cartModal) {
            cartModal.addEventListener('show.bs.modal', renderCart);
        }

        document.getElementById('checkout-btn').addEventListener('click', () => {
            alert("Proceeding to checkout with total ₹" + document.getElementById('cart-total').textContent);
        });
    });

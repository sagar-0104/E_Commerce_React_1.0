import React, { useState, useEffect } from "react";
import { createContext } from "react";
import all_product from '../Components/Assets/all_product';

export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < all_product.length + 1; index++) {
        cart[index] = 0;
    }
    return cart;
}

const getStoredCart = () => {
    const stored = localStorage.getItem('cartItems');
    return stored ? JSON.parse(stored) : getDefaultCart();
}

const getStoredUser = () => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
}

const getStoredOrders = () => {
    const stored = localStorage.getItem('orders');
    return stored ? JSON.parse(stored) : [];
}

const ShopContextProvider = (props) => {
    const [cartItems, setCartItems] = useState(getStoredCart());
    const [user, setUser] = useState(getStoredUser());
    const [orders, setOrders] = useState(getStoredOrders());

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    // Save user to localStorage whenever it changes
    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

    // Save orders to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('orders', JSON.stringify(orders));
    }, [orders]);

    // Auto-update order status every minute for testing
    useEffect(() => {
        const interval = setInterval(() => {
            const now = Date.now();
            setOrders(prevOrders =>
                prevOrders.map(order => {
                    const timeDiff = now - new Date(order.orderDate).getTime();
                    const minutesPassed = Math.floor(timeDiff / (1000 * 60));

                    // Update status based on time passed (for testing - 1 minute intervals)
                    if (order.status === 'confirmed' && minutesPassed >= 1) {
                        return { ...order, status: 'processing' };
                    } else if (order.status === 'processing' && minutesPassed >= 2) {
                        return { ...order, status: 'shipped' };
                    } else if (order.status === 'shipped' && minutesPassed >= 3) {
                        return { ...order, status: 'delivered' };
                    }
                    return order;
                })
            );
        }, 60000); // Check every minute

        return () => clearInterval(interval);
    }, []);

    // Authentication functions
    const login = (email, password) => {
        // In a real app, this would validate against a backend
        const userData = {
            id: Date.now(),
            email: email,
            name: email.split('@')[0],
            loginTime: new Date().toISOString()
        };
        setUser(userData);
        return userData;
    };

    const logout = () => {
        setUser(null);
        setCartItems(getDefaultCart());
        localStorage.removeItem('user');
        localStorage.removeItem('cartItems');
    };

    const isLoggedIn = () => {
        return user !== null;
    };

    // Cart functions
    const addToCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
    }

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
    }

    const clearCart = () => {
        setCartItems(getDefaultCart());
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = all_product.find((product) => product.id === Number(item))
                if (itemInfo) {
                    totalAmount += itemInfo.new_price * cartItems[item];
                }
            }
        }
        return totalAmount;
    }

    const getTotalCartItems = () => {
        let totalItem = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalItem += cartItems[item];
            }
        }
        return totalItem;
    }

    // Order functions
    const placeOrder = (orderDetails) => {
        if (!isLoggedIn()) {
            return { success: false, message: "Please login to place an order" };
        }

        const order = {
            id: `ORD-${Date.now()}`,
            userId: user.id,
            items: cartItems,
            total: getTotalCartAmount(),
            orderDate: new Date().toISOString(),
            status: 'confirmed',
            estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
            shippingAddress: orderDetails.address,
            paymentMethod: orderDetails.paymentMethod,
            trackingNumber: `TRK${Math.random().toString(36).substr(2, 9).toUpperCase()}`
        };

        setOrders(prevOrders => [...prevOrders, order]);
        clearCart();

        return { success: true, order: order };
    };

    const getUserOrders = () => {
        if (!isLoggedIn()) return [];
        return orders.filter(order => order.userId === user.id);
    };

    const updateOrderStatus = (orderId, status) => {
        setOrders(prevOrders =>
            prevOrders.map(order =>
                order.id === orderId ? { ...order, status } : order
            )
        );
    };

    const cancelOrder = (orderId) => {
        if (!isLoggedIn()) {
            return { success: false, message: "Please login to cancel orders" };
        }

        const order = orders.find(order => order.id === orderId && order.userId === user.id);
        if (!order) {
            return { success: false, message: "Order not found" };
        }

        if (order.status !== 'confirmed' && order.status !== 'processing') {
            return { success: false, message: "This order cannot be cancelled" };
        }

        updateOrderStatus(orderId, 'cancelled');
        return { success: true, message: "Order cancelled successfully" };
    };

    const getOrderTrackingInfo = (orderId) => {
        const order = orders.find(order => order.id === orderId);
        if (!order) return null;

        const orderDate = new Date(order.orderDate);
        const now = new Date();
        const timeDiff = now.getTime() - orderDate.getTime();
        const minutesPassed = Math.floor(timeDiff / (1000 * 60));

        const trackingSteps = [
            {
                status: 'confirmed',
                label: 'Order Confirmed',
                completed: true,
                time: orderDate.toLocaleString()
            },
            {
                status: 'processing',
                label: 'Processing',
                completed: minutesPassed >= 1,
                time: minutesPassed >= 1 ? new Date(orderDate.getTime() + 1 * 60 * 1000).toLocaleString() : null
            },
            {
                status: 'shipped',
                label: 'Shipped',
                completed: minutesPassed >= 2,
                time: minutesPassed >= 2 ? new Date(orderDate.getTime() + 2 * 60 * 1000).toLocaleString() : null
            },
            {
                status: 'delivered',
                label: 'Delivered',
                completed: minutesPassed >= 3,
                time: minutesPassed >= 3 ? new Date(orderDate.getTime() + 3 * 60 * 1000).toLocaleString() : null
            }
        ];

        return {
            order,
            currentStatus: order.status,
            trackingSteps,
            estimatedDelivery: order.estimatedDelivery
        };
    };

    const contextValue = {
        // Products and cart
        all_product,
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        getTotalCartAmount,
        getTotalCartItems,

        // Authentication
        user,
        login,
        logout,
        isLoggedIn,

        // Orders
        orders,
        placeOrder,
        getUserOrders,
        updateOrderStatus,
        cancelOrder,
        getOrderTrackingInfo
    };


    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;
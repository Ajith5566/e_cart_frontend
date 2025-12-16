"use client";

import React from "react";
import Link from "next/link";
import styles from "./CartPage.module.css";

const cartItems = [
  {
    id: "1",
    name: "iPhone 15",
    price: 79999,
    quantity: 1,
  },
  {
    id: "2",
    name: "AirPods Pro",
    price: 24999,
    quantity: 2,
  },
];

export default function Page() {
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        {/* Page Title */}
        <div className={styles.headerRow}>
          <div>
            <h1 className={styles.title}>Your Cart</h1>
            <p className={styles.subtitle}>
              {itemCount} item{itemCount !== 1 ? "s" : ""} in your cart
            </p>
          </div>
          <Link href="/products" className={styles.backLink}>
            Continue Shopping →
          </Link>
        </div>

        {cartItems.length === 0 ? (
          <div className={styles.emptyCard}>
            <p className={styles.emptyText}>Your cart is empty</p>
            <Link href="/products" className={styles.emptyCta}>
              Browse products
            </Link>
          </div>
        ) : (
          <div className={styles.grid}>
            {/* Cart Items */}
            <div className={styles.itemsCard}>
              {cartItems.map((item, index) => (
                <div
                  key={item.id}
                  className={`${styles.itemRow} ${
                    index === cartItems.length - 1 ? styles.itemRowLast : ""
                  }`}
                >
                  <div className={styles.itemInfo}>
                    <h2 className={styles.itemName}>{item.name}</h2>
                    <p className={styles.itemPrice}>
                      ₹{item.price.toLocaleString()}
                    </p>
                    <p className={styles.itemMeta}>In stock • Standard delivery</p>
                  </div>

                  <div className={styles.itemControls}>
                    <div className={styles.quantity}>
                      <button className={styles.qtyButton} type="button">
                        −
                      </button>
                      <span className={styles.qtyValue}>{item.quantity}</span>
                      <button className={styles.qtyButton} type="button">
                        +
                      </button>
                    </div>

                    <button
                      className={styles.removeButton}
                      type="button"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className={styles.summaryCard}>
              <h2 className={styles.summaryTitle}>Order Summary</h2>

              <div className={styles.summaryRow}>
                <span>Subtotal</span>
                <span>₹{totalAmount.toLocaleString()}</span>
              </div>

              <div className={styles.summaryRow}>
                <span>Shipping</span>
                <span className={styles.freeText}>Free</span>
              </div>

              <div className={styles.summaryRow}>
                <span>Estimated tax</span>
                <span>₹0</span>
              </div>

              <hr className={styles.divider} />

              <div className={styles.summaryTotalRow}>
                <span>Total</span>
                <span>₹{totalAmount.toLocaleString()}</span>
              </div>

              <Link href="/checkout" className={styles.checkoutButton}>
                Proceed to Checkout
              </Link>

              <p className={styles.summaryNote}>
                Secure checkout • UPI / Cards / Netbanking
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

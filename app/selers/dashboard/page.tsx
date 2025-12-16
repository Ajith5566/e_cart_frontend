"use client";

import React from "react";
import Link from "next/link";
import styles from "./SellerDashboard.module.css";

export default function Page() {
  const sellerName = "Ajith Store"; // later from Redux

  return (
    <main className={styles.page}>
      <div className="container">
        {/* Header */}
        <div className={`${styles.headerRow} mb-4`}>
          <div>
            <h1 className={styles.title}>Seller Dashboard</h1>
            <p className={styles.subtitle}>Welcome back, {sellerName}</p>
          </div>

          <Link
            href="/seller/add-product"
            className={`${styles.addButton} btn`}
          >
            + Add Product
          </Link>
        </div>

        {/* Stats */}
        <div className="row g-4 mb-4">
          <div className="col-12 col-sm-6 col-lg-3">
            <div className={styles.statCard}>
              <p className={styles.statLabel}>Total Products</p>
              <h2 className={styles.statValue}>24</h2>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-lg-3">
            <div className={styles.statCard}>
              <p className={styles.statLabel}>Total Orders</p>
              <h2 className={styles.statValue}>132</h2>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-lg-3">
            <div className={styles.statCard}>
              <p className={styles.statLabel}>Pending Orders</p>
              <h2 className={`${styles.statValue} ${styles.statPending}`}>
                8
              </h2>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-lg-3">
            <div className={styles.statCard}>
              <p className={styles.statLabel}>Total Revenue</p>
              <h2 className={`${styles.statValue} ${styles.statRevenue}`}>
                ₹2,45,000
              </h2>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className={styles.tableCard}>
          <div className={styles.tableHeader}>
            <h3 className={styles.tableTitle}>Recent Orders</h3>
          </div>

          <div className="table-responsive">
            <table className={`table mb-0 ${styles.table}`}>
              <thead>
                <tr>
                  <th scope="col">Order ID</th>
                  <th scope="col">Product</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>#ORD123</td>
                  <td>iPhone 15</td>
                  <td>₹79,999</td>
                  <td>
                    <span className={`${styles.badge} ${styles.badgePending}`}>
                      Pending
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>#ORD124</td>
                  <td>Samsung S23</td>
                  <td>₹69,999</td>
                  <td>
                    <span className={`${styles.badge} ${styles.badgeSuccess}`}>
                      Delivered
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>#ORD125</td>
                  <td>AirPods Pro</td>
                  <td>₹24,999</td>
                  <td>
                    <span className={`${styles.badge} ${styles.badgeInfo}`}>
                      Shipped
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* View all */}
          <div className={styles.tableFooter}>
            <Link href="/selers/orders" className={styles.viewAllLink}>
              View all orders →
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

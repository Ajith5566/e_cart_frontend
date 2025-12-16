"use client";

import React from "react";
import styles from "./OrdersPage.module.css";

const orders = [
  {
    id: "ORD12345",
    date: "2025-01-12",
    total: 159998,
    status: "Delivered",
    items: 2,
  },
  {
    id: "ORD12346",
    date: "2025-01-15",
    total: 69999,
    status: "Shipped",
    items: 1,
  },
  {
    id: "ORD12347",
    date: "2025-01-18",
    total: 79999,
    status: "Pending",
    items: 1,
  },
];

export default function OrdersPage() {
  return (
    <main className={styles.page}>
      <div className="container">
        {/* Header */}
        <div className={styles.headerRow}>
          <div>
            <h1 className={styles.title}>My Orders</h1>
            <p className={styles.subtitle}>
              View and track your recent purchases
            </p>
          </div>
        </div>

        {/* Orders Table */}
        <div className={styles.tableCard}>
          <div className="table-responsive">
            <table className={`table mb-0 ${styles.table}`}>
              <thead>
                <tr>
                  <th scope="col">Order ID</th>
                  <th scope="col">Date</th>
                  <th scope="col">Items</th>
                  <th scope="col">Total</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className={styles.tableRow}>
                    <td className={styles.cellStrong}>{order.id}</td>
                    <td>{order.date}</td>
                    <td>{order.items}</td>
                    <td className={styles.cellStrong}>
                      ₹{order.total.toLocaleString()}
                    </td>
                    <td>
                      <span
                        className={`${styles.badge} ${
                          order.status === "Delivered"
                            ? styles.badgeSuccess
                            : order.status === "Shipped"
                            ? styles.badgeInfo
                            : styles.badgePending
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td>
                      <button type="button" className={styles.viewButton}>
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty state */}
          {orders.length === 0 && (
            <div className={styles.emptyState}>No orders found</div>
          )}
        </div>
      </div>
    </main>
  );
}

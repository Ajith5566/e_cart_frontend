"use client";

import React from "react";
import styles from "./AdminDashboard.module.css";
import Link from "next/link";

export default function Page() {
  return (
    <div className={styles.dashboard}>
      
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <h2 className={styles.logo}>Admin Panel</h2>

        <nav className={styles.nav}>
          <Link href="/admin/dashboard">Dashboard</Link>
          <Link href="/admin/products">Products</Link>
          <Link href="/admin/orders">Orders</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className={styles.main}>
        <h1 className={styles.heading}>Dashboard</h1>

        <div className={styles.cards}>
          <div className={styles.card}>
            <p className={styles.cardTitle}>Total Users</p>
            <h2>120</h2>
          </div>

          <div className={styles.card}>
            <p className={styles.cardTitle}>Products</p>
            <h2>340</h2>
          </div>

          <div className={styles.card}>
            <p className={styles.cardTitle}>Orders</p>
            <h2>89</h2>
          </div>
        </div>
      </main>
    </div>
  );
}

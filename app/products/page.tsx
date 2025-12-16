"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./ProductsPage.module.css";

const products = [
  {
    _id: "1",
    name: "iPhone 15",
    price: 79999,
    image: "/images/products/iphone15pro.jpg",
  },
  {
    _id: "2",
    name: "Samsung Galaxy S23",
    price: 69999,
    image: "/images/samsung.jpg",
  },
];

export default function ProductsPage() {
  const userName = "John";

  return (
    <main className={styles.page}>
      <div className="container">
        {/* Top dashboard bar */}
        <header className={styles.topBar}>
          <div className={styles.userInfo}>
            <p className={styles.welcomeText}>Welcome back,</p>
            <p className={styles.userName}>{userName}</p>
          </div>

          <div className={styles.topActions}>
            {/* Search bar */}
            <div className={styles.searchWrapper}>
              <span className={styles.searchIcon}>🔍</span>
              <input
                type="text"
                placeholder="Search products, brands..."
                className={styles.searchInput}
              />
            </div>

            {/* Cart button */}
            <Link href="/cart" className={styles.cartButton}>
              <span className={styles.cartIcon}>🛒</span>
              <span className={styles.cartLabel}>Cart</span>
              <span className={styles.cartBadge}>3</span>
            </Link>
          </div>
        </header>

        {/* Page Title */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h1 className={styles.title}>Products</h1>
            <p className={styles.subtitle}>
              Explore the latest smartphones from top brands
            </p>
          </div>
          <span className={styles.badgeCount}>{products.length} items</span>
        </div>

        {/* Product Grid */}
        <div className={`row g-4 ${styles.grid}`}>
          {products.map((product) => (
            <div key={product._id} className="col-12 col-sm-6 col-md-4">
              <Link
                href={`/products/${product._id}`}
                className={`${styles.card} text-decoration-none d-block h-100`}
              >
                {/* Image */}
                <div className={styles.imageWrapper}>
                  <div className={styles.imageSkeleton}>
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className={styles.productImage}
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                </div>

                {/* Info */}
                <div className={styles.cardBody}>
                  <h2 className={styles.productName}>{product.name}</h2>
                  <p className={styles.productPrice}>₹{product.price}</p>

                  {/* Button */}
                  <button className={styles.viewButton} type="button">
                    View Details
                  </button>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

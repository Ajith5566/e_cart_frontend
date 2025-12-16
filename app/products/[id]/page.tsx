"use client";

import { useParams } from "next/navigation";
import styles from "./ProductDetailPage.module.css";

export default function ProductDetailPage() {
  const { id } = useParams();

  // later → fetch product by id
  const product = {
    name: "iPhone 15",
    price: 79999,
    description:
      "Latest iPhone with powerful performance and premium design.",
  };

  return (
    <main className={styles.page}>
      <div className={styles.card}>
        {/* Image */}
        <div className={styles.imageSection}>
          <div className={styles.imageFrame}>
            <span className={styles.imageText}>Product Image</span>
          </div>

          <div className={styles.thumbnailRow}>
            <div className={styles.thumbnail} />
            <div className={styles.thumbnail} />
            <div className={styles.thumbnail} />
          </div>
        </div>

        {/* Details */}
        <div className={styles.detailsSection}>
          <p className={styles.productId}>Product ID: {String(id)}</p>

          <h1 className={styles.title}>{product.name}</h1>

          <p className={styles.price}>₹{product.price}</p>

          <p className={styles.description}>{product.description}</p>

          {/* Meta info */}
          <div className={styles.metaRow}>
            <span className={styles.metaBadge}>In stock</span>
            <span className={styles.metaText}>Free delivery in 2–5 days</span>
          </div>

          {/* Actions */}
          <div className={styles.actions}>
            <button className={styles.addToCartButton}>Add to Cart</button>
            <button className={styles.buyNowButton}>Buy Now</button>
          </div>

          {/* Guarantee row */}
          <div className={styles.guaranteeRow}>
            <span>✓ Secure payment</span>
            <span>✓ 7‑day replacement</span>
          </div>
        </div>
      </div>
    </main>
  );
}

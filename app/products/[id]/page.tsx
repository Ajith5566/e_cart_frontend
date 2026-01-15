/* eslint-disable @next/next/no-img-element */
"use client";

import { useParams, useRouter } from "next/navigation";
import styles from "./ProductDetailPage.module.css";
import { fetchedProducts } from "@/app/types/types";
import { useEffect, useState } from "react";
import { getProductByIdApi } from "@/app/services/allApi";
import { BASE_URL } from "@/app/services/baseUrl";

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<fetchedProducts>();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await getProductByIdApi(id as string);
        setProduct(res.data);
      } catch (error) {
        console.error("Failed to fetch product", error);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  const handleClose = () => {
    router.back();
  };

  return (
    <main className={styles.page}>
      <div className="container">
        <div className={styles.card}>
          {/* Close button */}
          <button
            className={styles.closeButton}
            onClick={handleClose}
            aria-label="Close product details"
          >
            ×
          </button>

          <div className={styles.contentWrapper}>
            {/* Image Section */}
            <div className={styles.imageSection}>
              <div className={styles.imageFrame}>
                <img
                  src={`${BASE_URL}/uploads/${product?.image}`}
                  alt={product?.productName || "Product"}
                  className={styles.mainImage}
                />
              </div>
              
              <div className={styles.thumbnailRow}>
                <div className={styles.thumbnailActive} />
                <div className={styles.thumbnail} />
                <div className={styles.thumbnail} />
              </div>
            </div>

            {/* Details Section */}
            <div className={styles.detailsSection}>
              <p className={styles.productId}>Product ID: {String(id)}</p>
              
              <h1 className={styles.title}>{product?.productName}</h1>
              
              <div className={styles.priceSection}>
                <span className={styles.price}>₹{product?.price}</span>
              </div>

              <div className={styles.metaSection}>
                <div className={styles.metaRow}>
                  <span className={styles.metaBadge}>In Stock</span>
                  <span className={styles.metaText}>Free delivery in 2–5 days</span>
                </div>
              </div>

              <div className={styles.actions}>
                <button className={`${styles.actionButton} ${styles.addToCart}`} type="button">
                  Add to Cart
                </button>
                <button className={`${styles.actionButton} ${styles.buyNow}`} type="button">
                  Buy Now
                </button>
              </div>

              <div className={styles.guaranteeRow}>
                <div className={styles.guaranteeItem}>
                  <span className={styles.guaranteeIcon}>✓</span>
                  Secure payment
                </div>
                <div className={styles.guaranteeItem}>
                  <span className={styles.guaranteeIcon}>✓</span>
                  7-day replacement
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

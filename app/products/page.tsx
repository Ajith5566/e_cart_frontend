/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import styles from "./ProductsPage.module.css";
import { useEffect, useState } from "react";
import { fetchedProducts, User } from "../types/types";
import { getAllProductsApi } from "../services/allApi";
import { BASE_URL } from "../services/baseUrl";
import { useRouter } from "next/navigation";
export default function ProductsPage() {
    const router = useRouter();
  const [user, setUser] = useState<string>('');
  
    const [isLogin, setIsLogin] = useState<boolean>(false);
    
  useEffect(() => {
    const userDetails = sessionStorage.getItem("existingUser");
    if (userDetails) {
      const parsedUser = JSON.parse(userDetails);
      setUser(parsedUser.username);
    }
    if (sessionStorage.getItem("token")) {
      setIsLogin(true);
    }
  }, []);

  const [products, setProducts] = useState<fetchedProducts[]>([]);

  const fetchProducts = async () => {
    try {
      const result = await getAllProductsApi();
      setProducts(result.data);
    } catch (err) {
      console.error("FRONTEND ERROR:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  
  const logout = () => {
    // Clear session storage
    sessionStorage.clear();

    // Update UI state
    setIsLogin(false);

    // Redirect to login page
    router.push("/auth/login");
  };

  return (
    <main className={styles.page}>
      <div className="container">
        {/* Top dashboard bar */}
        <header className={styles.topBar}>
          <div className={styles.userInfo}>
            <p className={styles.welcomeText}>Welcome back,</p>
            <p className={styles.userName}>{user}</p>
          </div>

          <div className={styles.topActions}>
            {/* Search bar */}
            <div className={styles.searchWrapper}>
              <svg className={styles.searchIcon} viewBox="0 0 24 24" width="20" height="20">
                <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
              </svg>
              <input
                type="text"
                placeholder="Search products, brands..."
                className={styles.searchInput}
              />
            </div>

            {/* Cart button */}
            <Link href="/cart" className={styles.cartButton}>
              <svg className={styles.cartIcon} viewBox="0 0 24 24" width="20" height="20">
                <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM17 18c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zM2 2v2h1.7l.7 3.5c.1.6.5 1.1 1.1 1.2h10.4c.6 0 1-.5 1.1-1.1l1.1-5.5H21V2H2zm14.7 7.6l-1.6-8H6.9l-1.6 8H16.7z"/>
              </svg>
              <span className={styles.cartLabel}>Cart</span>
              <span className={styles.cartBadge}>3</span>
            </Link>
             {/* Logout button shown only if user is logged in */}
              {isLogin && (
                <div className="logout-row">
                  <button className="btn btn-danger" onClick={logout}>
                    Logout
                  </button>
                </div>
              )}
          </div>
        </header>

        {/* Page Title */}
        <div className={`d-flex justify-content-between align-items-center mb-5 ${styles.titleSection}`}>
          <div>
            <h1 className={styles.title}>Products</h1>
            <p className={styles.subtitle}>
              Explore the latest smartphones from top brands
            </p>
          </div>
          <span className={styles.badgeCount}>{products.length} items</span>
         </div>
          {/* If NOT logged in */}
          {!isLogin ? (
            <div className="unauth-box">
              <h3>Unauthorized ❌</h3>
              <p>You need to login to <b>View or Buy</b> our products.</p>
              <button
                className="btn btn-success"
                onClick={() => router.push("/auth/login")}
              >
                Go to Login
              </button>
            </div>):(<div className={`row g-5 ${styles.grid}`}>
          {products.map((product) => (
            <div key={product._id} className="col-12 col-md-6 col-lg-4">
              <Link
                href={`/products/${product._id}`}
                className={`${styles.card} text-decoration-none d-block h-100`}
              >
                {/* Image */}
                <div className={styles.imageWrapper}>
                  <div className={styles.imageContainer}>
                    <img
                      src={`${BASE_URL}/uploads/${product.image}`}
                      alt={product.productName}
                      className={styles.productImage}
                    />
                  </div>
                </div>

                {/* Info */}
                <div className={styles.cardBody}>
                  <h2 className={styles.productName}>{product.productName}</h2>
                  <p className={styles.productPrice}>₹{product.price}</p>

                  {/* Button */}
                  <button className={styles.viewButton} type="button">
                    View Details →
                  </button>
                </div>
              </Link>
            </div>
          ))}
        </div>)}

        {/* Product Grid */}
        
      </div>
    </main>
  );
}

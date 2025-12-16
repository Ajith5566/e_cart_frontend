"use client";

import React, { useState } from "react";
import Link from "next/link";
import styles from "./LoginPage.module.css"; // or "./Header.module.css"

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, password });
  };

  return (
    <main className={styles.page}>
      <div className={styles.cardWrapper}>
        <div className={styles.glow} />

        <div className={styles.card}>
          {/* Heading */}
          <h2 className={styles.title}>Login to E‑Cart</h2>
          <p className={styles.subtitle}>Access your account</p>

          {/* Form */}
          <form onSubmit={handleSubmit} className={styles.form}>
            {/* Email */}
            <div className={styles.field}>
              <label className={styles.label}>Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className={styles.input}
              />
            </div>

            {/* Password */}
            <div className={styles.field}>
              <label className={styles.label}>Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={styles.input}
              />
            </div>

            {/* Login Button */}
            <button type="submit" className={styles.loginButton}>
              Login
            </button>
          </form>

          {/* Register Link */}
          <p className={styles.text}>
            Don’t have an account?{" "}
            <Link href="/auth/register" className={styles.linkPrimary}>
              Register
            </Link>
          </p>

          {/* Admin Login */}
          <p className={styles.textSmall}>
            Admin?{" "}
            <Link href="/admin/login" className={styles.linkSecondary}>
              Login here
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}

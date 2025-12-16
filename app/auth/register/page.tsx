"use client";

import React, { useState } from "react";
import Link from "next/link";
import styles from "./RegisterPage.module.css";

export default function Page() {
  const [role, setRole] = useState<"user" | "seller">("user");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const data = { name, email, password, role };
    console.log(data);
  };

  return (
    <main className={styles.page}>
      <div className={styles.cardWrapper}>
        <div className={styles.glow} />

        <div className={styles.card}>
          {/* Heading */}
          <h2 className={styles.title}>Create an Account</h2>
          <p className={styles.subtitle}>Join E‑Cart today</p>

          {/* Role Selection */}
          <div className={styles.roleToggle}>
            <button
              type="button"
              onClick={() => setRole("user")}
              className={`${styles.roleButton} ${
                role === "user" ? styles.roleButtonActiveUser : ""
              }`}
            >
              <span>User</span>
              {role === "user" && (
                <span className={styles.roleBadge}>For shoppers</span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setRole("seller")}
              className={`${styles.roleButton} ${
                role === "seller" ? styles.roleButtonActiveSeller : ""
              }`}
            >
              <span>Seller</span>
              {role === "seller" && (
                <span className={styles.roleBadge}>For store owners</span>
              )}
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className={styles.form}>
            {/* Name */}
            <div className={styles.field}>
              <label className={styles.label}>Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className={styles.input}
              />
            </div>

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

            {/* Confirm Password */}
            <div className={styles.field}>
              <label className={styles.label}>Confirm Password</label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className={styles.input}
              />
            </div>

            {/* Submit */}
            <button type="submit" className={styles.submitButton}>
              Register as {role === "user" ? "User" : "Seller"}
            </button>
          </form>

          {/* Login Link */}
          <p className={styles.text}>
            Already have an account?{" "}
            <Link href="/auth/login" className={styles.linkPrimary}>
              Login
            </Link>
          </p>

          {/* Seller Note */}
          {role === "seller" && (
            <p className={styles.sellerNote}>
              Seller accounts require admin approval before selling.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}

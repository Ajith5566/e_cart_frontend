"use client";

import React, { useState } from "react";
import Link from "next/link";
import styles from "./RegisterPage.module.css";
import { FormErrors, RegisterFormData } from "@/app/types/types";
import { registerApi } from "@/app/services/allApi";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

const EMPTY_ERRORS: FormErrors = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function Page() {
  const [userData, setUserData] = useState<RegisterFormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<FormErrors>(EMPTY_ERRORS);

  const validate = (): boolean => {
    const newErrors: FormErrors = { ...EMPTY_ERRORS };

    if (!userData.username.trim()) {
      newErrors.username = "Name is required";
    } else if (!/^[A-Za-z\s]+$/.test(userData.username)) {
      newErrors.username = "Name cannot contain numbers or special characters";
    }

    if (!userData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(userData.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!userData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (userData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (userData.confirmPassword !== userData.password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((err) => err === "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await registerApi(userData);
      toast.success("Registration completed successfully");
      setUserData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setErrors(EMPTY_ERRORS);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || "Something went wrong");
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <main className={styles.page}>
      <div className={styles.cardWrapper}>
        <div className={styles.card}>
          {/* Heading */}
          <h2 className={styles.title}>Create Account</h2>
          <p className={styles.subtitle}>Join E-Cart today</p>

          {/* Registration form */}
          <form onSubmit={handleSubmit} className={styles.form}>
            {/* Full Name */}
            <div className={styles.field}>
              <label className={styles.label}>Full Name</label>
              <input
                type="text"
                value={userData.username}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    username: e.target.value,
                  })
                }
                className={styles.input}
                placeholder="John Doe"
              />
              {errors.username && (
                <p className={styles.errorText}>{errors.username}</p>
              )}
            </div>

            {/* Email */}
            <div className={styles.field}>
              <label className={styles.label}>Email Address</label>
              <input
                type="email"
                value={userData.email}
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
                className={styles.input}
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className={styles.errorText}>{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div className={styles.field}>
              <label className={styles.label}>Password</label>
              <input
                type="password"
                value={userData.password}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    password: e.target.value,
                  })
                }
                className={styles.input}
                placeholder="••••••••"
              />
              {errors.password && (
                <p className={styles.errorText}>{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div className={styles.field}>
              <label className={styles.label}>Confirm Password</label>
              <input
                type="password"
                value={userData.confirmPassword}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    confirmPassword: e.target.value,
                  })
                }
                className={styles.input}
                placeholder="••••••••"
              />
              {errors.confirmPassword && (
                <p className={styles.errorText}>{errors.confirmPassword}</p>
              )}
            </div>

            <button type="submit" className={styles.submitButton}>
              Create Account
            </button>
          </form>

          <p className={styles.text}>
            Already have an account?{" "}
            <Link href="/auth/login" className={styles.linkPrimary}>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import styles from "./LoginPage.module.css";
import { LoginFormData, LoginFormError, LoginResponse } from "@/app/types/types";
import { loginApi } from "@/app/services/allApi";
import { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const EMPTY_ERRORS: LoginFormError = {
  email: "",
  password: "",
};

export default function Page() {
  const router = useRouter();
  const [errors, setErrors] = useState<LoginFormError>(EMPTY_ERRORS);
    // Track whether user is logged in
  const [userdata, setUserData] = useState<LoginFormData>({
    email: "",
    password: "",
  });


  const validate = (): boolean => {
    const newErrors: LoginFormError = { ...EMPTY_ERRORS };
    
    if (!userdata.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(userdata.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!userdata.password.trim()) {
      newErrors.password = "Password is required";
    } else if (userdata.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    setErrors(newErrors);
    return Object.values(newErrors).every((err) => err === "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;

    try {
      const result = await loginApi(userdata) as AxiosResponse<LoginResponse>;

      if (result.status === 200) {
        sessionStorage.setItem("existingUser", JSON.stringify(result.data.existingUser));
        sessionStorage.setItem("token", result.data.token);
        toast.success("Login successful");
        setUserData({ email: "", password: "" });
        setErrors({ email: "", password: "" });
        router.push("/products");
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || "Invalid email or password");
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
          <h2 className={styles.title}>Login to E-Cart</h2>
          <p className={styles.subtitle}>Access your account</p>

          {/* Form */}
          <form onSubmit={handleSubmit} className={styles.form}>
            {/* Email */}
            <div className={styles.field}>
              <label className={styles.label}>Email Address</label>
              <input
                type="email"
                value={userdata.email}
                onChange={(e) =>
                  setUserData({
                    ...userdata,
                    email: e.target.value,
                  })
                }
                placeholder="you@example.com"
                className={styles.input}
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
                value={userdata.password}
                onChange={(e) =>
                  setUserData({
                    ...userdata,
                    password: e.target.value,
                  })
                }
                placeholder="••••••••"
                className={styles.input}
              />
              {errors.password && (
                <p className={styles.errorText}>{errors.password}</p>
              )}
            </div>

            {/* Login Button */}
            <button type="submit" className={styles.loginButton}>
              Sign In
            </button>
          </form>

          {/* Register Link */}
          <p className={styles.text}>
            Don&apos;t have an account?{" "}
            <Link href="/auth/register" className={styles.linkPrimary}>
              Create one
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

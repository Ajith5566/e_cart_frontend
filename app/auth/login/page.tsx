"use client";

import React, { useState } from "react";
import Link from "next/link";
import styles from "./LoginPage.module.css"; // or "./Header.module.css"
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

  const [userdata, setUserData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  console.log(userdata);
  

  const validate = (): boolean => {
      const newErrors: LoginFormError = { ...EMPTY_ERRORS };
  
      if (!/^\S+@\S+\.\S+$/.test(userdata.email)) {
        newErrors.email = "Enter a valid email";
      }
  
      if (userdata.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters long";
      }
      setErrors(newErrors);
      return Object.values(newErrors).every((err) => err === "");
    };





  const handleSubmit =async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const result = await loginApi(userdata) as AxiosResponse<LoginResponse>;

      if (result.status === 200) {
        // Store user data & token
        sessionStorage.setItem(
          "existingUser",
          JSON.stringify(result.data.existingUser)
        );
        sessionStorage.setItem("token", result.data.token);

        toast.success("Login successful 🎉");

        // Reset form
        setUserData({ email: "", password: "" });
        setErrors({ email: "", password: "" });

        // Navigate to dashboard
        router.push("/products");
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(
          error.response?.data?.message || "Invalid email or password"
        );
      } else {
        toast.error("Something went wrong");
      }
    }
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
            </div>

            {/* Password */}
            <div className={styles.field}>
              <label className={styles.label}>Password</label>
              <input
                type="password"
                required
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
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
"use client";

import React, { useState } from "react";
import styles from "./AdminLogin.module.css";
import { AdminResponse, LoginFormData } from "@/app/types/types";
import { adminloginAPi } from "@/app/services/allApi";
import { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function Page() {

 const router = useRouter();

const [admindata, setAdminData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  console.log(admindata);

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
     try {
      const result = await adminloginAPi(admindata) as AxiosResponse<AdminResponse>;
      console.log(result);
      
      if (result.status === 200) {
        // Store user data & token
        sessionStorage.setItem(
          "existingAdmin",
          JSON.stringify(result.data.admin)
        );
        sessionStorage.setItem("token", result.data.token);

        toast.success("Login successful 🎉");

        // Reset form
        setAdminData({ email: "", password: "" });
        //setErrors({ email: "", password: "" });

        // Navigate to dashboard
        router.push("/admin/dashboard");
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
    <div className={styles.page}>
      <div className={styles.card}>
        <h2 className={styles.title}>Admin Login</h2>
        <p className={styles.subtitle}>
          Only authorized admins can access
        </p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label>Email</label>
            <input
              type="email"
              value={admindata.email}
                onChange={(e) =>
                  setAdminData({
                    ...admindata,
                    email: e.target.value,
                  })
                }
              placeholder="admin@example.com"
            />
          </div>

          <div className={styles.field}>
            <label>Password</label>
            <input
              type="password"
              value={admindata.password}
              onChange={(e) =>
                  setAdminData({
                    ...admindata,
                    password: e.target.value,
                  })
                }
              placeholder="••••••••"
            />
          </div>

          <button type="submit" className={styles.button}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

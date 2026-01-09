"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./AdminProducts.module.css";
import { AdminProduct } from "@/app/types/types";
import Image from 'next/image'
import {  AddproductApi } from "@/app/services/allApi";
import { toast } from "react-toastify";

export default function Page() {
 const [token, setToken] = useState<string>("");
 
  

  const [productData, setProductData] = useState<AdminProduct>({
    name: "",
    price: "",
    quantity: "",
    image: null,
  });
  console.log(productData);

useEffect(() => {
    const stored = sessionStorage.getItem("token");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setToken(stored ?? "");
  }, []);
 console.log(token);

  const addProduct=async(e: React.FormEvent)=>{
    e.preventDefault();
  const { name, price, quantity, image } = productData;

  if (!name || !price || !quantity || !image) {
    return alert("Please fill all fields");
   }else{

  const reqBody = new FormData();
  reqBody.append("name", name);
  reqBody.append("price", price.toString());
  reqBody.append("quantity", quantity.toString());
  reqBody.append("image", image);


  if(token){
    const reqHeader={
    'Content-Type':'multipart/form-data',
    'Authorization':`Bearer ${token} `
  }

    //api call
    try{
   const result= await AddproductApi(reqBody,reqHeader);
   console.log(result);
   if (result.status === 200) {
    toast.success("Login successful 🎉");
    setProductData({name:"",price:"",quantity:"",image:null})

   }
    }catch{

    }
   
  }

}
  }



  return (
    <div className={styles.page}>
      <div className="container py-4">
        {/* Header */}
        <div className={`d-flex justify-content-between align-items-center mb-4 ${styles.header}`}>
          <h1 className={styles.title}>Admin – Products</h1>
          <Link
            href="/admin/dashboard"
            className={`btn btn-outline-light btn-sm ${styles.backBtn}`}
          >
            ← Back to Dashboard
          </Link>
        </div>

        <div className="row g-4">
          {/* Add Product */}
          <div className="col-12 col-lg-4">
            <div className={`card shadow-sm ${styles.card}`}>
              <div className="card-body">
                <h2 className="h5 mb-3">Add Product</h2>

                <div className={styles.form}>
                  <input
                    type="text"
                    placeholder="Product name"
                    value={productData.name}
                    onChange={(e) => setProductData({ ...productData, name: e.target.value })}
                    className="form-control mb-2"
                  />

                  <input
                    type="number"
                    placeholder="Price"
                    value={productData.price}
                    onChange={(e) => setProductData({ ...productData, price: e.target.value })}
                    className="form-control mb-2"
                  />

                  <input
                    type="number"
                    placeholder="Quantity"
                    value={productData.quantity}
                    onChange={(e) => setProductData({ ...productData, quantity: e.target.value })}
                    className="form-control mb-2"
                  />

                  <input
                    type="file"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      setProductData({ ...productData, image: file });
                    }}

                    className="form-control mb-2"
                  />
                  {productData.image && (
                    <Image
                      src={URL.createObjectURL(productData.image)}
                      alt="preview"
                      width={100}
                      height={100}
                      style={{ objectFit: "cover" }}
                    />
                  )}




                  <button
                    type="submit"
                    onClick={addProduct}
                    className="btn btn-primary w-100"
                  >
                    Add Product
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Product List */}
          <div className="col-12 col-lg-8">
            <div className={`card shadow-sm ${styles.card} ${styles.listCard}`}>
              <div className="card-body">
                <h2 className="h5 mb-3">Product List</h2>

                <div className="table-responsive">
                  <table
                    className={`table table-dark table-striped table-hover align-middle mb-0 ${styles.table}`}
                  >
                    <thead>
                      <tr>
                        <th scope="col">Image</th>
                        <th scope="col">Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Qty</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* {products.map((p) => (
                      <tr key={p.id}>
                        <td>
                          {p.image ? (
                            <img
                              src={p.image}
                              className={`${styles.thumb} img-thumbnail`}
                              alt={p.name}
                            />
                          ) : (
                            "—"
                          )}
                        </td>
                        <td>{p.name}</td>
                        <td>₹{p.price}</td>
                        <td>{p.quantity}</td>
                        <td>
                          <button
                            type="button"
                            className={`btn btn-sm btn-danger ${styles.deleteBtn}`}
                            onClick={() => deleteProduct(p.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                    {products.length === 0 && (
                      <tr>
                        <td colSpan={5} className="text-center text-muted">
                          No products yet.
                        </td>
                      </tr>
                    )} */}
                    </tbody>
                  </table>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./SellerProductsPage.module.css";

const products = [
  {
    _id: "1",
    name: "iPhone 15",
    price: 79999,
    stock: 12,
    image: "", // placeholder
  },
  {
    _id: "2",
    name: "Samsung Galaxy S23",
    price: 69999,
    stock: 5,
    image: "/images/samsung.jpg",
  },
];

export default function SellerProductsPage() {
  return (
    <main className={styles.page}>
      <div className="container">
        {/* Header */}
        <div className={styles.headerRow}>
          <div>
            <h1 className={styles.title}>My Products</h1>
            <p className={styles.subtitle}>Manage your listed products</p>
          </div>

          <Link href="/seller/add-product" className={styles.addButton}>
            + Add Product
          </Link>
        </div>

        {/* Table */}
        <div className={styles.tableCard}>
          <div className="table-responsive">
            <table className={`table mb-0 ${styles.table}`}>
              <thead>
                <tr>
                  <th scope="col">Product</th>
                  <th scope="col">Price</th>
                  <th scope="col">Stock</th>
                  <th scope="col" className="text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id} className={styles.tableRow}>
                    {/* Product */}
                    <td>
                      <div className={styles.productCell}>
                        <div className={styles.imageWrapper}>
                          <div className={styles.imageSkeleton}>
                            {product.image ? (
                              <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                sizes="64px"
                                className={styles.productImage}
                              />
                            ) : (
                              <span className={styles.imagePlaceholder}>
                                No image
                              </span>
                            )}
                          </div>
                        </div>
                        <span className={styles.productName}>
                          {product.name}
                        </span>
                      </div>
                    </td>

                    {/* Price */}
                    <td className={styles.priceCell}>
                      ₹{product.price.toLocaleString()}
                    </td>

                    {/* Stock */}
                    <td>
                      <span
                        className={`${styles.stockBadge} ${
                          product.stock > 0
                            ? styles.stockIn
                            : styles.stockOut
                        }`}
                      >
                        {product.stock > 0
                          ? `${product.stock} in stock`
                          : "Out of stock"}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="text-center">
                      <div className={styles.actions}>
                        <button type="button" className={styles.editButton}>
                          Edit
                        </button>
                        <button type="button" className={styles.deleteButton}>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {products.length === 0 && (
            <div className={styles.emptyState}>No products added yet</div>
          )}
        </div>
      </div>
    </main>
  );
}

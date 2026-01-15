import Link from "next/link";
import styles from "./home_page.module.css";

export default function Home() {
  return (
    <main className={styles.homePage}>
      <section className={styles.container}>
        <div className={styles.homeCard}>
          <span className={styles.homeBadge}>
            Multi-seller marketplace
          </span>

          <h1 className={styles.homeTitle}>
            Welcome to <span>E-Cart</span>
          </h1>

          <p className={styles.homeSubtitle}>
            A curated marketplace where trusted sellers meet smart buyers.
            Compare prices, discover quality products, and shop with confidence.
          </p>

          <div className={styles.homeActions}>
            <Link href="/auth/login" className={styles.btnPrimary}>
              Sign In
            </Link>
            <Link href="/auth/register" className={styles.btnSecondary}>
              Create Account
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

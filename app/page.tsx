import Link from "next/link";
import styles from "./home_page.module.css";


export default function Home() {
  return (
    <main className={`${styles.homePage} d-flex align-items-center justify-content-center`}>
      <div className={`${styles.homeCard} position-relative w-100`}>
        {/* Glow background */}
        <div className={styles.homeGlow} />

        {/* Card */}
        <div
          className={`${styles.homeCardInner} shadow-lg rounded-4 px-4 px-md-5 py-5 text-center`}
        >
          {/* Badge */}
          <div
            className={`${styles.homeBadge} d-inline-flex align-items-center gap-2 mb-4`}
          >
            <span className={styles.homeBadgeDot} />
            <span className="text-uppercase fw-semibold small">
              Multi-seller marketplace
            </span>
          </div>

          {/* Title */}
          <h1 className={`${styles.homeTitle} mb-2`}>
            Welcome to <span className={styles.homeTitleHighlight}>E‑Cart</span>
          </h1>

          <p className={`${styles.homeSubtitle} mb-4`}>
            Discover thousands of products from trusted sellers, compare prices
            in one place, and get the best deals every day.
          </p>

          {/* Buttons */}
          <div className={`${styles.homeActions} d-flex flex-column gap-2`}>
            <Link href="/auth/login" className={`${styles.btnLogin} w-100`}>
              <span>Login</span>
            </Link>

            <Link href="/auth/register" className={`${styles.btnRegister} w-100`}>
              <span>Register</span>
              <span className={styles.btnRegisterText}>
                Create your free account
              </span>
            </Link>
          </div>

          {/* Footer */}
          <p className={`${styles.homeFooter} mt-4 mb-0`}>
            New seller?{" "}
            <span className={styles.homeFooterHighlight}>
              Register as a seller
            </span>{" "}
            to start earning with E‑Cart.
          </p>
        </div>
      </div>
    </main>
  );
}

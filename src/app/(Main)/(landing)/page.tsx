import Link from 'next/link';
import styles from './page.module.scss';
import React from 'react';

function LandingPage() {
  return (
    <div className={styles.landing}>
      <h1>Welcome to the App!</h1>
      <p>برای ادامه لطفاً به صفحه لاگین برو یا مستقیماً وارد داشبورد شو.</p>
      <div className={styles.actions}>
        <Link href="/Login">
          <button className={styles.button}>برای ثبت نام کلیک کنید</button>
        </Link>
        <Link href="/Dashboard">
          <button className={styles.button}>ورود به داشبورد</button>
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;
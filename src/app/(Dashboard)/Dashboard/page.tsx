'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { readUser, clearUser, type StoredUser } from '@/lib/storage';
import styles from './styles.module.scss';
import Button from '@/components/common/Button/Button';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DashboardPage: React.FC = () => {
  const router = useRouter();
  const [user, setUser] = useState<StoredUser | null>(null);

  useEffect(() => {
    const phone = localStorage.getItem('userPhone');
    if (!phone) {
      toast.error('برای ورود به داشبورد باید ابتدا لاگین کنید');
      router.replace('/Login');
      return;
    }

    const u = readUser();
    if (!u) {
      toast.error('برای ورود به داشبورد باید ابتدا لاگین کنید');
      router.replace('/Login');
      return;
    }
    setUser(u);
  }, [router]);

  const displayName = user?.name && typeof user.name === 'object'
    ? `${(user.name as any).first ?? ''} ${(user.name as any).last ?? ''}`.trim()
    : 'User';

  return (
    <main className={styles.container}>
      <ToastContainer />
      <section className={styles.card}>
        <h1 className={styles.title}>{displayName ? `, ${displayName}` : ''} 🎉 به داشبورد خوش آمدی</h1>
        <div className={styles.actions}>
          <Button onClick={() => router.push('/Login')}> برو به Login  </Button>
          <Button onClick={() => { clearUser(); localStorage.removeItem('userPhone'); router.replace('/Login'); }}>Logout</Button>
        </div>
      </section>
    </main>
  );
};

export default DashboardPage;

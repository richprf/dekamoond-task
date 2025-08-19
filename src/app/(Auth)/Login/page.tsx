'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { phoneSchema, type PhoneFormValues } from '@/lib/validation';
import { saveUser } from '@/lib/storage';
import { useRouter } from 'next/navigation';
import Input from '@/components/common/Input/Input';
import Button from '@/components/common/Button/Button';
import styles from './styles.module.scss';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AuthPage: React.FC = () => {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<PhoneFormValues>({
    resolver: zodResolver(phoneSchema),
    defaultValues: { phone: '' },
    mode: 'onBlur',
  });

  const onSubmit = async (data: PhoneFormValues) => {
    console.log("data" , data)
  
    localStorage.setItem('userPhone', data.phone);

    const res = await fetch('https://randomuser.me/api/?results=1&nat=us');
    const apiData = await res.json();
    const user = apiData?.results?.[0] ?? {};

    saveUser(user);

    toast.success('ورود موفق! به داشبورد هدایت می‌شوید.', { autoClose: 3000 });

    setTimeout(() => {
      router.push('/Dashboard');
    }, 500);
  };

  return (
    <main className={styles.container}>
       <ToastContainer position="top-right" />
      <section className={styles.card}>
        <h1 className={styles.title}>Login</h1>
        <p className={styles.subtitle}>شماره موبایل ایرانی را وارد کنید (فقط برای ولیدیشن)</p>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <Input
            label="Mobile (IR)"
            placeholder="09123456789"
            inputMode="numeric"
            {...register('phone')}
            error={errors.phone?.message}
          />

          <Button type="submit" fullWidth disabled={isSubmitting} aria-busy={isSubmitting}>
            {isSubmitting ? 'Logging in…' : 'Login'}
          </Button>
        </form>
      </section>
    </main>
  );
};

export default AuthPage;
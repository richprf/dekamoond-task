"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { readUser, clearUser, type StoredUser } from "@/lib/storage";
import styles from "./styles.module.scss";
import Button from "@/components/common/Button/Button";

const DashboardPage: React.FC = () => {
  const router = useRouter();
  const [user, setUser] = useState<StoredUser | null>(null);

  useEffect(() => {
    const u = readUser();
    if (!u) {
      router.replace("/Login");
      return;
    }
    setUser(u);
  }, [router]);

  const displayName = user?.name && typeof user.name === "object"
    ? `${(user.name as any).first ?? ""} ${(user.name as any).last ?? ""}`.trim()
    : "User";

  return (
    <main className={styles.container}>
      <section className={styles.card}>
        <h1 className={styles.title}>   {displayName ? `, ${displayName}` : ""} 🎉   به داشبورد خوش امدی </h1>
        <p className={styles.subtitle}></p>

        <div className={styles.actions}>
          <Button onClick={() => router.push("/Login")}>Go to Auth</Button>
          <Button onClick={() => { clearUser(); router.replace("/Login"); }}>Logout</Button>
        </div>
      </section>
    </main>
  );
};

export default DashboardPage;
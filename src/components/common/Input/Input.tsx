"use client";
import React from "react";
import styles from "./Input.module.scss";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ label, error, className, ...props }, ref) => (
  <div className={styles.field}>
    {label && <label className={styles.label}>{label}</label>}
    <input ref={ref} className={`${styles.input} ${className ?? ""}`} {...props} />
    {error && <p className={styles.error}>{error}</p>}
  </div>
));

Input.displayName = "Input";
export default Input;
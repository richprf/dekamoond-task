"use client";
import React from "react";
import styles from "./Button.module.scss";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  fullWidth?: boolean;
};

const Button: React.FC<ButtonProps> = ({ children, fullWidth, className, ...props }) => (
  <button className={`${styles.button} ${fullWidth ? styles.full : ""} ${className ?? ""}`} {...props}>
    {children}
  </button>
);

export default Button;
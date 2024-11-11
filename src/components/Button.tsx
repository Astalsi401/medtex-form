import { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  className?: string;
  loading?: boolean;
};

export const Button: React.FC<ButtonProps> = ({ children, className, loading }) => (
  <button type="submit" className={`${className} ${loading ? "loading" : ""}`}>
    {children}
  </button>
);

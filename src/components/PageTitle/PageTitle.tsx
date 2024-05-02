import React, { FC } from "react";
import styles from "./PageTitle.module.css";

interface PageTitleProps {
  children: React.ReactNode;
}

const PageTitle: FC<PageTitleProps> = ({ children }) => {
  return <div className={styles.title}>{children}</div>;
};

export default PageTitle;

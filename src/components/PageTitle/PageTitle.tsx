import React, { FC } from "react";
import styles from "./PageTitle.module.css";

interface PageTitleProps {
  children: React.ReactNode;
}

const PageTitle: FC<PageTitleProps> = ({ children }) => {
  return <h1 className={styles.title}>{children}</h1>;
};

export default PageTitle;

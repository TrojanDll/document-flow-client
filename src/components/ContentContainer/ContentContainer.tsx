import React, { FC } from "react";
import styles from "./ContentContainer.module.css";

interface ContentContainerProps {
  children: React.ReactNode;
}

const ContentContainer: FC<ContentContainerProps> = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export default ContentContainer;

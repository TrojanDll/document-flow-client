import React, { FC } from "react";
import styles from "./Sidebar.module.css";
import { Link } from "react-router-dom";

import peopleImg from "./../../assets/img/icons/people-fill.svg";
import taskImg from "./../../assets/img/icons/checkmark.svg";
import documentImg from "./../../assets/img/icons/document.svg";
import mailImg from "./../../assets/img/icons/mail.svg";
import gearImg from "./../../assets/img/icons/gear.svg";
import { Button } from "react-bootstrap";

const Sidebar: FC = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.title}>Монтаж-сервис</div>
      <div className={styles.links}>
        <Link to="/profile" className={styles.linkWrapper}>
          <img src={peopleImg} alt="peopleImg" className={styles.linkImg} />
          <div className={styles.linkText}>Профиль</div>
        </Link>

        <Link to="/profile" className={styles.linkWrapper}>
          <img src={documentImg} alt="peopleImg" className={styles.linkImg} />
          <div className={styles.linkText}>Документы</div>
        </Link>

        <Link to="/profile" className={styles.linkWrapper}>
          <img src={taskImg} alt="peopleImg" className={styles.linkImg} />
          <div className={styles.linkText}>Задачи</div>
        </Link>

        <Link to="/profile" className={styles.linkWrapper}>
          <img src={mailImg} alt="peopleImg" className={styles.linkImg} />
          <div className={styles.linkText}>Отправка</div>
        </Link>
      </div>

      <div className={styles.bottomLinks}>
        <Link to="/profile" className={styles.linkWrapper}>
          <img src={gearImg} alt="peopleImg" className={styles.linkImg} />
          <div className={styles.linkText}>Администрирование</div>
        </Link>

        <Button variant="light" className={styles.logout}>
          Выход
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
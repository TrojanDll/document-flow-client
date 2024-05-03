import React, { FC } from "react";
import styles from "./Login.module.css";
import { Button, Form } from "react-bootstrap";

interface LoginProps {
  onClick: (e: any) => void;
}

const Login: FC<LoginProps> = ({ onClick }) => {
  return (
    <div className={styles.wrapper}>
      <Form>
        <div className={styles.title}>Вход</div>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Электронная почта</Form.Label>
          <Form.Control type="email" placeholder="Email" required />
        </Form.Group>

        <Form.Group className="mt-3" controlId="formBasicPassword">
          <Form.Label>Пароль</Form.Label>
          <Form.Control type="password" placeholder="Пароль" required />
        </Form.Group>
        <div className={styles.buttonsWrapper}>
          <Button className={styles.loginButton} variant="primary" type="submit">
            Войти
          </Button>
          <div className={styles.orText}>или</div>
          <Button className={styles.button} variant="secondary" onClick={onClick}>
            Перейти к регистрации
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Login;

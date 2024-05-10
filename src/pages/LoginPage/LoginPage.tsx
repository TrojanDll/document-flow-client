import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setCredentials } from "./../../features/auth/authSlice";
import { useLoginMutation } from "./../../features/auth/authApiSlice";

import styles from "./LoginPage.module.css";
import { Button, Form } from "react-bootstrap";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isError }] = useLoginMutation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      navigate("/profile");
    }
  }, []);

  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const userData = await login({ email, password });
      console.log(userData);
      dispatch(setCredentials({ ...userData }));
      setEmail("");
      setPassword("");
      navigate("/profile");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (isError) {
      setError("Ошибка. Неверный логин или пароль!");
    } else {
      setError("");
    }
  }, [isError]);

  useEffect(() => {
    setError("");
  }, [email, password]);

  return (
    <div className={styles.layout}>
      <div className={styles.wrapper}>
        <Form onSubmit={handleSubmit}>
          <div className={styles.title}>Вход</div>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Электронная почта</Form.Label>
            <Form.Control
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              required
            />
          </Form.Group>

          <Form.Group className="mt-3" controlId="formBasicPassword">
            <Form.Label>Пароль</Form.Label>
            <Form.Control
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Пароль"
              required
            />
          </Form.Group>
          <div className={styles.errorMessage}>{error}</div>
          <div className={styles.buttonsWrapper}>
            <Button className={styles.loginButton} variant="primary" type="submit">
              Войти
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};
export default LoginPage;

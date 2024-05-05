import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setCredentials } from "./../../features/auth/authSlice";
import { useLoginMutation, useRegisterMutation } from "./../../features/auth/authApiSlice";

import styles from "./LoginPage.module.css";
import { Button, Form } from "react-bootstrap";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const [register] = useRegisterMutation();

  const [isRegPage, setIsRegPage] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [patronymic, setPatronymic] = useState("");
  const [department, setDepartment] = useState("");
  const [post, setPost] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const userData = await login({ email, password });
      console.log(userData);
      dispatch(setCredentials({ ...userData }));
      setEmail("");
      setPassword("");
      navigate("/documents");
    } catch (err) {
      console.log(err);
    }
  };

  const handleRegistrationSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const userData = await register({
        firstName,
        lastName,
        patronymic,
        department,
        post,
        email,
        password,
      });
      console.log(userData);
      dispatch(setCredentials({ ...userData }));
      setEmail("");
      setPassword("");
      navigate("/documents");
    } catch (err) {
      console.log(err);
    }
  };

  const handleToggleRegPage = () => {
    setIsRegPage(!isRegPage);
  };

  const content = isRegPage ? (
    <div className={styles.layout}>
      <div className={styles.wrapper}>
        <Form onSubmit={handleRegistrationSubmit}>
          <div className={styles.title}>Регистрация</div>
          <div className={styles.inputsRow}>
            <Form.Group className="mt-3" controlId="firstName">
              <Form.Label>Ваше имя</Form.Label>
              <Form.Control
                value={firstName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)}
                type="text"
                placeholder="Имя"
                required
              />
            </Form.Group>

            <Form.Group className="mt-3" controlId="lastName">
              <Form.Label>Ваша фамилия</Form.Label>
              <Form.Control
                value={lastName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}
                type="text"
                placeholder="Фамилия"
                required
              />
            </Form.Group>

            <Form.Group className="mt-3" controlId="patronymic">
              <Form.Label>Ваше отчество</Form.Label>
              <Form.Control
                value={patronymic}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPatronymic(e.target.value)}
                type="text"
                placeholder="Отчество"
                required
              />
            </Form.Group>
          </div>

          <div className={styles.inputsRow}>
            <Form.Group className={styles.input} controlId="department">
              <Form.Label>Ваш отдел</Form.Label>
              <Form.Control
                value={department}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDepartment(e.target.value)}
                type="text"
                placeholder="Отдел"
                required
              />
            </Form.Group>

            <Form.Group className={styles.input} controlId="post">
              <Form.Label>Ваша должность</Form.Label>
              <Form.Control
                value={post}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPost(e.target.value)}
                type="text"
                placeholder="Должность"
                required
              />
            </Form.Group>
          </div>

          <div className={styles.inputsRow}>
            <Form.Group className={styles.input} controlId="email">
              <Form.Label>Электронная почта</Form.Label>
              <Form.Control
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                type="email"
                placeholder="Email"
                required
              />
            </Form.Group>

            <Form.Group className={styles.input} controlId="password">
              <Form.Label>Пароль</Form.Label>
              <Form.Control
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                type="password"
                placeholder="Пароль"
                required
              />
            </Form.Group>
          </div>

          <div className={styles.buttonsWrapper}>
            <Button className={styles.loginButton} variant="primary" type="submit">
              Зарегестрироваться
            </Button>
            <div className={styles.orText}>или</div>
            <Button className={styles.button} variant="secondary" onClick={handleToggleRegPage}>
              Перейти ко входу
            </Button>
          </div>
        </Form>
      </div>
    </div>
  ) : (
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
          <div className={styles.buttonsWrapper}>
            <Button className={styles.loginButton} variant="primary" type="submit">
              Войти
            </Button>
            <div className={styles.orText}>или</div>
            <Button className={styles.button} variant="secondary" onClick={handleToggleRegPage}>
              Перейти к регистрации
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );

  return content;
};
export default LoginPage;

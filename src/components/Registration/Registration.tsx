import React, { FC, useState } from "react";
import styles from "./Registration.module.css";
import { Button, Form } from "react-bootstrap";

interface RegistrationProps {
  onClick: (e: any) => void;
}

const Registration: FC<RegistrationProps> = ({ onClick }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [patronymic, setPatronymic] = useState("");
  const [department, setDepartment] = useState("");
  const [post, setPost] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const userData = await login({ user, pwd }).unwrap();
  //     dispatch(setCredentials({ ...userData, user }));
  //     setUser("");
  //     setPwd("");
  //     navigate("/welcome");
  //   } catch (err) {
  //     if (!err?.originalStatus) {
  //       // isLoading: true until timeout occurs
  //       setErrMsg("No Server Response");
  //     } else if (err.originalStatus === 400) {
  //       setErrMsg("Missing Username or Password");
  //     } else if (err.originalStatus === 401) {
  //       setErrMsg("Unauthorized");
  //     } else {
  //       setErrMsg("Login Failed");
  //     }
  //   }
  // };

  return (
    <div className={styles.wrapper}>
      <Form>
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
          <Button className={styles.loginButton} variant="primary">
            Зарегестрироваться
          </Button>
          <div className={styles.orText}>или</div>
          <Button className={styles.button} variant="secondary" onClick={onClick}>
            Перейти ко входу
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Registration;

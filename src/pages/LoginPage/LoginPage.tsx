import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setCredentials } from "./../../features/auth/authSlice";
import { useLoginMutation } from "./../../features/auth/authApiSlice";
import Login from "../../components/Login/Login";

import styles from "./LoginPage.module.css";
import Registration from "../../components/Registration/Registration";
import { Button, Form } from "react-bootstrap";

const LoginPage = () => {
  const userRef = useRef();
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [isRegPage, setIsRegPage] = useState(false);
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [patronymic, setPatronymic] = useState("");
  const [department, setDepartment] = useState("");
  const [post, setPost] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {}, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = await login({ email, password });
      console.log(userData);
      dispatch(setCredentials({ ...userData, user }));
      setUser("");
      setPwd("");
      navigate("documents");
      // console.log();
    } catch (err) {
      console.log(err);
      // if (!err?.status) {
      //   // isLoading: true until timeout occurs
      //   setErrMsg("No Server Response");
      // } else if (err.stat === 400) {
      //   setErrMsg("Missing Username or Password");
      // } else if (err.originalStatus === 401) {
      //   setErrMsg("Unauthorized");
      // } else {
      //   setErrMsg("Login Failed");
      // }
    }
  };

  const handleUserInput = (e) => setUser(e.target.value);

  const handlePwdInput = (e) => setPwd(e.target.value);

  const content1 = isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <section className="login">
      <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
        {errMsg}
      </p>

      <h1>Employee Login</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={user}
          onChange={handleUserInput}
          autoComplete="off"
          required
        />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" onChange={handlePwdInput} value={pwd} required />
        <button>Sign In</button>
      </form>
    </section>
  );

  const handleToggleRegPage = () => {
    setIsRegPage(!isRegPage);
  };

  const content = isRegPage ? (
    <div className={styles.layout}>
      <Registration onClick={handleToggleRegPage} />
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
            <Button className={styles.button} variant="secondary" type="submit">
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

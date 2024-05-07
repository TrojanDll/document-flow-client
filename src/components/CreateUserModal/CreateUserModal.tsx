import { FC, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import styles from "./CreateUserModal.module.css";
import { useRegisterMutation } from "../../features/auth/authApiSlice";

interface CreateUserModalProps {
  props?: any;
  onHide: () => void;
  show?: boolean;
  handleUdateTable: () => void;
}

const CreateUserModal: FC<CreateUserModalProps> = (props) => {
  const { show } = props;
  const [register] = useRegisterMutation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [patronymic, setPatronymic] = useState("");
  const [department, setDepartment] = useState("");
  const [post, setPost] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
      props.onHide();
      props.handleUdateTable();
      console.log(userData);
    } catch (err) {
      console.log(err);
    }
  };

  const handleRefuseButton = () => {
    props.onHide();
    setFirstName("");
    setLastName("");
    setPatronymic("");
    setDepartment("");
    setPost("");
    setEmail("");
    setPassword("");
  };

  return (
    <Modal
      {...props}
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleRegistrationSubmit}>
          <div className={styles.title}>Добавление пользователя</div>
          <div className={styles.inputsRow}>
            <Form.Group className={`mt-3 ${styles.nameInput}`} controlId="firstName">
              <Form.Label>Имя</Form.Label>
              <Form.Control
                value={firstName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)}
                type="text"
                placeholder="Имя"
                required
              />
            </Form.Group>

            <Form.Group className={`mt-3 ${styles.nameInput}`} controlId="lastName">
              <Form.Label>Фамилия</Form.Label>
              <Form.Control
                value={lastName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}
                type="text"
                placeholder="Фамилия"
                required
              />
            </Form.Group>

            <Form.Group className={`mt-3 ${styles.nameInput}`} controlId="patronymic">
              <Form.Label>Отчество</Form.Label>
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
              <Form.Label>Отдел</Form.Label>
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
              Сохранить
            </Button>
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleRefuseButton}>Отмена</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateUserModal;

import { FC, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import styles from "./EditUserModal.module.css";
import { useUpdateUserByIdMutation } from "../../features/admin/adminApiSlice";

interface EditUserModalProps {
  props?: any;
  onHide: () => void;
  show?: boolean;
  handleUdateTable: () => void;
  userData: IUser;
}

const EditUserModal: FC<EditUserModalProps> = (props) => {
  const { show, userData, onHide, handleUdateTable } = props;
  const [editUserById] = useUpdateUserByIdMutation();
  const [firstName, setFirstName] = useState(userData.firstName);
  const [lastName, setLastName] = useState(userData.lastName);
  const [patronymic, setPatronymic] = useState(userData.patronymic);
  const [department, setDepartment] = useState(userData.department);
  const [post, setPost] = useState(userData.post);
  const [email, setEmail] = useState(userData.email);
  const [groupId, setGroupId] = useState(userData.userGroup);

  const handleRegistrationSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const udatedUserData = await editUserById({
        userId: userData.id,
        firstName,
        lastName,
        patronymic,
        department,
        post,
        email,
      });
      onHide();
      handleUdateTable();
      console.log(udatedUserData);
    } catch (err) {
      console.log(err);
    }
  };

  const handleRefuseButton = () => {
    onHide();
    setFirstName("");
    setLastName("");
    setPatronymic("");
    setDepartment("");
    setPost("");
    setEmail("");
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
          <div className={styles.title}>Редактирование пользователя</div>
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

export default EditUserModal;

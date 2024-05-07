import { ChangeEvent, FC, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import styles from "./EditUserModal.module.css";
import {
  useGetAllUsersGroupsQuery,
  useUpdateUserByIdMutation,
} from "../../features/admin/adminApiSlice";

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
  const { data: allUsersGroups, refetch: getAllUsersGroups } = useGetAllUsersGroupsQuery();
  const [firstName, setFirstName] = useState(userData.firstName);
  const [lastName, setLastName] = useState(userData.lastName);
  const [patronymic, setPatronymic] = useState(userData.patronymic);
  const [department, setDepartment] = useState(userData.department);
  const [post, setPost] = useState(userData.post);
  const [email, setEmail] = useState(userData.email);
  const [userGroup, setUserGroup] = useState(userData.groupResponseDTO?.id);

  const handleEditUserSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const udatedUserData = await editUserById({
        id: userData.id,
        firstName,
        lastName,
        patronymic,
        department,
        post,
        email,
        userGroup,
      });
      console.log({
        userId: userData.id,
        firstName,
        lastName,
        patronymic,
        department,
        post,
        email,
        userGroup,
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

  // let fetchedUsersGroups;
  // useEffect(() => {
  //   console.log(userGroup);
  // }, [userGroup]);

  const handleUserGroupChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserGroup(+e.target.value);
  };

  return (
    <Modal
      {...props}
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Редактирование пользователя</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleEditUserSubmit}>
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
            <Form.Group className={`${styles.inputWide} ${styles.input}`} controlId="post">
              <Form.Label>Должность</Form.Label>
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
            <Form.Group className={styles.input} controlId="department">
              <Form.Label>Группа</Form.Label>
              <Form.Select
                value={userGroup}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => handleUserGroupChange(e)}
                aria-label="Выберите группу">
                <option>Список групп</option>
                {allUsersGroups
                  ? allUsersGroups.map((group) => (
                      <option key={group.id} value={group.id}>
                        {group.name}
                      </option>
                    ))
                  : ""}
              </Form.Select>
            </Form.Group>

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

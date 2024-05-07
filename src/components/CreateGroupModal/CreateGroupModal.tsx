import { ChangeEvent, FC, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import styles from "./CreateGroupModal.module.css";
import {
  useCreateUsersGroupMutation,
  useDeleteUsersGroupByIdMutation,
  useGetAllUsersGroupsQuery,
} from "../../features/admin/adminApiSlice";

interface CreateGroupModalProps {
  props?: any;
  onHide?: () => void;
  show?: boolean;
}

const CreateGroupModal: FC<CreateGroupModalProps> = (props) => {
  // console.log(setGroupFilterItems, setPostFilterItems, setDepartmentFilterItems);
  const [newGroupName, setNewGroupName] = useState("");
  const [createUsersGroup] = useCreateUsersGroupMutation();
  const [deleteUsersGroupById] = useDeleteUsersGroupByIdMutation();
  const [userGroup, setUserGroup] = useState(0);
  const [userGroupToDelete, setUserGroupToDelete] = useState(0);

  const { data: allUsersGroups, refetch: getAllUsersGroups } = useGetAllUsersGroupsQuery();

  const handleCreateGroup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createUsersGroup(newGroupName).then(() => {
      getAllUsersGroups();
    });
    setNewGroupName("");
  };

  const handleDeleteGroup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(userGroupToDelete);
    deleteUsersGroupById(userGroupToDelete).then(() => {
      getAllUsersGroups();
    });
  };

  useEffect(() => {}, []);

  const { show, onHide } = props;
  return (
    <Modal
      {...props}
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Создание / удаление группы</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          className={styles.addGroupWrapper}
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleCreateGroup(e)}>
          <Form.Control
            value={newGroupName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewGroupName(e.target.value)}
            type="text"
            placeholder="Новая группа пользователей"
            required
          />
          <Button variant="success" type="submit">
            Добавить
          </Button>
        </Form>

        <Form
          className={styles.deleteGroupWrapper}
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleDeleteGroup(e)}>
          <Form.Group className={styles.deleteGroupSelect} controlId="department">
            <Form.Label>Удаление группы</Form.Label>
            <Form.Select
              value={userGroupToDelete}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                setUserGroupToDelete(+e.target.value)
              }
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
          <Button className={styles.deleteGroupSubmit} variant="danger" type="submit">
            Удалить
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Отмена</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateGroupModal;

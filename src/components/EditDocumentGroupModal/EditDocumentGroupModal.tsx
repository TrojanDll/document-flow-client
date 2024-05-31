import { FC, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import styles from "./EditDocumentGroupModal.module.css";

import MultiselectGroup from "../MultiselectGroup/MultiselectGroup";
import { useUpdateDocumentGroupByIdMutation } from "../../features/documents/documentsApiSlice";
import { IDocumentGroupResponse } from "../../types/Types";

interface CreateDocumentGroupModalProps {
  props?: any;
  onHide: () => void;
  show: boolean;
  currientDocumentGroup: IDocumentGroupResponse;
  handleUpdateTable: () => void;
}

const EditDocumentGroupModal: FC<CreateDocumentGroupModalProps> = (props) => {
  const { show, onHide, currientDocumentGroup, handleUpdateTable } = props;

  const [newGroupName, setNewGroupName] = useState<string>(currientDocumentGroup.name);
  const [addingDocIds] = useState<string[]>(currientDocumentGroup.docs.map((doc) => doc.id));
  const [addingUserGroupIds, setAddingUserGroupIds] = useState<number[]>(
    currientDocumentGroup.userGroups.map((group) => group.id)
  );

  const [updateDocumentGroup] = useUpdateDocumentGroupByIdMutation();

  const handleUpdateGroup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateDocumentGroup({
      id: currientDocumentGroup.id,
      name: newGroupName,
      docIds: addingDocIds,
      userGroupIds: addingUserGroupIds,
    }).then(() => {
      handleUpdateTable();
      onHide();
    });
  };

  return (
    <Modal {...props} show={show} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Редактирование группы документов</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleUpdateGroup(e)}>
          <div className={styles.addGroupWrapper}>
            <Form.Group className={styles.input}>
              <Form.Label>Название группы документов</Form.Label>
              <Form.Control
                value={newGroupName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewGroupName(e.target.value)}
                type="text"
                placeholder="Название"
                required
              />
            </Form.Group>

            <Form.Group className={styles.input}>
              <MultiselectGroup
                handleUpdateUsersGroups={(usersGroupsIds: number[]) => setAddingUserGroupIds(usersGroupsIds)}
                preselectedGroups={currientDocumentGroup.userGroups}
              />
            </Form.Group>
          </div>

          <Button className={styles.creationSubmit} variant="success" type="submit">
            Сохранить
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Отмена</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditDocumentGroupModal;

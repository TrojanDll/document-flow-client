import { ChangeEvent, FC, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import styles from "./CreateDocumentGroupModal.module.css";
import {
  useCreateDocumentGroupMutation,
  useDeleteDocumentGroupByIdMutation,
  useGetAllDocumentsGroupsQuery,
  useGetAllDocumentsQuery,
} from "../../features/documents/documentsApiSlice";
import { useGetAllUsersGroupsQuery } from "../../features/admin/adminApiSlice";
import MultiselectRelatedDocs from "../MultiselectRelatedDocs/MultiselectRelatedDocs";
import MultiselectGroup from "../MultiselectGroup/MultiselectGroup";

interface CreateDocumentGroupModalProps {
  props?: any;
  onHide: () => void;
  show: boolean;
}

const CreateDocumentGroupModal: FC<CreateDocumentGroupModalProps> = (props) => {
  const { show, onHide } = props;

  // console.log(setGroupFilterItems, setPostFilterItems, setDepartmentFilterItems);
  const [newGroupName, setNewGroupName] = useState("");
  const [addingDocIds, setAddingDocIds] = useState<string[]>([]);
  const [addingUserGroupIds, setAddingUserGroupIds] = useState<number[]>([]);

  const [createDocumentGroup] = useCreateDocumentGroupMutation();
  const [deleteDocumentGroupById] = useDeleteDocumentGroupByIdMutation();
  // const [userGroup, setUserGroup] = useState(0);
  const [documentGroupToDelete, setDocumentGroupToDelete] = useState(0);

  const { data: allDocumentsGroups, refetch: getAllDocumentsGroups } = useGetAllDocumentsGroupsQuery();
  const { data: fetchedDocuments } = useGetAllDocumentsQuery();

  const handleCreateGroup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createDocumentGroup({
      name: newGroupName,
      docIds: addingDocIds,
      userGroupIds: addingUserGroupIds,
    }).then(() => {
      getAllDocumentsGroups();
      setNewGroupName("");
      onHide();
    });
  };

  const handleDeleteGroup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(documentGroupToDelete);
    deleteDocumentGroupById(documentGroupToDelete).then(() => {
      getAllDocumentsGroups();
    });
  };

  return (
    <Modal {...props} show={show} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Создание / удаление группы документов</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h3 className={styles.subtitle}>Создание группы</h3>
        <Form onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleCreateGroup(e)}>
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
              <MultiselectRelatedDocs
                header="Выберите документы для новой группы"
                documents={fetchedDocuments ? fetchedDocuments : []}
                handleUpdateDocuments={(docIds: string[]) => setAddingDocIds(docIds)}
              />
            </Form.Group>
            <Form.Group className={styles.input}>
              <MultiselectGroup
                handleUpdateUsersGroups={(usersGroupsIds: number[]) => setAddingUserGroupIds(usersGroupsIds)}
              />
            </Form.Group>
          </div>

          <Button className={styles.creationSubmit} variant="success" type="submit">
            Добавить
          </Button>
        </Form>

        <h3 className={styles.subtitle}>Удаление группы</h3>

        <Form
          className={styles.deleteGroupWrapper}
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleDeleteGroup(e)}
        >
          <Form.Group className={styles.deleteGroupSelect}>
            <Form.Select
              value={documentGroupToDelete}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => setDocumentGroupToDelete(+e.target.value)}
              aria-label="Выберите группу"
            >
              <option>Список групп</option>
              {allDocumentsGroups
                ? allDocumentsGroups.map((group) => (
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

export default CreateDocumentGroupModal;
